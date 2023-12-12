import { ApiContentType } from "./common";
import { IApiContent } from "./content";
import { IApiFileRelationship } from "./file";

export type contentType = ApiContentType.TIDSSKRIFTET_KRIGSSEILEREN;

export interface IApiWarSailorsJournal
  extends IApiContent<IApiWarSailorsJournalRelationships> {
  id: number;
  tittel?: string;
  utgave?: string;
  aar?: string;
  type: ApiContentType.TIDSSKRIFTET_KRIGSSEILEREN;
  displayName: string;
}

export type IApiWarSailorsJournalRelationships = IApiFileRelationship;
