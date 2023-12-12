import { convertToReverseProxyLink } from "util/constants";
import { ArchiveType, IArchive, IFacet } from "./archive";
import { IApiWarSailorOfTheMonthArchive } from "./krigsseilerregisteret-api/warSailorOfTheMonthArchive";

export type IWarSailorOfTheMonthArchive = IArchive<
  IWarSailorOfTheMonthArchiveResult,
  IWarSailorFacets
>;

export interface IWarSailorFacets {
  type: IFacet;
}

export interface IWarSailorOfTheMonthArchiveResult {
  id: number;
  type: ArchiveType;
  imageUrl: string;
  title: string;
  leadParagraph: string;
  teaserText: string;
}

export const mapToWarSailorOfTheMonthArchive = (
  data: IApiWarSailorOfTheMonthArchive
): IWarSailorOfTheMonthArchive => {
  return {
    ...data,
    aggregations: {
      type: [],
    },
    results: data._embedded.results.reverse().map((r) => {
      return {
        id: r.id,
        type: ArchiveType.WARSAILOR_OF_THE_MONTH,
        imageUrl: r.summaryProperties.bildeId
          ? convertToReverseProxyLink(
              `/api/image/${r.summaryProperties.bildeId}?version=medium`
            )
          : null,
        leadParagraph: r.summaryProperties.ingress,
        teaserText: r.summaryProperties.forsideTekst,
        title: r.summaryProperties.overskrift,
      };
    }),
  };
};
