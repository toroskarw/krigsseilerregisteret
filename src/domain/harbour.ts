import { mapToDefaultMetadata, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiHarbour } from "./krigsseilerregisteret-api/harbour";

export type IHarbour = IHarbourBase; // Expand to interface if type needs additional properties

export interface IHarbourBase extends IContent {
  id: number;
  displayName?: string;
  name?: string;
  type: ContentType;
  additionalDetails?: string;
  latitude?: string;
  longitude?: string;
}

export const mapToIHarbourBase = (data: IApiHarbour): IHarbourBase => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.navn ?? null,
    type: ContentType.HARBOUR,
    additionalDetails: data.utfyllendeOpplysninger ?? null,
    latitude: data.latitude ?? null,
    longitude: data.latitude ?? null,
    name: data.navn ?? null,
    metadata: mapToDefaultMetadata(data),
  };
};

export const mapToIHarbour = (data: IApiHarbour): IHarbourBase => {
  return {
    ...mapToIHarbourBase(data),
  };
};
