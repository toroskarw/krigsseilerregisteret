import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  ReasonForLossFacetAsFormSelect,
  reasonForLossQueryParamName,
} from "components/Facets/ReasonForLoss";
import { fetcher } from "components/Facets/utils";
import { SearchIcon } from "components/Icons";
import { ArchiveType, IFacetValue } from "domain/archive";
import { IApiFacet } from "domain/krigsseilerregisteret-api/archive";
import { IApiShip } from "domain/krigsseilerregisteret-api/ship";
import {
  IApiShipArchive,
  ShipwreckCausedBy,
} from "domain/krigsseilerregisteret-api/shipArchive";
import { mapToIShip } from "domain/ship";
import {
  IShipwreckArchive,
  mapToShipwreckArchive,
} from "domain/shipwreckArchive";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMiniSearch } from "react-minisearch";
import useSWR from "swr";
import { getFirstElement } from "util/array";
import { fetchArchive } from "util/client";
import { colors } from "util/constants";
import shotImg from "../../../public/images/beskutt.svg";
import airImg from "../../../public/images/flyangrep.svg";
import hijackedImg from "../../../public/images/kapret.svg";
import mineImg from "../../../public/images/minesprengt.svg";
import torpedoImg from "../../../public/images/torpedo.svg";
import { ShipFactbox } from "./ShipFactbox";
import { useDeferredValue } from "./util";

const DEFAULT_POS = { lat: 42, lng: -19 };
const DEFAULT_ZOOM = 3;

const reasons = ["beskutt", "flyangrep", "kapret", "minesprengt", "torpedert"];

const searchOptions = { prefix: true };

const mapToMarkerData = (archive: IShipwreckArchive) => {
  return archive.results
    .map((r) => {
      if (!r.coordinates) {
        return null;
      }

      const lat = r.coordinates.latitude;
      const lon = r.coordinates.longitude;

      return {
        id: r.id,
        coordinates: {
          lat: lat,
          lng: lon,
        },
        data: {
          id: r.id,
          causedBy: r.causedBy,
          title: r.title,
        },
      };
    })
    .filter(Boolean);
};

export const getServerSideProps: GetServerSideProps<{
  shipwreckArchive: IShipwreckArchive;
}> = async (context) => {
  //This page only cares about a subset of reasonsForLoss
  //Since the api only currently support single value facet filtering,
  //we emulate the end result by doing 1 request per reason and manually accumulating
  //the result in an IApiShipArchive data structure.
  const requests = reasons.map((reason) => {
    return fetchArchive<IApiShipArchive>({
      page: 0,
      pagesize: 2000,
      types: [ArchiveType.SHIP],
      aggregations: {
        lostDuringWar: "ww2",
        reasonForLoss: reason,
      },
    });
  });

  const results = await Promise.all(requests);

  const senket_aarsak_ww2Agg: IApiFacet = {};
  results.forEach((result, i) => {
    senket_aarsak_ww2Agg[reasons[i]] =
      result.aggregations.senket_aarsak_ww2[reasons[i]];
  });

  const shipArchive: IApiShipArchive = {
    aggregations: {
      grouped_by_first_letter: {},
      nasjonalitet: {},
      senket_aarsak_ww2: senket_aarsak_ww2Agg,
      senket_i_krig: {},
      senket_utfort_av_nasjonalitet: {},
      senket_utfort_av_type_ww2: {},
      skipstype: {},
      spesiellOmtale: {},
      tjenestegjorde_i_krig: {},
    },
    page: "0",
    pagesize: "2000",
    query: "",
    _embedded: {
      results: results.flatMap((r) => r._embedded.results),
    },
    total: results.reduce((acc, prev) => {
      return acc + prev.total;
    }, 0),
    _links: {
      self: {
        href: "",
      },
    },
  };

  return {
    props: {
      shipwreckArchive: mapToShipwreckArchive(shipArchive),
    },
  };
};

const getIconPath = (causedBy: ShipwreckCausedBy | "ukjent"): string => {
  switch (causedBy) {
    case ShipwreckCausedBy.beskutt:
      return shotImg.src;

    case ShipwreckCausedBy.flyangrep:
      return airImg.src;

    case ShipwreckCausedBy.kapret:
      return hijackedImg.src;

    case ShipwreckCausedBy.minesprengt:
      return mineImg.src;

    case ShipwreckCausedBy.torpedert:
      return torpedoImg.src;
  }
};

const resolveAsQuery = (currentState: {
  [reasonForLossQueryParamName]?: string;
  menuOption?: string;
  shipwreckId?: string;
  searchQuery?: string;
}) => {
  return Object.entries(currentState)
    .filter(([key, value]) => {
      if (value === undefined) {
        return false;
      }
      return true;
    })
    .map(([key, value]) => {
      return `${key}=${encodeURI(value)}`;
    })
    .join("&");
};

export function MapOfShipWrecks(props: {
  shipwreckArchive: IShipwreckArchive;
}) {
  const intl = useIntl();
  const router = useRouter();

  const { query } = useRouter();

  const reasonForLossFilter = getFirstElement(
    query[reasonForLossQueryParamName]
  );

  const searchQuery = getFirstElement(query["searchQuery"]);

  const shipwreckId = getFirstElement(query["shipwreckId"]);

  const markerdata = React.useMemo(() => {
    return mapToMarkerData(props.shipwreckArchive);
  }, []);

  const mapRef = React.useRef<google.maps.Map>();

  const selectedMarker = markerdata.find(
    (m) => m.data.id.toString() === shipwreckId
  );

  React.useEffect(() => {
    if (!mapRef.current || !selectedMarker) {
      return;
    }
    mapRef.current.setCenter(selectedMarker.coordinates);
    if (mapRef.current.getZoom() === DEFAULT_ZOOM) {
      mapRef.current.setZoom(7);
    }
  }, [selectedMarker]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDV0ToUl7efvhH0Y1xj_hnas0KCcUrKRZA",
    mapIds: ["e83dc0b55e00d793"],
  });

  if (loadError) {
    return (
      <div>
        <FormattedMessage
          defaultMessage="Det oppstod en feil ved bruk av Google maps"
          description="Feilmelding Google maps"
        />
      </div>
    );
  }

  const [searchHasFocus, setSearchHasFocus] = React.useState<boolean>(false);

  const debouncedValue = useDeferredValue(
    searchQuery ? searchQuery.toLowerCase() : "",
    250
  );

  const searchDocuments = React.useMemo(() => {
    return markerdata.map((md) => {
      return {
        ...md.data,
        searchTitle: md.data.title.replace("/", ""), //to better handle M/S and D/S prefix
      };
    });
  }, []);

  const { search, searchResults } = useMiniSearch(searchDocuments || [], {
    fields: ["searchTitle"],
    storeFields: ["searchTitle", "title"],
  });

  React.useEffect(() => {
    search(debouncedValue, searchOptions);
  }, [debouncedValue]);

  const aggregated = React.useMemo(() => {
    return markerdata.reduce((prev, next) => {
      if (!prev[next.data.causedBy]) {
        prev[next.data.causedBy] = 1;
      } else {
        prev[next.data.causedBy] = prev[next.data.causedBy] + 1;
      }

      return prev;
    }, {});
  }, []);

  const filteredMarkerdata = React.useMemo(() => {
    if (!reasonForLossFilter) {
      return markerdata;
    }
    return markerdata.filter((r) => {
      return r.data.causedBy === reasonForLossFilter;
    });
  }, [reasonForLossFilter, markerdata]);

  const Markers = filteredMarkerdata.map((datum) => {
    return (
      <Marker
        icon={{
          url: getIconPath(datum.data.causedBy),
          strokeColor: "red",
        }}
        onClick={() => {
          router.push(
            `?${resolveAsQuery({
              ...query,
              shipwreckId: datum.id.toString(),
            })}`,
            undefined,
            {
              shallow: true,
            }
          );
        }}
        key={datum.id}
        position={{
          lat: datum.coordinates.lat,
          lng: datum.coordinates.lng,
        }}
      />
    );
  });

  const facets = Object.entries(aggregated).map(
    ([facet, count]): IFacetValue => {
      return {
        count: count as number,
        disabled: false,
        id: facet,
      };
    }
  );

  const renderMap = () => {
    return (
      <div
        style={{ height: "calc(100vh - 50px)", width: "100%" }}
        className="relative"
      >
        <form
          className=""
          onSubmit={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
          }}
        >
          <div className="absolute top-2 left-2 z-40 pr-2">
            <div className="flex gap-x-2">
              <div
                className={
                  searchHasFocus || searchResults.length > 0
                    ? "w-32 tablet:w-auto"
                    : "w-full tablet:w-auto"
                }
              >
                <ReasonForLossFacetAsFormSelect
                  shallow={true}
                  facet={facets}
                  onChange={(value) => {
                    router.push(
                      `?${resolveAsQuery({
                        ...query,
                        reasonForLoss: value,
                        shipwreckId: undefined,
                        searchQuery: "",
                      })}`,
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                  }}
                />
              </div>

              <div className="relative">
                <div className="flex">
                  <input
                    autoComplete="off"
                    onFocus={() => {
                      setSearchHasFocus(true);
                    }}
                    onBlur={() => {
                      setSearchHasFocus(false);
                    }}
                    value={query["searchQuery"]}
                    onChange={(evt) => {
                      router.push(
                        `?${resolveAsQuery({
                          ...query,
                          searchQuery: evt.target.value || "",
                        })}`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                    className="w-full border-darkblue tablet:h-12"
                    placeholder={intl.formatMessage({
                      defaultMessage: "Søk etter skip",
                      description: "search shipwreck",
                    })}
                    type="search"
                    onKeyPress={(evt: any) => {
                      const code = evt.keyCode ? evt.keyCode : evt.which;
                      if (code == 13) {
                        //Enter keycode
                        evt.preventDefault();
                        search(evt.target.value, searchOptions);
                      }
                    }}
                  />
                  <button
                    onClick={(evt) => {
                      evt.stopPropagation();
                      search(searchQuery || "", searchOptions);
                    }}
                    className="flex items-center px-2 py-2 tablet:px-4 tablet:py-4  rounded-r-xl bg-darkblue"
                  >
                    <SearchIcon fill={colors.white.DEFAULT} />
                  </button>
                </div>
                {searchResults.length > 0 ? (
                  <div className="absolute w-full mt-2 bg-white rounded-md z-40 shadow-md">
                    <h2 className="border-b border-gray-60 border-solid mr-4 ml-4 pt-4 mb-2 text-sm">
                      <FormattedMessage
                        defaultMessage="Søketreff"
                        description="heading i søketreff forlisside"
                      />
                    </h2>

                    <ul className="">
                      {searchResults.slice(0, 15).map((sr) => {
                        return (
                          <li key={sr.id} className="hover:bg-gray-30 ">
                            <Link
                              shallow={true}
                              href={`?${resolveAsQuery({
                                ...query,
                                shipwreckId: sr.id.toString(),
                                searchQuery: "",
                                reasonForLoss: undefined,
                              })}`}
                            >
                              <a
                                className="block  p-4 no-underline hover:underline "
                                href={`?${resolveAsQuery({
                                  ...query,
                                  shipwreckId: sr.id.toString(),
                                  searchQuery: "",
                                  reasonForLoss: undefined,
                                })}`}
                              >
                                {sr.title}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : searchHasFocus && debouncedValue.length > 0 ? (
                  <DelayedRender>
                    <div className="absolute w-full mt-2 bg-white rounded-md z-40 shadow-md">
                      <h2 className="border-b border-gray-60 border-solid mr-4 ml-4 pt-4 mb-2 text-sm">
                        <FormattedMessage
                          defaultMessage="Ingen søketreff"
                          description="heading i søketreff forlisside"
                        />
                      </h2>

                      <p className=" text-gray-80 pr-4 pl-4 pt-4 mb-2 text-sm">
                        Finner du ikke det du leter etter? Prøv et annet søkeord
                      </p>
                    </div>
                  </DelayedRender>
                ) : null}
              </div>
            </div>
          </div>
        </form>

        <GoogleMap
          id="e83dc0b55e00d793"
          zoom={DEFAULT_ZOOM}
          center={DEFAULT_POS}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          options={{
            mapId: "e83dc0b55e00d793",
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {
              position: google.maps.ControlPosition.BOTTOM_LEFT,
            },
          }}
          onLoad={(map) => {
            mapRef.current = map;
            if (selectedMarker) {
              mapRef.current.setCenter(selectedMarker.coordinates);
            }
          }}
        >
          {Markers}

          {selectedMarker ? (
            <InfoWindow
              key={selectedMarker.id}
              options={{
                pixelOffset: new (window as any).google.maps.Size(0, -30),
                minWidth: 350,
              }}
              position={selectedMarker.coordinates}
              onCloseClick={() => {
                router.push(
                  `?${resolveAsQuery({
                    ...query,
                    searchQuery: "",
                    shipwreckId: undefined,
                  })}`,
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            >
              <ShipDetailDialog shipId={selectedMarker.data.id.toString()} />
            </InfoWindow>
          ) : null}
        </GoogleMap>
        <div className="hidden absolute top-4 right-4 bg-white p-2 rounded-md border border-solid border-color-darkblue desktop:block">
          <ul>
            <li className="flex gap-x-2 py-2">
              <Image src={shotImg.src} width={24} height={24} />
              <FormattedMessage
                defaultMessage="Beskutt"
                description="beskrivelse kart over forlis"
              />
            </li>
            <li className="flex gap-x-2 py-2">
              <Image src={airImg.src} width={24} height={24} />
              <FormattedMessage
                defaultMessage="Flyangrep"
                description="beskrivelse kart over forlis"
              />
            </li>
            <li className="flex gap-x-2 py-2">
              <Image src={hijackedImg.src} width={24} height={24} />
              <FormattedMessage
                defaultMessage="Kapret"
                description="beskrivelse kart over forlis"
              />
            </li>
            <li className="flex gap-x-2 py-2">
              <Image src={mineImg.src} width={24} height={24} />
              <FormattedMessage
                defaultMessage="Minesprengt"
                description="beskrivelse kart over forlis"
              />
            </li>
            <li className="flex gap-x-2 py-2">
              <Image src={torpedoImg.src} width={24} height={24} />
              <FormattedMessage
                defaultMessage="Torpedert"
                description="beskrivelse kart over forlis"
              />
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return isLoaded ? renderMap() : null;
}

const ShipDetailDialog = (props: { shipId: string }) => {
  const { data } = useSWR<IApiShip, string>(
    `/krigsseilerregisteret/api/skip/${props.shipId}`,
    fetcher
  );
  if (!data) {
    return <div style={{ height: "400px", width: "200px" }}></div>;
  }

  return (
    <div>
      <ShipFactbox ship={mapToIShip(data)} />
    </div>
  );
};

const DelayedRender = (props: { children: JSX.Element }) => {
  const [doRender, setDoRender] = React.useState<boolean>(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDoRender(true);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (doRender === false) {
    return null;
  }
  return props.children;
};
