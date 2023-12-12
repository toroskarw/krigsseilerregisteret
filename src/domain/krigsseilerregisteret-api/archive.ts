import { ApiContentType, IApiSelfLink } from "./common";

export interface IApiArchive<TArchiveResultBase, TAggregationType> {
  _links: IApiSelfLink;
  _embedded: IApiArchiveEmbedded<TArchiveResultBase>;
  total: number;
  query: string;
  page: string;
  pagesize: string;
  aggregations: TAggregationType; // TODO: Implementer riktig TFacetIdentifier
}

export interface IApiArchiveEmbedded<IApiArchiveResultBase> {
  results: Array<IApiArchiveResultBase>;
}

export interface IApiArchiveResultBase {
  _links: IApiSelfLink;
  id: number;
  score: null;
  title: string;
  highlight: string;
  type: ApiArchiveType;
  summaryProperties: any; // TODO: Spesifiser
}

export interface IApiArchiveSummaryPropertiesBase {
  type: ApiContentType;
}

export type IApiAggregations<TFacetIdentifier extends string> = {
  [key in TFacetIdentifier]: IApiFacet;
};

export interface IApiFacet {
  [key: string]: number;
}

export enum ApiArchiveType {
  ARTIKKEL = "artikkel",
  AWARD = "utmerkelse",
  FORLIS = "forlis",
  NAVIGASJONSSIDE = "navigasjonsside",
  SJOMANN = "sjomann",
  SKIP = "skip",
  TIDSSKRIFTET_KRIGSSEILEREN = "tidsskriftet_krigsseileren",
  MAANEDENS_KRIGSSEILER = "maanedens_krigsseiler",
}

export type IApiArchiveAggregations = IApiAggregations<
  | "flaatetilhoriget"
  | "geografisk_tilknytning"
  | "grouped_by_first_letter"
  | "hvalfangsekspedisjonen"
  | "kjonn"
  | "nasjonalitet"
  | "omkommetWW1"
  | "omkommetWW2"
  | "senket_aarsak_ww2"
  | "senket_i_krig"
  | "senket_utført_av_nasjonalitet"
  | "skipstype"
  | "spesiellOmtale"
  | "types"
>;
