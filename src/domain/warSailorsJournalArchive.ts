import { ArchiveType, IArchive, IFacet, mapToIFacet } from "./archive";
import { IApiWarSailorsJournalArchive } from "./krigsseilerregisteret-api/warSailorsJournalArchive";

export type IWarSailorsJournalArchive = IArchive<
  IWarSailorsJournalArchiveResult,
  IWarSailorsJournalFacets
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IWarSailorsJournalFacets {
  type: IFacet;
  byFirstLetter: IFacet;
}

export interface IWarSailorsJournalArchiveResult {
  id: number;
  type: ArchiveType;
  title: string;
  issue?: string;
  state?: string;
  name?: string;
  year?: string;
}

export const mapToSWarSailorsJournalArchive = (
  data: IApiWarSailorsJournalArchive
): IWarSailorsJournalArchive => {
  return {
    ...data,
    aggregations: {
      byFirstLetter: mapToIFacet(data.aggregations.grouped_by_first_letter),
      type: mapToIFacet(data.aggregations.types),
    },
    results: data._embedded.results.map((r) => {
      return {
        id: r.id,
        type: ArchiveType.WARSAILORSJOURNAL,
        title: r.summaryProperties.displayName ?? null,
        issue: r.summaryProperties.utgave ?? null,
        state: r.summaryProperties.state ?? null,
        year: r.summaryProperties.aar || "",
      };
    }),
  };
};
