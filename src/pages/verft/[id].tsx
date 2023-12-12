import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { ApiArchiveType } from "domain/krigsseilerregisteret-api/archive";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiRelatedArchive } from "domain/krigsseilerregisteret-api/related";
import { IApiShipyard } from "domain/krigsseilerregisteret-api/shipyard";
import { IRelated, mapToIRelated } from "domain/related";
import { IShipyard, mapToIShipyard } from "domain/shipyard";
import { Shipyard } from "features/shipyard/Shipyard";
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
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );
  const response = await responseHandler<
    IApiShipyard,
    {
      data: IApiShipyard;
    }
  >(await fetchContent(ApiContentType.VERFT, context.query.id), (data) => {
    return {
      data: data,
    };
  });

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
  const selectedTypes = getFirstElement(context.query["types"]);
  const searchParams: IArchiveQueryParams = {
    page: page,
    pagesize: pagesize,
    query: getFirstElement(context.query.q) ?? "",
    types:
      selectedTypes !== null
        ? selectedTypes === ApiArchiveType.SKIP
          ? [ArchiveType.SHIP]
          : [ArchiveType.SEAFARER]
        : [ArchiveType.SEAFARER, ArchiveType.SHIP],
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
      data: mapToIShipyard(response.props.data),
      relatedSearchResults: mapToIRelated(relatedSearchResults),
      relatedAllResults: mapToIRelated(relatedAllResults),
    },
  };
};

function ShipyardPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const shipyard: IShipyard = props.data;
  const relatedSearchResults: IRelated = props.relatedSearchResults;
  const relatedAllResults: IRelated = props.relatedAllResults;

  const pageTitle = useIntl().formatMessage(pageTitles.shipyardProfile, {
    shipyardName: shipyard.displayName ?? "",
  });
  const pageHeadProps: PageHeadProps = { title: pageTitle };
  return (
    <>
      <PageHead {...pageHeadProps} />
      <Shipyard
        shipyard={shipyard}
        relatedSearchResults={relatedSearchResults}
        relatedAllResults={relatedAllResults}
      />
    </>
  );
}

export default ShipyardPage;
