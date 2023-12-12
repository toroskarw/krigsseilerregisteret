import { ArchiveType, IArchive, IFacet, mapToIFacet } from "./archive";
import { IApiSeafarerArchive } from "./krigsseilerregisteret-api/seafarerArchive";

export type ISeafarerArchive = IArchive<
  ISeafarerArchiveResult,
  ISeafarerFacets
>;

export interface ISeafarerFacets {
  nationality: IFacet;
  gender: IFacet;
  byFirstLetter: IFacet;
  participatedInWar: IFacet;
  service: IFacet;
  county: IFacet;
  diedDuringWW2: IFacet;
  whalingExpedition: IFacet;
}

export interface ISeafarerArchiveResult {
  id: number;
  type: ArchiveType;
  title: string;
  firstName: string;
  lastName: string;
  hasImages: boolean;
  countryCode: string;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  placeOfBirth?: string;
  placeOfLiving?: string;
}

export const mapToSeafarerArchive = (
  data: IApiSeafarerArchive
): ISeafarerArchive => {
  return {
    ...data,
    aggregations: {
      nationality: mapToIFacet(data.aggregations.nasjonalitet),
      gender: mapToIFacet(data.aggregations.kjonn),
      byFirstLetter: mapToIFacet(data.aggregations.grouped_by_first_letter),
      participatedInWar: mapToIFacet(data.aggregations.tjenestegjorde_i_krig),
      service: mapToIFacet(data.aggregations.flaatetilhorighet),
      county: mapToIFacet(data.aggregations.geografisk_tilknytning),
      diedDuringWW2: mapToIFacet(data.aggregations.omkommetWW2),
      whalingExpedition: mapToIFacet(data.aggregations.hvalfangstekspedisjon),
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType.SEAFARER,
        title: r.title ?? null,
        firstName: r.summaryProperties.fornavn,
        lastName: r.summaryProperties.etternavn,
        countryCode: r.summaryProperties.nasjonalitet,
        displayName: r.summaryProperties.displayName ?? null,
        birthYear: r.summaryProperties.fodtAar ?? null,
        birthMonth: r.summaryProperties.fodtMaaned ?? null,
        birthDay: r.summaryProperties.fodtDag ?? null,
        placeOfBirth: r.summaryProperties.fodested ?? null,
        placeOfLiving: r.summaryProperties.bosted ?? null,
        hasImages: r.summaryProperties.hasImages,
      };
    }),
  };
};
