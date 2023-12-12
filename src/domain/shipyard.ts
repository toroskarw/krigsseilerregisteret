import { mapToDefaultMetadata, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiShipyard } from "./krigsseilerregisteret-api/shipyard";

export type IShipyard = IShipYardBase;

export interface IShipYardBase extends IContent {
  id: number;
  displayName?: string;
  name?: string;
  type: ContentType;
}

export const mapToIHarbourBase = (data: IApiShipyard): IShipYardBase => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.navn ?? null,
    type: ContentType.HARBOUR,
    name: data.navn ?? null,
    metadata: mapToDefaultMetadata(data),
  };
};

export const mapToIShipyard = (data: IApiShipyard): IShipYardBase => {
  return {
    ...mapToIHarbourBase(data),
  };
};
