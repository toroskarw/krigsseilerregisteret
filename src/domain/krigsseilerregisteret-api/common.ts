export interface IApiCreator {
  id: number;
  name: string;
}
export interface IApiPublishedToChannel {
  id: number;
  url: string;
  identifier: IApiChannelIdentifier;
  name: IApiChannelName;
}
export enum IApiChannelName {
  Krigsseilerregisteret = "Krigsseilerregisteret.no",
  SjøhistorieNo = "Sjøhistorie.no",
}

export enum IApiChannelIdentifier {
  Krigsseilerregisteret = "krigsseilerregisteret",
  Sjohistorie = "sjohistorie",
}

export interface IApiWorkflow {
  state: string;
}

export interface IApiMetadatum {
  id: number;
  publishedToChannels: IApiPublishedToChannel[];
  created: number;
  creator: IApiCreator;
  modified: number;
  modifier: IApiCreator;
  workflow: IApiWorkflow;
}

export interface IApiLink {
  href: string;
}

export interface IApiSelfLink {
  self: IApiLink;
}

export interface IApiSjohistorieLink {
  sjohistorie: IApiLink | IApiLink[];
}

export interface IApiKrigsseilerregisteretLink {
  krigsseilerregisteret: IApiLink | IApiLink[];
}

export interface IApiRelationship<
  TRelationshipType,
  TOtherPlayer,
  TProperties extends object = Record<string, unknown>
> {
  id: number;
  type: TRelationshipType;
  properties: TProperties;
  _embedded: {
    otherplayer: [TOtherPlayer];
  };
}

export enum ApiRelationshipType {
  MONSTRET_PAA_I = "MONSTRET_PAA_I",
  MONSTRET_AV_I = "MONSTRET_AV_I",
  MEDLEM_AV = "MEDLEM_AV",
  TILHORT_MONSTRINGSDISTRIKT = "TILHORT_MONSTRINGSDISTRIKT",
  GEOGRAFISK_TILKNYTNING = "GEOGRAFISK_TILKNYTNING",
  HOYESTE_STILLING = "HOYESTE_STILLING",
  UTDANNELSE_INNEN = "UTDANNELSE_INNEN",
  SEILT_FOR = "SEILT_FOR",
  TJENESTEGJORDE_I = "TJENESTEGJORDE_I",
  HAR_MOTTATT = "HAR_MOTTATT",
  DELTAKER_I_FORLIS = "DELTAKER_I_FORLIS",
  HAS_METADATA = "HAS_METADATA",
  OMHANDLER = "OMHANDLER",
  HAR_TILKNYTTEDE_BILDER = "HAR_TILKNYTTEDE_BILDER",
  HAR_TILKNYTTEDE_FILER = "HAR_TILKNYTTEDE_FILER",
  HAR_MONSTRINGER = "HAR_MONSTRINGER",
  GJENNOMFORTE_MONSTRING = "GJENNOMFORTE_MONSTRING",
  OMHANDLET_I = "OMHANDLET_I",
  I_STILLING_SOM = "I_STILLING_SOM",
  EID_AV = "EID_AV",
  TILHORT_HAVN = "TILHORT_HAVN",
  BYGGET_AV = "BYGGET_AV",
  HAR_SPESIELL_OMTALE = "HAR_SPESIELL_OMTALE",
  HAR_UTSTYR = "HAR_UTSTYR",
  HAR_UNDERSIDER = "HAR_UNDERSIDER",
  SENKET_AV_NASJON = "SENKET_AV_NASJON",
  HAR_TILKNYTTET_TIDSPERIODE = "HAR_TILKNYTTET_TIDSPERIODE",
}

export const enum ApiContentType {
  FYLKE = "FYLKE",
  MONSTRING = "MONSTRING",
  HAVN = "HAVN",
  SJOMANNSFORENING = "SJOMANNSFORENING",
  SJOMANN = "SJOMANN",
  SKIP = "SKIP",
  IMAGE = "IMAGE",
  FLAATE = "FLAATE",
  STILLING = "STILLING",
  MONSTRINGSDISTRIKT = "MONSTRINGSDISTRIKT",
  REDERI = "REDERI",
  UTDANNELSE = "UTDANNELSE",
  FORLIS = "FORLIS",
  ARTIKKEL = "ARTIKKEL",
  TIDSSKRIFTET_KRIGSSEILEREN = "TIDSSKRIFTET-KRIGSSEILEREN",
  FILE = "FILE",
  VERFT = "VERFT",
  MOTOR = "MOTOR",
  NAVIGASJONSSIDE = "NAVIGASJONSSIDE",
  UTMERKELSE = "UTMERKELSE",
  NASJON = "NASJON",
  KATEGORI = "KATEGORI",
  MAANEDENS_KRIGSSEILER = "MAANEDENS_KRIGSSEILER",
}
