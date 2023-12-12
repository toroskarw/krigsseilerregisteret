import {
  IApiAggregations,
  IApiArchive,
  IApiArchiveResultBase,
} from "./archive";

export type IApiIWarSailorsJournalArchiveAggregations = IApiAggregations<
  "grouped_by_first_letter" | "types"
>;

export type IApiWarSailorsJournalArchive = IApiArchive<
  IApiWarSailorsJournalArchiveResult,
  IApiIWarSailorsJournalArchiveAggregations
>;

interface IApiWarSailorsJournalArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiWarSailorsJournalArchiveSummaryProperties;
}

export interface IApiWarSailorsJournalArchiveSummaryProperties {
  publishedToChannelsInfo: string;
  creatorId: number;
  utgave: string;
  navn: string;
  displayName: string;
  state: string;
  aar: string;
  first_letter: string;
  sorted_by: string;
  type: string;
  tittel: string;
}
