import {
  IApiAggregations,
  IApiArchive,
  IApiArchiveResultBase,
  IApiArchiveSummaryPropertiesBase,
} from "./archive";

export type IApiSearchArchive = IApiArchive<
  IApiSearchArchiveResult,
  IApiSearchArchiveAggregations
>;

export interface IApiSearchArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiSearchArchiveSummaryProperties;
}

export type IApiSearchArchiveAggregations = IApiAggregations<"types">;

export interface IApiSearchArchiveSummaryProperties
  extends IApiArchiveSummaryPropertiesBase {
  creatorId: number;
  etternavn: string;
  first_letter: string;
  fornavn: string;
  navn: string;
  displayName: string;
  fodested?: string;
  fodselsdato?: number;
  byggeaar?: string;
  buildYear?: string;
  fodtAar?: number;
  fodtMaaned?: number;
  fodtDag?: number;
  placeOfBirth?: string;
  highlight?: string;
}
