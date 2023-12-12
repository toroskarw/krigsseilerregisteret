import { mapToDefaultMetadata, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiSailorsClub } from "./krigsseilerregisteret-api/sailorsClub";

export type ISailorsClubBase = IContent; // Expand to interface if type needs additional properties

export type ISailorsClub = ISailorsClubBase; // Expand to interface if type needs additional properties

export const mapToISailorsClubBase = (
  data: IApiSailorsClub
): ISailorsClubBase => {
  return {
    id: data.id,
    displayName: data.displayName,
    type: ContentType.SAILORSCLUB,
    metadata: mapToDefaultMetadata(data),
  };
};

export const mapToISailorsClub = (data: IApiSailorsClub): ISailorsClub => {
  return {
    ...mapToISailorsClubBase(data),
  };
};
