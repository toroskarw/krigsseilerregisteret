import paths from "util/paths";
import { IArchive, IFacet, mapToIFacet } from "./archive";
import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { ApiArchiveType } from "./krigsseilerregisteret-api/archive";
import { ApiContentType } from "./krigsseilerregisteret-api/common";
import { IApiRelatedArchive } from "./krigsseilerregisteret-api/related";

export type IRelated = IArchive<IRelatedBase, IRelatedFacets>;

export interface IRelatedBase extends Exclude<IContent, "metadata"> {
  buildYear: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  placeOfBirth: string;
  path: string;
}

export interface IRelatedFacets {
  nationality?: IFacet;
  byFirstLetter: IFacet;
  participatedInWar: IFacet;
  lostDuringWar: IFacet;
  type: IFacet;
}

export const mapToIRelated = (data: IApiRelatedArchive): IRelated => {
  return {
    ...data,
    aggregations: {
      nationality: mapToIFacet(data.aggregations.nasjonalitet),
      byFirstLetter: mapToIFacet(data.aggregations.grouped_by_first_letter),
      participatedInWar: mapToIFacet(data.aggregations.tjenestegjorde_i_krig),
      lostDuringWar: mapToIFacet(data.aggregations.senket_i_krig),
      type: mapToIFacet(data.aggregations.types),
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type:
          r.type === ApiContentType.SJOMANN.toLocaleLowerCase()
            ? ContentType.SEAFARER
            : ContentType.SHIP,
        placeOfBirth: r.summaryProperties.fodested ?? null,
        displayName: r.summaryProperties.displayName ?? null,
        birthYear: r.summaryProperties.fodtAar ?? null,
        birthMonth: r.summaryProperties.fodtMaaned ?? null,
        birthDay: r.summaryProperties.fodtDag ?? null,
        buildYear: r.summaryProperties.byggeaar ?? null,
        path: getFactPath(r.id, r.type),
        metadata: mapToMetadata(r),
      };
    }),
  };
};

const getFactPath = (id: number, contentType: ApiArchiveType) => {
  switch (contentType) {
    case ApiArchiveType.SJOMANN:
      return paths.seafarer(id);
    case ApiArchiveType.SKIP:
      return paths.ship(id);
    default:
      return null;
  }
};
