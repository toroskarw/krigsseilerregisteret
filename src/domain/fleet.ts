import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiFleet } from "./krigsseilerregisteret-api/fleet";

export type IFleetBase = IContent; // Expand to interface if type needs additional properties

export type IFleet = IFleetBase; // Expand to interface if type needs additional properties

export const mapToIFleetBase = (data: IApiFleet): IFleetBase => {
  return {
    id: data.id,
    displayName: data.displayName,
    type: ContentType.FLEET,
    metadata: mapToMetadata(data),
  };
};

export const mapToIFleet = (data: IApiFleet): IFleetBase => {
  return {
    ...mapToIFleetBase(data),
  };
};
