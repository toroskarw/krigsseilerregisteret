import {
  IApiArchive,
  IApiArchiveAggregations,
  IApiArchiveResultBase,
} from "./archive";
import { ApiContentType } from "./common";

export type IApiArticleArchiveAggregations = IApiArchiveAggregations;

export type IApiArticleArchive = IApiArchive<
  IApiArticleArchiveResult,
  IApiArticleArchiveAggregations
>;

interface IApiArticleArchiveResult extends IApiArchiveResultBase {
  summaryProperties: IApiarticleArchiveSummaryProperties;
}

export interface IApiarticleArchiveSummaryProperties {
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
  type: ApiContentType.ARTIKKEL;
}
