import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiNation } from "./krigsseilerregisteret-api/nation";

export interface INationBase extends IContent {
  id: number;
  countryCode: string;
}

export type INation = INationBase;

export const mapToINationBase = (data: IApiNation): INationBase => {
  if (!data) {
    return null;
  }
  return {
    id: data.id,
    countryCode: data.landkode,
    type: ContentType.NATION,
    metadata: mapToMetadata(data),
  };
};
