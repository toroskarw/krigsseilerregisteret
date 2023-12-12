import { ContentType } from "./content";
import { IApiCategory } from "./krigsseilerregisteret-api/category";

export interface ICategoryBase {
  displayName: string;
  id: number;
  type: ContentType;
}

export type ICategory = ICategoryBase;

export const mapToICategoryBase = (data: IApiCategory): ICategoryBase => {
  return {
    id: data.id,
    displayName: data.navn,
    type: ContentType.CATEGORY,
  };
};

export const mapToICategory = (data: IApiCategory): ICategory | null => {
  if (!data) {
    return null;
  }
  return {
    ...mapToICategoryBase(data),
  };
};
