import { IMetadata } from "./content";
import { IApiContent } from "./krigsseilerregisteret-api/content";

export interface IGranularDate {
  day?: number;
  month?: number;
  year?: number;
}

export const mapToGranularDate = (
  year?: number,
  month?: number,
  day?: number
): IGranularDate | null => {
  if (!year && !month && !day) {
    return null;
  }
  return {
    year: year || null,
    day: day || null,
    month: month || null,
  };
};

export const mapToMetadata = (content: IApiContent): IMetadata => {
  return {
    publishedTo: {
      sjohistorie: content._links.sjohistorie ? true : false,
      krigsseilerregisteret: content._links.krigsseilerregisteret
        ? true
        : false,
    },
  };
};

export const mapToDefaultMetadata = (content: IApiContent): IMetadata => {
  // For en del innhold ønsker vi kun å lenke ut til sjøhistorie. Uavhengig om det er publisert på krigsseilerregisteret
  // Ved å bruke denne konfigurasjonen overstyres evt. publish targets
  return {
    publishedTo: {
      sjohistorie: content._links.sjohistorie ? true : false,
      krigsseilerregisteret: false,
    },
  };
};

export const formatSjohistoriePath = (path: string): string => {
  const split = path.split("/");
  const contentType = split[split.length - 2];
  const id = split[split.length - 1];
  const newPath = `https://www.sjohistorie.no/no/${contentType}/${id}`;
  return newPath;
};
