import { ApiArchiveType, IApiFacet } from "./krigsseilerregisteret-api/archive";

export enum ArchiveType {
  ARTICLE = ApiArchiveType.ARTIKKEL,
  SHIPWRECK = ApiArchiveType.FORLIS,
  NAVIGATIONPAGE = ApiArchiveType.NAVIGASJONSSIDE,
  SEAFARER = ApiArchiveType.SJOMANN,
  SHIP = ApiArchiveType.SKIP,
  AWARD = ApiArchiveType.AWARD,
  WARSAILORSJOURNAL = ApiArchiveType.TIDSSKRIFTET_KRIGSSEILEREN,
  WARSAILOR_OF_THE_MONTH = ApiArchiveType.MAANEDENS_KRIGSSEILER,
}

export interface IArchive<TResult, TAggregationType> {
  results: Array<TResult>;
  total: number;
  query: string;
  page: string;
  pagesize: string;
  aggregations: TAggregationType;
}

export interface IFacetValue {
  id: string;
  count: number;
  disabled: boolean;
  queryParamNameOverride?: string;
}

export type IFacet = Array<IFacetValue>;

export const mapToIFacet = (facet: IApiFacet): IFacet => {
  return Object.entries(facet).map(([facetId, facetValue]) => {
    return {
      id: facetId.toString(),
      count: facetValue,
      disabled: false,
    };
  });
};
