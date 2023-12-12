import { ApiContentType } from "./common";
import { IApiContent } from "./content";
import { IApiFileRelationship } from "./file";
import { IApiImageRelationship } from "./image";
import { IApiTimePeriodRelationship } from "./category";

export type contentType = ApiContentType.ARTIKKEL;

export interface IApiArticle extends IApiContent<IApiArticleRelationships> {
  overskrift: string;
  ingress: string;
  brodtekst: string;
  id: number;
  type: contentType;
  alias?: string;
}

export type IApiArticleRelationships =
  | IApiFileRelationship
  | IApiImageRelationship
  | IApiTimePeriodRelationship;
