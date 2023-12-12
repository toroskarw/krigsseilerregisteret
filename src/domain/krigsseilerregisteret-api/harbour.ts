import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.HAVN;

export interface IApiHarbour extends IApiContent {
  navn?: string;
  utfyllendeOpplysninger?: string;
  latitude?: string;
  longitude?: string;
}
