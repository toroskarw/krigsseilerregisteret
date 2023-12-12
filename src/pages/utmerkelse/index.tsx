import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { mapToAwardArchive } from "domain/awardArchive";
import { IApiAwardArchive } from "domain/krigsseilerregisteret-api/awardArchive";
import { AwardArchive } from "features/award/archive/AwardArchive";
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
    types: [ArchiveType.AWARD],
    sortedBy: getFirstElement(context.query["sortedBy"]) ?? "",
    aggregations: {
      ...context.query,
    },
  };

  const [archive, statistics] = await Promise.all([
    fetchArchive<IApiAwardArchive>(searchParams), // TODO: Implement graceful handling of errors
    fetchStatistics(),
  ]);

  return {
    props: {
      archive: mapToAwardArchive(archive),
      totalAwardsCount: statistics.utmerkelse.toString(),
    },
  };
};

function AwardArchivePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { archive, totalAwardsCount } = props;
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.awardArchive),
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <AwardArchive archive={archive} totalAwardsCount={totalAwardsCount} />
    </>
  );
}

export default AwardArchivePage;
