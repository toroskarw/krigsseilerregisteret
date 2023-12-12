import { ApiContentType } from "./krigsseilerregisteret-api/common";

export const enum ContentType {
  ARTICLE = ApiContentType.ARTIKKEL,
  REGION = ApiContentType.FYLKE,
  ENLISTMENT = ApiContentType.MONSTRING,
  HARBOUR = ApiContentType.HAVN,
  SAILORSCLUB = ApiContentType.SJOMANNSFORENING,
  SEAFARER = ApiContentType.SJOMANN,
  SHIP = ApiContentType.SKIP,
  IMAGE = ApiContentType.IMAGE,
  FLEET = ApiContentType.FLAATE,
  POSITION = ApiContentType.STILLING,
  ENLISTMENTDISTRICT = ApiContentType.MONSTRINGSDISTRIKT,
  SHIPPINGCOMPANY = ApiContentType.REDERI,
  NATION = ApiContentType.NASJON,
  EDUCATION = ApiContentType.UTDANNELSE,
  SHIPWRECK = ApiContentType.FORLIS,
  FILE = ApiContentType.FILE,
  ENGINE = ApiContentType.MOTOR,
  NAVIGATION = ApiContentType.NAVIGASJONSSIDE,
  WARSAILORSJOURNAL = ApiContentType.TIDSSKRIFTET_KRIGSSEILEREN,
  AWARD = ApiContentType.UTMERKELSE,
  CATEGORY = ApiContentType.KATEGORI,
  WARSAILOR_OF_THE_MONTH = ApiContentType.MAANEDENS_KRIGSSEILER,
}

export interface IMetadata {
  publishedTo: IChannels;
}

export interface IChannels {
  krigsseilerregisteret: boolean;
  sjohistorie: boolean;
}
export interface IContent {
  id: number;
  displayName?: string;
  type: ContentType;
  metadata: IMetadata;
}
