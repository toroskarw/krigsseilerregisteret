import { ArchiveType, IArchive, IFacet, mapToIFacet } from "./archive";
import { IApiAwardArchive } from "./krigsseilerregisteret-api/awardArchive";

export type IAwardArchive = IArchive<IAwardArchiveResult, IAwardFacets>;

export interface IAwardFacets {
  nationality: IFacet;
  byFirstLetter: IFacet;
}

export interface IAwardArchiveResult {
  id: number;
  type: ArchiveType;
  title: string;
  ranking: string;
  publishedToChannelsInfo: string;
  creatorId?: number;
  navn: string;
  displayName: string;
  nasjonalitet: string;
  state: string;
  first_letter?: string;
  sorted_by?: string;
}

export const mapToAwardArchive = (data: IApiAwardArchive): IAwardArchive => {
  return {
    ...data,
    aggregations: {
      nationality: mapToIFacet(data.aggregations.nasjonalitet),
      byFirstLetter: mapToIFacet(data.aggregations.grouped_by_first_letter),
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType.AWARD,
        title: r.title ?? null,
        ranking: r.summaryProperties.rangering ?? null,
        publishedToChannelsInfo:
          r.summaryProperties.publishedToChannelsInfo ?? null,
        nasjonalitet: r.summaryProperties.nasjonalitet ?? null,
        navn: r.summaryProperties.navn ?? null,
        first_letter: r.summaryProperties.first_letter ?? null,
        state: r.summaryProperties.state ?? null,
        displayName:
          r.summaryProperties.displayName ?? r.summaryProperties.navn ?? null,
      };
    }),
  };
};
