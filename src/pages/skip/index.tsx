import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { IApiShipArchive } from "domain/krigsseilerregisteret-api/shipArchive";
import { mapToShipArchive } from "domain/shipArchive";
import { ShipArchive } from "features/ship";
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
    types: [ArchiveType.SHIP],
    aggregations: {
      ...context.query,
    },
  };

  const [archive, statistics] = await Promise.all([
    fetchArchive<IApiShipArchive>(searchParams),
    fetchStatistics(),
  ]);

  return {
    props: {
      archive: mapToShipArchive(archive),
      totalShipCount: statistics.skip,
    },
  };
};

function ShipArchivePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { archive, totalShipCount } = props;
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.shipArchive),
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <ShipArchive totalShipCount={totalShipCount} archive={archive} />
    </>
  );
}

export default ShipArchivePage;
