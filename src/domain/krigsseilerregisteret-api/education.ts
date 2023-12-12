import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.UTDANNELSE;

export interface IApiEducation extends IApiContent {
  id: number;
  displayName: string;
}
