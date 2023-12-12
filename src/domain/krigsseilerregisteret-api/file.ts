import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";

export type IApiFileRelationship = IApiRelationship<
  ApiRelationshipType.HAR_TILKNYTTEDE_FILER,
  IApiFile,
  {
    title: string;
  }
>;

export interface IApiFile extends IApiContent<IApiFileRelationship> {
  filename: string;
  type: ApiContentType.FILE;
  name?: string;
  //"displayName": "displayName not set for type: FILE"
}
