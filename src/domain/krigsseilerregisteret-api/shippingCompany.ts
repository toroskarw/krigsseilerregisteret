import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.REDERI;

export interface IApiShippingCompany extends IApiContent {
  id: number;
  displayName: string;
}
