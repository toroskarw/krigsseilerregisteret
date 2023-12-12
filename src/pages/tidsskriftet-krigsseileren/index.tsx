import { PageHead, PageHeadProps } from "components/PageHead";
import { validatePageNumber, validatePageSize } from "components/Pagination";
import { ArchiveType } from "domain/archive";
import { IApiWarSailorsJournalArchive } from "domain/krigsseilerregisteret-api/warSailorsJournalArchive";
import { mapToSWarSailorsJournalArchive } from "domain/warSailorsJournalArchive";
import { WarSailorsJournalArchive } from "features/warsailorsjournal/archive/WarSailorsJournalArchive";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import { fetchArchive, IArchiveQueryParams } from "util/client";

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
    types: [ArchiveType.WARSAILORSJOURNAL],
    aggregations: context.query,
  };

  const [archive] = await Promise.all([
    fetchArchive<IApiWarSailorsJournalArchive>(searchParams),
  ]);

  return {
    props: {
      archive: mapToSWarSailorsJournalArchive(archive),
    },
  };
};

function WarSailorsJournalArchivePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { archive } = props;
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.warSailorsJournalArchivePage),
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <WarSailorsJournalArchive
        totalwarSailorsJournalArchiveCount={archive.total}
        archive={archive}
      />
    </>
  );
}

export default WarSailorsJournalArchivePage;
