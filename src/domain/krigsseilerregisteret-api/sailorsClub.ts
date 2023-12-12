import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.SJOMANNSFORENING;

export interface IApiSailorsClub extends IApiContent {
  id: number;
  displayName: string;
}
