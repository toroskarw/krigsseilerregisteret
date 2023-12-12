import { mapToDefaultMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiEnlistmentDistrict } from "./krigsseilerregisteret-api/enlistmentDistrict";

export type IEnlistmentDistrictBase = IContent; // Expand to interface if type needs additional properties

export type IEnlistmentDistrict = IEnlistmentDistrictBase; // Expand to interface if type needs additional properties

export const mapToIEnlistmentDistrictBase = (
  data: IApiEnlistmentDistrict
): IEnlistmentDistrictBase => {
  return {
    id: data.id,
    displayName: data.displayName,
    type: ContentType.ENLISTMENTDISTRICT,
    metadata: mapToDefaultMetadata(data),
  };
};

export const mapToIEnlistmentDistrict = (
  data: IApiEnlistmentDistrict
): IEnlistmentDistrict => {
  return {
    ...mapToIEnlistmentDistrictBase(data),
  };
};
