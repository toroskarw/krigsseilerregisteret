import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.NASJON;

export interface IApiNation extends IApiContent {
  id: number;
  displayName: string;
  landkode: string;
  type: contentType;
  navn?: string;
}
