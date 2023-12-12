import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";
import { IApiImageRelationship } from "./image";
import { IApiSeafarer } from "./seafarer";

export type contentType = ApiContentType.MAANEDENS_KRIGSSEILER;

export interface IApiMaanedensKrigsseiler
  extends IApiContent<IApiMaanedensKrigsseilerRelationships> {
  overskrift: string;
  ingress: string;
  brodtekst: string;
  id: number;
  type: contentType;
  forsideTekst: string;
  alias: string;
}

export type IApiMaanedensKrigsseilerRelationships =
  | IApiImageRelationship
  | IApiRelationship<ApiRelationshipType.OMHANDLET_I, IApiSeafarer>;
