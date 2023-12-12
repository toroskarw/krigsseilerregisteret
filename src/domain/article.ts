import { ICategory, mapToICategory } from "./category";
import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { getFiles, IFile } from "./file";
import { IImage, mapToImage } from "./image";
import { IApiArticle } from "./krigsseilerregisteret-api/article";
import { IApiCategory } from "./krigsseilerregisteret-api/category";
import { ApiRelationshipType } from "./krigsseilerregisteret-api/common";
import { IApiImage } from "./krigsseilerregisteret-api/image";
import { IAPINavigationSubPage } from "./krigsseilerregisteret-api/navigation";
import {
  getOtherplayersByRelationshipType,
  getRelationshipsOfType,
} from "./krigsseilerregisteret-api/utils/relationship";
import { IRelated } from "./related";

export interface IArticleBase extends IContent {
  slug: string;
  title: string;
  bodyText: string;
  leadParagraph: string;
}

export interface IArticle extends IArticleBase {
  images: Array<IImage>;
  documents: Array<IFile>;
  related?: Array<IRelated>;
  timeperiods: Array<ICategory>;
}

export const mapToIArticleBase = (data: IApiArticle): IArticleBase => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.overskrift ?? null,
    type: ContentType.ARTICLE,
    title: data.overskrift,
    bodyText: data.brodtekst ?? null,
    slug: data.alias ?? null,
    leadParagraph: data.ingress ?? null,
    metadata: mapToMetadata(data),
  };
};

export const mapToIArticle = (data: IApiArticle): IArticle => {
  return {
    ...mapToIArticleBase(data),
    images: getImages(data),
    documents: getFiles(data),
    timeperiods: getOtherplayersByRelationshipType<
      ApiRelationshipType.HAR_TILKNYTTET_TIDSPERIODE,
      IApiCategory
    >(data, ApiRelationshipType.HAR_TILKNYTTET_TIDSPERIODE).map(mapToICategory),
  };
};

const getImages = (data: IApiArticle): Array<IImage> => {
  return getRelationshipsOfType<
    ApiRelationshipType.HAR_TILKNYTTEDE_BILDER,
    IApiImage
  >(data, ApiRelationshipType.HAR_TILKNYTTEDE_BILDER).map(mapToImage);
};

export const getTimePeriods = (
  data: IAPINavigationSubPage
): Array<ICategory> => {
  return getOtherplayersByRelationshipType<
    ApiRelationshipType.HAR_TILKNYTTET_TIDSPERIODE,
    IApiCategory
  >(data, ApiRelationshipType.HAR_TILKNYTTET_TIDSPERIODE).map(mapToICategory);
};
