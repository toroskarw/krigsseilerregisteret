import { convertToReverseProxyLink } from "../util/constants";
import { ApiRelationshipType } from "./krigsseilerregisteret-api/common";
import { IApiContent } from "./krigsseilerregisteret-api/content";
import {
  IApiImage,
  IApiImageRelationship,
} from "./krigsseilerregisteret-api/image";
import { getRelationshipsOfType } from "./krigsseilerregisteret-api/utils/relationship";

export interface IImage {
  id: number;
  isMainImage: boolean;
  displayName: string;
  copyright: string;
  altText: string;
  description: string;
  fullText: string;
  versions: {
    [key in imageversions]: string;
  };
}

type imageversions =
  | "original"
  | "thumbnail"
  | "high"
  | "gallery-preview"
  | "low"
  | "medium"
  | "height100"
  | "height200";

export const mapToImage = (relationship: IApiImageRelationship): IImage => {
  const otherplayer = relationship._embedded.otherplayer[0];
  const title = relationship.properties.title ?? "";
  const copyright = otherplayer.copyright ?? "";
  let fullText = relationship.properties.description ?? "";
  if (title) {
    fullText = title + " " + fullText;
  }
  if (copyright) {
    fullText = `${fullText}. Copyright: ${copyright}`;
  }

  return {
    id: otherplayer.id,
    description: relationship.properties.description ?? null,
    fullText: fullText,
    displayName: title ?? null,
    isMainImage: relationship.properties.isHovedbilde ?? null,
    copyright: copyright ?? null,
    altText: relationship.properties.altText ?? null,
    versions: {
      original: convertToReverseProxyLink(otherplayer._links.self.href),
      thumbnail: convertToReverseProxyLink(otherplayer._links.thumbnail.href),
      low: convertToReverseProxyLink(otherplayer._links.low.href),
      medium: convertToReverseProxyLink(otherplayer._links.medium.href),
      high: convertToReverseProxyLink(otherplayer._links.high.href),
      "gallery-preview": convertToReverseProxyLink(
        otherplayer._links["gallery-preview"].href
      ),
      height100: convertToReverseProxyLink(otherplayer._links.height100.href),
      height200: convertToReverseProxyLink(otherplayer._links.height200.href),
    },
  };
};

export const getImages = (data: IApiContent): Array<IImage> => {
  return getRelationshipsOfType<
    ApiRelationshipType.HAR_TILKNYTTEDE_BILDER,
    IApiImage
  >(data, ApiRelationshipType.HAR_TILKNYTTEDE_BILDER).map(mapToImage);
};

export const getMainImageOrFirstAvailable = (
  images: Array<IImage>
): null | IImage => {
  if (images.length === 0) {
    return null;
  }
  const mainImage = images.find((i) => i.isMainImage);
  if (mainImage) {
    return mainImage;
  } else {
    return images[0];
  }
};
