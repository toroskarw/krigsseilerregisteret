import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { getFiles, IFile } from "./file";
import { IApiWarSailorsJournal } from "./krigsseilerregisteret-api/warSailorsJournal";

export interface IWarSailorsJournalBase extends IContent {
  title: string;
  issue: string;
  year: string;
}

export interface IWarSailorsJournal extends IWarSailorsJournalBase {
  documents?: Array<IFile>;
}

export const mapToIWarSailorsJournalBase = (
  data: IApiWarSailorsJournal
): IWarSailorsJournal => {
  return {
    id: data.id,
    issue: data.utgave ?? null,
    title: data.tittel ?? null,
    year: data.aar ?? null,
    displayName: data.displayName ?? null,
    type: ContentType.WARSAILORSJOURNAL,
    metadata: mapToMetadata(data),
  };
};

export const mapToWarSailorsJournal = (
  data: IApiWarSailorsJournal
): IWarSailorsJournal => {
  return {
    ...mapToIWarSailorsJournalBase(data),
    documents: getFiles(data),
  };
};
