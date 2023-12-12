import { ArchiveType, IArchive, IFacet, mapToIFacet } from "./archive";
import { IGranularDate, mapToGranularDate } from "./common";
import {
  IApiShipArchive,
  IApiShipArchiveSummaryProperties,
} from "./krigsseilerregisteret-api/shipArchive";

export type IShipArchive = IArchive<IShipArchiveResult, IShipFacets>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IShipFacets {
  nationality: IFacet;
  byFirstLetter: IFacet;
  lostDuringWar: IFacet;
  typeOfShip: IFacet;
  participatedInWar: IFacet;
  specialServiceSailingAndOrIncidents: IFacet;
  causedByNation: IFacet;
  performedBy: IFacet;
  reasonForLoss: IFacet;
}

export interface IShipArchiveResult {
  id: number;
  type: ArchiveType;
  title: string;
  hasImages: boolean;
  countryCode?: string;
  buildYear?: string;
  lossDuringWW2?: {
    cause: string;
    date?: IGranularDate;
  };
}

export const mapToShipArchive = (data: IApiShipArchive): IShipArchive => {
  return {
    ...data,
    aggregations: {
      nationality: mapToIFacet(data.aggregations.nasjonalitet),
      byFirstLetter: mapToIFacet(data.aggregations.grouped_by_first_letter),
      lostDuringWar: mapToIFacet(data.aggregations.senket_i_krig),
      participatedInWar: mapToIFacet(data.aggregations.tjenestegjorde_i_krig),
      specialServiceSailingAndOrIncidents: mapToIFacet(
        data.aggregations.spesiellOmtale
      ),
      typeOfShip: mapToIFacet(data.aggregations.skipstype),
      reasonForLoss: mapToIFacet(data.aggregations.senket_aarsak_ww2),
      causedByNation: mapToIFacet(
        data.aggregations.senket_utfort_av_nasjonalitet
      ),
      performedBy: mapToIFacet(data.aggregations.senket_utfort_av_type_ww2),
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType.SHIP,
        title: r.summaryProperties.displayName,
        hasImages: r.summaryProperties.hasImages,
        countryCode: r.summaryProperties.nasjonalitet,
        buildYear: r.summaryProperties.byggeaar || "",
        lossDuringWW2: getLossWW2(r.summaryProperties),
      };
    }),
  };
};

const getLossWW2 = (properties: IApiShipArchiveSummaryProperties) => {
  if (!properties.tapsAarsakWW2) {
    return null;
  }
  return {
    cause: properties.tapsAarsakWW2,
    date: mapToGranularDate(
      properties.tapsAarsakAarWW2,
      properties.tapsAarsakMaanedWW2,
      properties.tapsAarsakDagWW2
    ),
  };
};
