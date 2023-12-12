import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { IApiWarSailorOfTheMonthArchive } from "domain/krigsseilerregisteret-api/warSailorOfTheMonthArchive";
import { mapToWarSailorOfTheMonthArchive } from "domain/warSailorOfTheMonthArchive";
import { WarSailorOfTheMonthArchive } from "features/warsailor-of-the-month/WarSailorOfTheMonthArchive";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import { IArchiveQueryParams, fetchArchive } from "util/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=60"
  );
  let pagesize = 500;
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
    types: [ArchiveType.WARSAILOR_OF_THE_MONTH],
    sortedBy: "",
    aggregations: {
      ...context.query,
    },
  };

  const [archive] = await Promise.all([
    fetchArchive<IApiWarSailorOfTheMonthArchive>(searchParams),
  ]);

  return {
    props: {
      archive: mapToWarSailorOfTheMonthArchive(archive),
    },
  };
};

function WarSailorOfTheMonthArchivePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.shipArchive),
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <WarSailorOfTheMonthArchive archive={props.archive} />
    </>
  );
}

export default WarSailorOfTheMonthArchivePage;
