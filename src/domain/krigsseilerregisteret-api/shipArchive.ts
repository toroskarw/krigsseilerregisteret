import {
  IApiAggregations,
  IApiArchive,
  IApiArchiveResultBase,
  IApiArchiveSummaryPropertiesBase,
} from "./archive";
import { ApiContentType } from "./common";

export type IApiShipArchive = IApiArchive<
  IApiShipArchiveResult,
  IApiShipArchiveAggregations
>;

export interface IApiShipArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiShipArchiveSummaryProperties;
}

export type IApiShipArchiveAggregations = IApiAggregations<
  | "grouped_by_first_letter"
  | "nasjonalitet"
  | "senket_i_krig"
  | "senket_aarsak_ww2"
  | "senket_utfort_av_type_ww2"
  | "senket_utfort_av_nasjonalitet"
  | "skipstype"
  | "spesiellOmtale"
  | "tjenestegjorde_i_krig"
>;

export enum ShipwreckCausedBy {
  "brann_eksplosjon" = "brann_eksplosjon",
  "beskutt" = "beskutt",
  "flyangrep" = "flyangrep",
  "grunnstott_uvaer" = "grunnstott_uvaer",
  "internert" = "internert",
  "kapret" = "kapret",
  "kollisjon" = "kollisjon",
  "minesprengt" = "minesprengt",
  "senket_av_eget_mannskap_eller_alliert_skip" = "senket_av_eget_mannskap_eller_alliert_skip",
  "torpedert" = "torpedert",
  "rekvirert" = "rekvirert",
}

export interface IApiShipArchiveSummaryProperties
  extends IApiArchiveSummaryPropertiesBase {
  visSomBase: boolean;
  senket_utfort_av_type_ww2: null | string;
  fungertSomBase?: boolean;
  senket_utfort_av_nasjonalitet: string[];
  creatorId: number;
  geografisk_tilknytning: Array<string>;
  related: number[];
  spesiellOmtale: number[];
  navn: string[];
  displayName: string;
  tjenestegjordeWW2: boolean;
  skipstype: Array<string>;
  typebetegnelse: string;
  nasjonalitet: string;
  state: string;
  hasImages: boolean;
  senketWW1: boolean;
  fungertSomMarineskip?: boolean;
  tjenestegjorde_i_krig: Array<"ww1" | "ww2">;
  first_letter: string;
  kallesignal: string;
  sorted_by: string;
  type: ApiContentType;
  senket_i_krig: Array<string>;
  senket_aarsak_ww2?: ShipwreckCausedBy;
  nettoTonnasje?: string;
  commerceLaester?: string;
  byggeaar?: string;
  klasse?: string;
  dypgang?: string;
  bredde?: string;
  dodvekt?: string;
  bruttoTonnasje?: string;
  motorstorrelse?: string;
  lengde?: string;
  fart?: string;
  kildeinformasjon?: string;
  leveringsmaaned?: string;
  byggenummer?: string;
  fungertSomHandelsskip?: boolean;
  tapsAarsakDagWW2?: number;
  tapsAarsakUtforelseWW2?: string;
  forlistAarsak?: string;
  senketWW2?: boolean;
  andreNavn?: string;
  tapsAarsakMaanedWW2?: number;
  tapsAarsakWW2?: string;
  tapsAarsakAarWW2?: number;
  senketBreddegrad?: string;
  senketLengdegrad?: string;
  _visNasjonaltRegister?: boolean;
  _visLokaltRegister?: boolean;
  tjenestegjordeWW1?: boolean;
  _nasjonalitet?: string;
  tonnasjeUnderDekk?: string;
  bortePaaHavet?: boolean;
  tollregisterdato?: string;
  _importSourceId?: string;
  skipsregisterindex?: string;
}
