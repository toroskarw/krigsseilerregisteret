import { IApiAggregations, IApiArchive } from "./archive";

export type IApiRelatedArchive = IApiArchive<
  any, //FIXME: finn riktig type som skal brukes her
  IApiRelatedArchiveAggregations
>;

export type IApiRelatedArchiveAggregations = IApiAggregations<
  | "nasjonalitet"
  | "grouped_by_first_letter"
  | "tjenestegjorde_i_krig"
  | "types"
  | "senket_i_krig"
  | "senket_aarsak_ww2"
  | "senket_utfort_av_type_ww2"
  | "senket_utfort_av_nasjonalitet"
>;
