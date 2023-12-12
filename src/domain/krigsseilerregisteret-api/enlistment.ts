import { IApiArticle } from "./article";
import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";
import { IApiHarbour } from "./harbour";
import { IApiSeafarer } from "./seafarer";
import { IApiShip } from "./ship";

export type contentType = ApiContentType.MONSTRING;

export interface IApiEnlistment<IEnlistmentRelationships>
  extends IApiContent<IEnlistmentRelationships> {
  id: number;
  paamonstringAar?: number;
  paamonstringMaaned?: number;
  paamonstringDag?: number;
  avmonstringAar?: number;
  avmonstringMaaned?: number;
  avmonstringDag?: number;
  personId?: number;
  paamonstringshavnId?: number;
  stillingId?: number;
  avmonstringshavnId?: number;
  skipId?: number;
}

export interface IEnlistmentEmbedded<IEnlistmentRelationships> {
  relationships: Array<IEnlistmentRelationships>;
}

type ISeafarerEnlistmentRelationships =
  | IApiRelationship<ApiRelationshipType.MONSTRET_AV_I, IApiHarbour>
  | IApiRelationship<ApiRelationshipType.HAR_MONSTRINGER, IApiShip>
  | IApiRelationship<ApiRelationshipType.OMHANDLET_I, IApiArticle>;

export type IApiSeafarerEnlistment =
  IApiEnlistment<ISeafarerEnlistmentRelationships>;

type IApiShipEnlistmentRelationships = IApiRelationship<
  ApiRelationshipType.GJENNOMFORTE_MONSTRING,
  IApiSeafarer
>;

export type IApiShipEnlistment =
  IApiEnlistment<IApiShipEnlistmentRelationships>;

export interface IApiShipEnlistmentArchive {
  total: number;
  skip: number;
  limit: number;
  resultset: IApiRelationship<
    ApiRelationshipType.HAR_MONSTRINGER,
    IApiShipEnlistment
  >[];
}
