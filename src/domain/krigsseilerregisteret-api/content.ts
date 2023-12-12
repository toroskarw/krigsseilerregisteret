import {
  ApiContentType,
  IApiKrigsseilerregisteretLink,
  IApiMetadatum,
  IApiRelationship,
  IApiSelfLink,
  IApiSjohistorieLink,
} from "./common";

interface IApiEmbedded<TRelationships> {
  metadata: Array<IApiMetadatum>;
  relationships: Array<TRelationships>;
}

export interface IApiContent<
  TRelationship = IApiRelationship<unknown, unknown>
> {
  _links: IApiSelfLink & IApiKrigsseilerregisteretLink & IApiSjohistorieLink;
  _embedded: IApiEmbedded<TRelationship>;
  id: number;
  displayName?: string;
  type?: ApiContentType;
}
