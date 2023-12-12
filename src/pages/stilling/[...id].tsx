import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiPosition } from "domain/krigsseilerregisteret-api/position";
import { IApiRelatedArchive } from "domain/krigsseilerregisteret-api/related";
import { IPosition, mapToIPosition } from "domain/position";
import { IRelated, mapToIRelated } from "domain/related";
import { Position } from "features/position/Position";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import {
  fetchArchive,
  fetchContent,
  IArchiveQueryParams,
  responseHandler,
} from "util/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await responseHandler<
    IApiPosition,
    {
      data: IApiPosition;
    }
  >(
    await fetchContent(ApiContentType.STILLING, context.query.id[0]),
    (data) => {
      context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=60"
      );
      return {
        data: data,
      };
    }
  );

  if (!response.props) {
    return response;
  }

  let pagesize = 25;
  if (context.query.pagesize) {
    pagesize = validatePageSize(getFirstElement(context.query.pagesize));
  }
  let page = 0;
  if (context.query.page) {
    page = validatePageNumber(getFirstElement(context.query.page));
  }

  const searchParams: IArchiveQueryParams = {
    page: page,
    pagesize: pagesize,
    query: getFirstElement(context.query.q) ?? "",
    types: [ArchiveType.SEAFARER, ArchiveType.SHIP],
    sortedBy: getFirstElement(context.query["sortedBy"]) ?? "",
    aggregations: {
      ...context.query,
    },
  };

  const relatedSearchResults = await fetchArchive<IApiRelatedArchive>(
    searchParams,
    false,
    response.props.data.id
  );

  // Get all results as well as the search subset,
  // so that the total count of related content can be
  // displayed on accordian header
  const allResultsParams: IArchiveQueryParams = {
    query: "",
    types: [ArchiveType.SEAFARER, ArchiveType.SHIP],
    aggregations: {},
  };

  const relatedAllResults = await fetchArchive<IApiRelatedArchive>(
    allResultsParams,
    false,
    response.props.data.id
  );

  return {
    props: {
      data: mapToIPosition(response.props.data),
      relatedSearchResults: mapToIRelated(relatedSearchResults),
      relatedAllResults: mapToIRelated(relatedAllResults),
    },
  };
};

function PositionPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const position: IPosition = props.data;
  const relatedSearchResults: IRelated = props.relatedSearchResults;
  const relatedAllResults: IRelated = props.relatedAllResults;

  const pageTitle = useIntl().formatMessage(pageTitles.positionProfile, {
    positionName: position.displayName ?? "",
  });
  const pageHeadProps: PageHeadProps = { title: pageTitle };
  return (
    <>
      <PageHead {...pageHeadProps} />
      <Position
        position={position}
        relatedSearchResults={relatedSearchResults}
        relatedAllResults={relatedAllResults}
      />
    </>
  );
}

export default PositionPage;
