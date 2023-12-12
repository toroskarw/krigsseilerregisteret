import { IApiArchive, IApiArchiveResultBase } from "./archive";
import { ApiContentType } from "./common";

export type IApiWarSailorOfTheMonthArchive = IApiArchive<
  IApiWarSailorOfTheMonthArchiveResult,
  unknown
>;

interface IApiWarSailorOfTheMonthArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiWarSailorOfTheMonthArchiveSummaryProperties;
}

export interface IApiWarSailorOfTheMonthArchiveSummaryProperties {
  //TODO: fix
  publishedToChannelsInfo: string;
  creatorId: number;
  navn: string;
  displayName: string;
  state: string;
  overskrift: string;
  first_letter: string;
  ingress: string;
  brodtekst: string;
  sorted_by: string;
  forsideTekst: string;
  bildeId?: string;
  type: ApiContentType.MAANEDENS_KRIGSSEILER;
}
