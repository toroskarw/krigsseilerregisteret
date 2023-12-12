import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.VERFT;

export interface IApiShipyard extends IApiContent {
  navn: string;
}
