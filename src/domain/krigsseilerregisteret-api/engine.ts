import { ApiContentType } from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.MOTOR;

export interface IApiEngine extends IApiContent {
  id: number;
  displayName?: string;
  type: contentType;
  navn?: string;
  storrelse?: string;
  byggested?: string;
}
