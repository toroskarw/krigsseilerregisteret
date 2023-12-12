import { mapToDefaultMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiEducation } from "./krigsseilerregisteret-api/education";

export type IEducationBase = IContent; // Expand to interface if type needs additional properties

export type IEducation = IEducationBase; // Expand to interface if type needs additional properties

export const mapToIEducationBase = (data: IApiEducation): IEducationBase => {
  return {
    id: data.id,
    displayName: data.displayName,
    type: ContentType.EDUCATION,
    metadata: mapToDefaultMetadata(data),
  };
};

export const mapToIEducation = (data: IApiEducation): IEducation => {
  return {
    ...mapToIEducationBase(data),
  };
};
