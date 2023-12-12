import { ApiContentType } from "./common";
import { IApiContent } from "./content";
import { IApiImageRelationship } from "./image";

export type contentType = ApiContentType.STILLING;

export interface IApiPosition extends IApiContent<IApiPositionRelationships> {
  id: number;
  type: contentType;
  navn: string;
  displayName?: string;
  harUtdypendeInformasjon?: boolean;
  utfyllendeOpplysninger?: string;
}

export type IApiPositionRelationships = IApiImageRelationship;
