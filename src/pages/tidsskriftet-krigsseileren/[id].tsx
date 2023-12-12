import { PageHead, PageHeadProps } from "components/PageHead";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiWarSailorsJournal } from "domain/krigsseilerregisteret-api/warSailorsJournal";
import {
  IWarSailorsJournal,
  mapToWarSailorsJournal,
} from "domain/warSailorsJournal";
import { WarSailorsJournal } from "features/warsailorsjournal/profile/WarSailorsJournal";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=2592000, stale-while-revalidate=60"
  );
  return await responseHandler<
    IApiWarSailorsJournal,
    {
      data: IWarSailorsJournal;
    }
  >(
    await fetchContent(
      ApiContentType.TIDSSKRIFTET_KRIGSSEILEREN,
      context.query.id
    ),
    (data) => {
      return {
        data: mapToWarSailorsJournal(data),
      };
    }
  );
};

const WarSailorsJournalPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const warSailorsJournal = props.data as IWarSailorsJournal;

  const pageTitle = useIntl().formatMessage(pageTitles.warSailorsJournalPage, {
    warSailorsJournal: warSailorsJournal.displayName,
  });
  const pageHeadProps: PageHeadProps = { title: pageTitle };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <WarSailorsJournal warSailorsJournal={warSailorsJournal} />
    </>
  );
};

export default WarSailorsJournalPage;
