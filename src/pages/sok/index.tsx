import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { IApiSearchArchive } from "domain/krigsseilerregisteret-api/searchArchive";
import { mapToSearchArchive } from "domain/searchArchive";
import { SearchArchive } from "features/search";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import {
  IArchiveQueryParams,
  fetchArchive,
  fetchStatistics,
} from "util/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=60"
  );

  let pagesize = 25;
  if (context.query.pagesize) {
    pagesize = validatePageSize(getFirstElement(context.query.pagesize));
  }
  let page = 0;
  if (context.query.page) {
    page = validatePageNumber(getFirstElement(context.query.page));
  }

  const types = [
    ArchiveType.SEAFARER,
    ArchiveType.SHIP,
    ArchiveType.SHIPWRECK,
    ArchiveType.ARTICLE,
    ArchiveType.AWARD,
    ArchiveType.WARSAILORSJOURNAL,
    ArchiveType.NAVIGATIONPAGE,
  ];

  // const selectedTypes =
  //   context.query["types"] != null
  //     ? types[getFirstElement(context.query["types"])]
  //     : types;
  const selectedTypes =
    getFirstElement(context.query["types"]) !== null
      ? [getFirstElement(context.query["types"])]
      : null;

  const searchParams: IArchiveQueryParams = {
    page: page,
    pagesize: pagesize,
    query: getFirstElement(context.query.q) ?? "",
    types: selectedTypes ?? types,
    sortedBy: getFirstElement(context.query["sortedBy"]) ?? "relevance",
    aggregations: {
      ...context.query,
      // types: selectedTypes,
    },
  };
  //,

  const [archive, statistics] = await Promise.all([
    fetchArchive<IApiSearchArchive>(searchParams), // TODO: Implement graceful handling of errors
    fetchStatistics(),
  ]);

  return {
    props: {
      archive: mapToSearchArchive(archive),
      statistics: statistics,
    },
  };
};

function SearchPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { archive, totalCount } = props;
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.searchPage),
  };

  return (
    <>
      <PageHead {...pageHeadProps} />

      <SearchArchive archive={archive} totalCount={totalCount} />
    </>
  );
}

export default SearchPage;
