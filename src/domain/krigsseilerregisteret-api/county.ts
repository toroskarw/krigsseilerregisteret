import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.FYLKE;

export interface IApiCounty extends IApiContent {
  id: number;
  displayName: string;
}
