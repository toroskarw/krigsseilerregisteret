import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IImage, mapToImage } from "./image";
import { ApiRelationshipType } from "./krigsseilerregisteret-api/common";
import { IApiImage } from "./krigsseilerregisteret-api/image";
import { IApiMaanedensKrigsseiler } from "./krigsseilerregisteret-api/maanedensKrigsseiler";
import { IApiSeafarer } from "./krigsseilerregisteret-api/seafarer";
import {
  getOtherplayersByRelationshipType,
  getRelationshipsOfType,
} from "./krigsseilerregisteret-api/utils/relationship";
import { ISeafarerBase, mapToISeafarerBase } from "./seafarer";

export interface IWarSailorOfTheMonthBase extends IContent {
  title: string;
  bodyText: string;
  leadParagraph: string;
  teaserText: string | null;
}

export interface IWarSailorOfTheMonth extends IWarSailorOfTheMonthBase {
  images: Array<IImage>;
  seafarer: ISeafarerBase | null;
}

export const mapToIWarSailorOfTheMonthBase = (
  data: IApiMaanedensKrigsseiler
): IWarSailorOfTheMonthBase => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.overskrift ?? null,
    type: ContentType.WARSAILOR_OF_THE_MONTH,
    title: data.overskrift,
    bodyText: data.brodtekst ?? null,
    leadParagraph: data.ingress ?? null,
    teaserText: data.forsideTekst ?? null,
    metadata: mapToMetadata(data),
  };
};

export const mapToIWarSailorOfTheMonth = (
  data: IApiMaanedensKrigsseiler
): IWarSailorOfTheMonth => {
  return {
    ...mapToIWarSailorOfTheMonthBase(data),
    images: getImages(data),
    seafarer: getSeafarer(data),
  };
};

const getImages = (data: IApiMaanedensKrigsseiler): Array<IImage> => {
  return getRelationshipsOfType<
    ApiRelationshipType.HAR_TILKNYTTEDE_BILDER,
    IApiImage
  >(data, ApiRelationshipType.HAR_TILKNYTTEDE_BILDER).map(mapToImage);
};

const getSeafarer = (data: IApiMaanedensKrigsseiler): ISeafarerBase => {
  const seafarers = getOtherplayersByRelationshipType<
    ApiRelationshipType.OMHANDLET_I,
    IApiSeafarer
  >(data, ApiRelationshipType.OMHANDLET_I);
  if (seafarers.length == 0) {
    return null;
  }
  return mapToISeafarerBase(seafarers[0]);
};
