import {
  IApiAggregations,
  IApiArchive,
  IApiArchiveResultBase,
} from "./archive";
import { ApiContentType } from "./common";

export type IApiAwardArchiveAggregations = IApiAggregations<
  "grouped_by_first_letter" | "nasjonalitet"
>;

export type IApiAwardArchive = IApiArchive<
  IApiAwardArchiveResult,
  IApiAwardArchiveAggregations
>;

interface IApiAwardArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiAwardArchiveSummaryProperties;
}

export interface IApiAwardArchiveSummaryProperties {
  publishedToChannelsInfo: string;
  creatorId: number;
  navn: string;
  rangering: string;
  displayName: string;
  nasjonalitet: string;
  state: string;
  first_letter: string;
  sorted_by: string;
  type: ApiContentType.UTMERKELSE;
}
