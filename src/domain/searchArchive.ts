import { ArchiveType, IArchive, IFacet, mapToIFacet } from "./archive";
import { IApiSearchArchive } from "./krigsseilerregisteret-api/searchArchive";

export type ISearchArchive = IArchive<ISearchArchiveResult, ISearchFacets>;

export interface ISearchFacets {
  types: IFacet;
}

export interface ISearchArchiveResult {
  id: number;
  type: ArchiveType;
  title: string;
  firstName?: string;
  lastName?: string;
  buildYear?: string;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  placeOfBirth?: string;
  highlight?: string;
}

export const mapToSearchArchive = (data: IApiSearchArchive): ISearchArchive => {
  return {
    ...data,
    aggregations: {
      types:
        data.aggregations?.types !== null &&
        data.aggregations.types != undefined
          ? mapToIFacet(data.aggregations.types)
          : null,
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType[r.type],
        title: r.title ?? null,
        firstName: r.summaryProperties?.fornavn ?? null,
        lastName: r.summaryProperties?.etternavn ?? null,
        buildYear: r.summaryProperties.byggeaar ?? null,
        birthYear: r.summaryProperties.fodtAar ?? null,
        birthMonth: r.summaryProperties.fodtMaaned ?? null,
        birthDay: r.summaryProperties.fodtDag ?? null,
        placeOfBirth: r.summaryProperties.fodested ?? null,
        highlight: r.highlight ?? null,
      };
    }),
  };
};
