import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.FLAATE;

export interface IApiFleet extends IApiContent {
  id: number;
  displayName: string;
}
