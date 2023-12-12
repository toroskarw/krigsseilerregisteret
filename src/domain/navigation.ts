import { IArticleBase, getTimePeriods, mapToIArticleBase } from "./article";
import { ICategory } from "./category";
import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IImage, getImages } from "./image";

import {
  ApiContentType,
  ApiRelationshipType,
} from "./krigsseilerregisteret-api/common";
import {
  IAPINavigationSubPage,
  IApiNavigation,
} from "./krigsseilerregisteret-api/navigation";
import { getOtherplayersByRelationshipType } from "./krigsseilerregisteret-api/utils/relationship";
import {
  IWarSailorOfTheMonthBase,
  mapToIWarSailorOfTheMonthBase,
} from "./warSailorOfTheMonth";

export interface INavigationBase extends IContent {
  slug: string;
  title: string;
  leadParagraph: string;
  subPages: Array<INavigationSubPage>;
  images?: Array<IImage>;
}

export interface INavigationSubPage extends INavigationBase {
  timeperiods: Array<ICategory>;
  content: IArticleBase | INavigationBase | IWarSailorOfTheMonthBase;
}

export type INavigation = INavigationBase;

const apiContentTypeToContentType = (apiContentType: ApiContentType) => {
  //also accomodate for buggy lowercase mapping returned from the api.
  switch (apiContentType) {
    case ApiContentType.ARTIKKEL:
      return ContentType.ARTICLE;
    //@ts-expect-error Accommodate for buggy lowercase mapping returned from api
    case "artikkel":
      return ContentType.ARTICLE;
    case ApiContentType.MAANEDENS_KRIGSSEILER:
      return ContentType.WARSAILOR_OF_THE_MONTH;
    //@ts-expect-error Accommodate for buggy lowercase mapping returned from api
    case "maanedens-krigsseiler":
      return ContentType.WARSAILOR_OF_THE_MONTH;

    case ApiContentType.NAVIGASJONSSIDE:
      return ContentType.NAVIGATION;
    //@ts-expect-error Accommodate for buggy lowercase mapping returned from api
    case "navigasjonsside":
      return ContentType.NAVIGATION;
    default:
      return ContentType.NAVIGATION;
  }
};

export const mapToINavigationBase = (data: IApiNavigation): INavigationBase => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.overskrift ?? null,
    type: apiContentTypeToContentType(data.type),
    title: data.overskrift,
    slug: data.alias ?? null,
    leadParagraph: data.ingress ?? null,
    subPages: getSubPages(data) || [],
    images: getImages(data) ?? null,
    metadata: mapToMetadata(data),
  };
};

export const mapToINavigation = (data: IApiNavigation): INavigation => {
  return {
    ...mapToINavigationBase(data),
  };
};

const mapIAPINavigationSubPageToApiContent = (
  content: IAPINavigationSubPage
) => {
  //also accomodate for buggy lowercase mapping returned from the api.
  switch (content.type) {
    case ApiContentType.ARTIKKEL:
      return mapToIArticleBase(content);
    //@ts-expect-error Accommodate for buggy lowercase mapping returned from api
    case "artikkel":
      return mapToIArticleBase(content);
    case ApiContentType.NAVIGASJONSSIDE:
      return mapToINavigationBase(content);
    //@ts-expect-error Accommodate for buggy lowercase mapping returned from api
    case "navigasjonsside":
      return mapToINavigationBase(content);
    case ApiContentType.MAANEDENS_KRIGSSEILER:
      return mapToIWarSailorOfTheMonthBase(content);
    //@ts-expect-error Accommodate for buggy lowercase mapping returned from api
    case "maanedens-krigsseiler":
      return mapToIWarSailorOfTheMonthBase(content);
    default:
      throw Error("Not implemented");
  }
};

export const mapToINavigationSubPage = (
  data: IAPINavigationSubPage
): INavigationSubPage => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.overskrift ?? null,
    type: apiContentTypeToContentType(data.type),
    title: data.overskrift,
    slug: data.alias ?? null,
    leadParagraph: data.ingress ?? null,
    images: getImages(data) ?? null,
    metadata: mapToMetadata(data),
    subPages: [],
    timeperiods:
      data.type === ApiContentType.ARTIKKEL.toLocaleLowerCase()
        ? getTimePeriods(data)
        : [],
    content: mapIAPINavigationSubPageToApiContent(data),
  };
};

const getSubPages = (data: IApiNavigation): Array<INavigationSubPage> => {
  const navigationspages = getOtherplayersByRelationshipType<
    ApiRelationshipType.HAR_UNDERSIDER,
    IAPINavigationSubPage
  >(data, ApiRelationshipType.HAR_UNDERSIDER);

  if (navigationspages) {
    return navigationspages.map((navigationspage) => {
      return mapToINavigationSubPage(navigationspage);
    });
  } else {
    return null;
  }
};
