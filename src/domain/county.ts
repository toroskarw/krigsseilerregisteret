import { IApiCounty } from "./krigsseilerregisteret-api/county";

export interface ICounty {
  id: number;
  displayName: string;
}

export const mapToICounty = (data: IApiCounty): ICounty => {
  return { id: data.id, displayName: data.displayName };
};
