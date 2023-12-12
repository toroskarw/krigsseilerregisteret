import { causedByNationQueryParamName } from "components/Facets/CausedByNation";
import { countyQueryParamName } from "components/Facets/County";
import { diedDuringWW2QueryParamName } from "components/Facets/DiedDuringWW2";
import { performedByQueryParamName } from "components/Facets/PerformedBy";
import { reasonForLossQueryParamName } from "components/Facets/ReasonForLoss";
import { serviceQueryParam } from "components/Facets/Service";
import { typesQueryParamName } from "components/Facets/Types";
import { whalingExpeditionQueryParamName } from "components/Facets/WhalingExpedition";
import { ArchiveType } from "domain/archive";
//import { IApiAwardStatistics } from "domain/krigsseilerregisteret-api/awardStatistics";
import { IApiAwardStatistics } from "domain/krigsseilerregisteret-api/awardStatistics";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiStatistics } from "domain/krigsseilerregisteret-api/statistics";
import { nationalityQueryParamName } from "../components/Facets";
import { alphabetQueryParamName } from "../components/Facets/Alphabet";
import { genderQueryParamName } from "../components/Facets/Gender";
import { lostDuringWarQueryParamName } from "../components/Facets/LostDuringWar";
import { participatedInWarQueryParamName } from "../components/Facets/ParticipatedInWar";
import { specialServiceSailingAndOrIncidentsQueryParamName } from "../components/Facets/SpecialServiceSailingAndOrIncidents";
import { typeOfShipQueryParamName } from "../components/Facets/TypeOfShip";
import { concatUrls } from "./concatUrls";

export const BASE_URL = "https://www.sjohistorie.no/api";
export const REWRITE_BASE_URL = "/krigsseilerregisteret/api";

export interface IArchiveQueryParams {
  page?: number;
  pagesize?: number;
  query?: string;
  types: ArchiveType[] | string[];
  sortedBy?: string;
  aggregations: {
    [nationalityQueryParamName]?: string;
    [alphabetQueryParamName]?: string;
    [lostDuringWarQueryParamName]?: string;
    [participatedInWarQueryParamName]?: string;
    [specialServiceSailingAndOrIncidentsQueryParamName]?: string;
    [typeOfShipQueryParamName]?: string;
    [genderQueryParamName]?: string;
    [serviceQueryParam]?: string;
    [countyQueryParamName]?: string;
    [diedDuringWW2QueryParamName]?: string;
    [causedByNationQueryParamName]?: string;
    [reasonForLossQueryParamName]?: string;
    [performedByQueryParamName]?: string;
    [typesQueryParamName]?: string;
    bornYear?: string; //TODO: put into constants
    bornMonth?: string;
    bornDay?: string;
    lossYearWW2?: string;
    lossMonthWW2?: string;
  };
}

const mapToKrigsseileregisteretApiAggregationName = {
  [nationalityQueryParamName]: "nasjonalitet",
  [alphabetQueryParamName]: "letter",
  [lostDuringWarQueryParamName]: "senket_i_krig",
  [participatedInWarQueryParamName]: "tjenestegjorde_i_krig",
  [specialServiceSailingAndOrIncidentsQueryParamName]: "spesiellOmtale",
  [typeOfShipQueryParamName]: "skipstype",
  [genderQueryParamName]: "kjonn",
  [serviceQueryParam]: "flaatetilhorighet",
  [countyQueryParamName]: "geografisk_tilknytning",
  [diedDuringWW2QueryParamName]: "omkommetWW2",
  [whalingExpeditionQueryParamName]: "hvalfangstekspedisjon",
  [causedByNationQueryParamName]: "senket_utfort_av_nasjonalitet",
  [reasonForLossQueryParamName]: "senket_aarsak_ww2",
  [performedByQueryParamName]: "senket_utfort_av_type_ww2",
  bornYear: "fodtAar",
  bornMonth: "fodtMaaned",
  bornDay: "fodtDag",
  lossYearWW2: "tapsAarsakAarWW2",
  lossMonthWW2: "tapsAarsakMaanedWW2",
};

/**
 * Retrieve results via Krigsseilerregisteret API search.
 *
 * Set parameter `useRewrite` to true when using outside of e.g.
 * `getServerSideProps` function on Next.js pages, in order to enable CORS.
 */
export async function fetchArchive<TArchive>(
  {
    page = 0,
    pagesize = 25,
    query = "",
    types,
    sortedBy,
    aggregations,
  }: IArchiveQueryParams,
  useRewrite = false,
  id?: number
): Promise<TArchive> {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("websiteId", "krigsseilerregisteret");
  urlSearchParams.append("page", page.toString());
  urlSearchParams.append("pagesize", pagesize.toString());
  urlSearchParams.append("query", query.toString());
  urlSearchParams.append("sort", sortedBy || "");
  urlSearchParams.append("type", types.join(","));

  Object.entries(aggregations).forEach(([aggregationId, aggregationValue]) => {
    if (
      aggregationValue &&
      mapToKrigsseileregisteretApiAggregationName[aggregationId]
    ) {
      urlSearchParams.append(
        mapToKrigsseileregisteretApiAggregationName[aggregationId],
        aggregationValue
      );
    }
  });

  let searchQuery;

  if (id) {
    urlSearchParams.append("playerId", id.toString());
    searchQuery = `/search/related?${urlSearchParams.toString()}`;
  } else {
    searchQuery = `/search/archive?${urlSearchParams.toString()}`;
  }

  const rewriteUrl = concatUrls([REWRITE_BASE_URL, searchQuery]);
  const absoluteUrl = concatUrls([BASE_URL, searchQuery]);
  const url = useRewrite ? rewriteUrl : absoluteUrl;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Could not fetch resource ${response.url}. Server returned "${response.status} ${response.statusText}"`
    );
  }

  const data = await response.json();
  return data;
}

export interface ErrorResponse {
  status: number;
  statusText: string;
}

const isErrorResponse = (
  response: ErrorResponse | unknown
): response is ErrorResponse => {
  return (response as ErrorResponse).statusText !== undefined;
};

export async function responseHandler<TDataFrom, TDataTo>(
  data: TDataFrom | ErrorResponse,
  datamapper: (data: TDataFrom) => TDataTo
) {
  if (isErrorResponse(data)) {
    //Vi eksponerer kun feil som 404 ut mot klient
    return Promise.resolve({
      notFound: true,
      props: undefined,
    });
  }
  return {
    props: datamapper(data),
  };
}

/**
 * Retrieve content from Krigsseilerregisteret API,
 * by providing content type and id.
 */
export async function fetchContent<TReturnType = any>(
  type: ApiContentType,
  id: string | string[]
): Promise<TReturnType | ErrorResponse> {
  const response = await fetch(
    `${BASE_URL}/${type
      .toLowerCase()
      .replace("_", "-")}/${id}?websiteId=krigsseilerregisteret`
  );

  if (!response.ok) {
    return Promise.resolve({
      status: response.status,
      statusText: response.statusText,
    });
  }
  const data = await response.json();
  return data as TReturnType;
}

export const fetchStatistics = async (): Promise<IApiStatistics> => {
  try {
    const response = await fetch(
      `${BASE_URL}/statistics/krigsseilerregisteret`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    return {
      sjomann: 68444,
      skip: 5061,
      stilling: 813,
      forlis: 731,
      havn: 713,
      rederi: 653,
      verft: 187,
      artikkel: 144,
      tidsskriftet_krigsseileren: 122,
      utmerkelse: 101,
      utdannelse: 70,
      motor: 32,
      monstringsdistrikt: 29,
      fylke: 20,
      navigasjonsside: 19,
      sjomannsforening: 15,
      nasjon: 13,
      flaate: 6,
      sjomannsskole: 3,
    };
  }
};

export const fetchAwardStatistics = async (
  id: number
): Promise<IApiAwardStatistics> => {
  const response = await fetch(
    `${REWRITE_BASE_URL}/statistics/utmerkelse/${id}`
  );
  const data = await response.json();
  return data;
};
