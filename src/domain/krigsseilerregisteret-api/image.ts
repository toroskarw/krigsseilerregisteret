import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";

export type IApiImageRelationship = IApiRelationship<
  ApiRelationshipType.HAR_TILKNYTTEDE_BILDER,
  IApiImage,
  {
    title: string;
    description?: string;
    copyright?: string;
    altText?: string;
    isHovedbilde?: boolean;
  }
>;

export interface IApiImage {
  alternativeText: string;
  copyright: string;
  filename: string;
  id: number;
  type: ApiContentType.IMAGE;
  _links: {
    self: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
    low: {
      href: string;
    };
    medium: {
      href: string;
    };
    high: {
      href: string;
    };
    "gallery-preview": {
      href: string;
    };
    height100: {
      href: string;
    };
    height200: {
      href: string;
    };
  };
}
