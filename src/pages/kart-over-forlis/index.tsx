import { PageHead, PageHeadProps } from "components/PageHead";
import { ArchiveType } from "domain/archive";
import { IApiFacet } from "domain/krigsseilerregisteret-api/archive";
import { IApiShipArchive } from "domain/krigsseilerregisteret-api/shipArchive";
import {
  IShipwreckArchive,
  mapToShipwreckArchive,
} from "domain/shipwreckArchive";
import { MapOfShipWrecks } from "features/mapOfShipwrecks/MapOfShipwrecks";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchArchive } from "util/client";

export const getServerSideProps: GetServerSideProps<{
  shipwreckArchive: IShipwreckArchive;
}> = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );
  //This page only cares about a subset of reasonsForLoss
  //Since the api only currently support single value facet filtering,
  //we emulate the end result by doing 1 request per reason and manually accumulating
  //the result in an IApiShipArchive data structure.
  const reasons = [
    "beskutt",
    "flyangrep",
    "kapret",
    "minesprengt",
    "torpedert",
  ];

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

function MapOfShipWrecksPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.seafarerArchive),
  };

  return (
    <div>
      <PageHead {...pageHeadProps} />
      <MapOfShipWrecks shipwreckArchive={props.shipwreckArchive} />
    </div>
  );
}

export default MapOfShipWrecksPage;
