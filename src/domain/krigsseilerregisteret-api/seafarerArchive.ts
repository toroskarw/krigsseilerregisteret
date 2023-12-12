import {
  IApiAggregations,
  IApiArchive,
  IApiArchiveResultBase,
  IApiArchiveSummaryPropertiesBase,
} from "./archive";
import { ApiContentType } from "./common";

export type IApiSeafarerArchive = IApiArchive<
  IApiSeafarerArchiveResult,
  IApiSeafarerArchiveAggregations
>;

export interface IApiSeafarerArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiSeafarerArchiveSummaryProperties;
}

export type IApiSeafarerArchiveAggregations = IApiAggregations<
  | "flaatetilhorighet"
  | "geografisk_tilknytning"
  | "grouped_by_first_letter"
  | "tjenestegjorde_i_krig"
  | "hvalfangstekspedisjon"
  | "kjonn"
  | "nasjonalitet"
  | "omkommetWW2"
>;

export interface IApiSeafarerArchiveSummaryProperties
  extends IApiArchiveSummaryPropertiesBase {
  creatorId: number;
  etternavn: string;
  first_letter: string;
  flaatetilhorighet: number[];
  fornavn: string;
  geografisk_tilknytning: number[];
  hasImages: boolean;
  hvalfangstekspedisjon: boolean;
  nasjonalitet: string;
  omkommetWW1: boolean;
  omkommetWW2: boolean;
  publishedToChannelsInfo: string;
  related: Array<any[] | number>;
  sorted_by: string;
  sorted_by_firstname: string;
  sorted_by_place: string;
  sorted_by_surname: string;
  state: string;
  tjenestegjorde_i_krig: Array<"ww1" | "ww2">;
  type: ApiContentType.SJOMANN;
  // Nullable below
  _fodt?: string;
  _import_krigsforlis_merknad?: string;
  _importSourceId?: string;
  _nasjonalitet?: string;
  _visLokaltRegister?: boolean;
  annotasjonsrulle?: string;
  bortePaaHavet?: boolean;
  bosted?: string;
  displayName?: string;
  dodAar?: number;
  dodDag?: number;
  dodMaaned?: number;
  dodsaarsak?: string;
  dodsdato?: number;
  fodested?: string;
  fodselsdato?: number;
  fodtAar?: number;
  fodtDag?: number;
  fodtMaaned?: number;
  foreldre?: string;
  kallenavn?: string;
  kildeinformasjon: string;
  kjonn?: "M" | "F";
  matrosrulle?: string;
  nasjonalitetVisningsnavn?: string;
  navn?: string;
  nortrashipSkytter?: boolean;
  sivilstatus?: string;
  sorted_by_age?: Date;
  tjenestegjordeWW1?: boolean;
  tjenestegjordeWW2?: boolean;
}
