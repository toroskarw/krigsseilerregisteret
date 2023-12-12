import { ArchiveType, IArchive, IFacet, mapToIFacet } from "./archive";
import {
  IApiShipArchive,
  ShipwreckCausedBy,
} from "./krigsseilerregisteret-api/shipArchive";

export type IShipwreckArchive = IArchive<
  IShipwreckArchiveResult,
  IShipwreckFacets
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IShipwreckFacets {
  byNation: IFacet;
  cause: IFacet;
  performedBy: IFacet;
}

export interface IShipwreckArchiveResult {
  id: number;
  type: ArchiveType;
  title: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  causedBy: ShipwreckCausedBy | "ukjent";
}

const mapToCoordinates = (longitude?: string, latitude?: string) => {
  if (!latitude || !longitude) {
    return null;
  }
  const longitudeAsNumber = parseFloat(longitude.replace(",", "."));
  const latitudeAsNumber = parseFloat(latitude.replace(",", "."));

  if (isNaN(latitudeAsNumber) || isNaN(longitudeAsNumber)) {
    return null;
  }
  return {
    longitude: longitudeAsNumber,
    latitude: latitudeAsNumber,
  };
};

export const mapToShipwreckArchive = (
  data: IApiShipArchive
): IShipwreckArchive => {
  return {
    ...data,
    aggregations: {
      byNation: mapToIFacet(data.aggregations.senket_utfort_av_nasjonalitet),
      cause: mapToIFacet(data.aggregations.senket_aarsak_ww2),
      performedBy: mapToIFacet(data.aggregations.senket_utfort_av_type_ww2),
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType.SHIP,
        title: r.summaryProperties.displayName,
        coordinates: mapToCoordinates(
          r.summaryProperties.senketLengdegrad,
          r.summaryProperties.senketBreddegrad
        ),
        causedBy: r.summaryProperties.senket_aarsak_ww2
          ? r.summaryProperties.senket_aarsak_ww2
          : "ukjent",
      };
    }),
  };
};
