import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";

export type IApiTimePeriodRelationship = IApiRelationship<
  ApiRelationshipType.HAR_TILKNYTTET_TIDSPERIODE,
  IApiCategory
>;

export interface IApiCategory extends IApiContent<IApiTimePeriodRelationship> {
  navn: string;
  type: ApiContentType.KATEGORI;
}
