import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.MONSTRINGSDISTRIKT;

export interface IApiEnlistmentDistrict extends IApiContent {
  id: number;
  displayName: string;
}
