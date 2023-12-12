import { ArchiveType, IArchive } from "./archive";
import { IApiArticleArchive } from "./krigsseilerregisteret-api/articleArchive";

export type IArticleArchive = IArchive<IArticleArchiveResult, IArticleFacets>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IArticleFacets {}
export interface IArticleArchiveResult {
  id: number;
  score: string; //TODO: Sjekk denne. Var null på alle instansene som kom fra api
  title: string;
  type: ArchiveType;
  highlight: string;
  publishedToChannelsInfo: string;
  creatorId: number;
  navn: string;
  displayName: string;
  state: string;
  overskrift: string;
  first_letter: string;
  ingress: string;
  brodtekst: string;
  sorted_by: string;
}

// TODO: Ferdigstilles i egen task (KRS-682)
export const mapToArticleArchive = (
  data: IApiArticleArchive
): IArticleArchive => {
  return {
    ...data,
    aggregations: {},

    // FIXME: Uferdig (resten gjøres i egen task - KRS-682) - sjekk for null-verdier
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType.ARTICLE,
        title: r.title,
        highlight: r.highlight,
        score: r.score ?? null,
        publishedToChannelsInfo: r.summaryProperties.publishedToChannelsInfo,
        creatorId: r.summaryProperties.creatorId,
        navn: r.summaryProperties.navn,
        displayName: r.summaryProperties.displayName ?? null,
        state: r.summaryProperties.state,
        overskrift: r.summaryProperties.overskrift,
        first_letter: r.summaryProperties.first_letter,
        ingress: r.summaryProperties.ingress,
        brodtekst: r.summaryProperties.brodtekst,
        sorted_by: r.summaryProperties.sorted_by,
      };
    }),
  };
};
