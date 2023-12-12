import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { IApiSeafarerArchive } from "domain/krigsseilerregisteret-api/seafarerArchive";
import { mapToSeafarerArchive } from "domain/seafarerArchive";
import { SeafarerArchive } from "features/seafarer";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import {
  fetchArchive,
  fetchStatistics,
  IArchiveQueryParams,
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

  const searchParams: IArchiveQueryParams = {
    page: page,
    pagesize: pagesize,
    query: getFirstElement(context.query.q) ?? "",
    types: [ArchiveType.SEAFARER],
    sortedBy: getFirstElement(context.query["sortedBy"]) ?? "",
    aggregations: {
      ...context.query,
    },
  };

  const [archive, statistics] = await Promise.all([
    fetchArchive<IApiSeafarerArchive>(searchParams), // TODO: Implement graceful handling of errors
    fetchStatistics(),
  ]);

  return {
    props: {
      archive: mapToSeafarerArchive(archive),
      totalSeafarerCount: statistics.sjomann,
    },
  };
};

function SeafarerArchivePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { archive, totalSeafarerCount } = props;
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.seafarerArchive),
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <SeafarerArchive
        archive={archive}
        totalSeafarerCount={totalSeafarerCount}
      />
    </>
  );
}

export default SeafarerArchivePage;
