import { IApiArticle } from "./article";

import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";
import { IApiMaanedensKrigsseiler } from "./maanedensKrigsseiler";

export type contentType = ApiContentType.NAVIGASJONSSIDE;

export interface IApiNavigation
  extends IApiContent<IApiNavigationRelationship> {
  overskrift: string;
  ingress: string;
  id: number;
  type: contentType;
  alias?: string;
}

export type IApiNavigationRelationship = IApiRelationship<
  ApiRelationshipType.HAR_UNDERSIDER,
  IAPINavigationSubPage,
  {
    end: number;
  }
>;

export type IAPINavigationSubPage =
  | IApiArticle
  | IApiNavigation
  | IApiMaanedensKrigsseiler;
