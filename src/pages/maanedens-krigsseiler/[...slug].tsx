import { PageHead, PageHeadProps } from "components/PageHead";
import { getMainImageOrFirstAvailable } from "domain/image";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiMaanedensKrigsseiler } from "domain/krigsseilerregisteret-api/maanedensKrigsseiler";
import {
  IWarSailorOfTheMonth,
  mapToIWarSailorOfTheMonth,
} from "domain/warSailorOfTheMonth";
import { WarSailorOfTheMonthDetailPage } from "features/warsailor-of-the-month/DetailPage";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );
  const response = await responseHandler<
    IApiMaanedensKrigsseiler,
    {
      data: IApiMaanedensKrigsseiler;
    }
  >(
    await fetchContent(
      ApiContentType.MAANEDENS_KRIGSSEILER,
      context.query.slug[0]
    ),
    (data) => {
      return {
        data: data,
      };
    }
  );

  if (!response.props) {
    return response;
  }

  return {
    props: {
      data: mapToIWarSailorOfTheMonth(response.props.data),
    },
  };
};

function WarSailorOfTheMonthPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const intl = useIntl();
  const warsailorOfTheMonth: IWarSailorOfTheMonth = props.data;

  const pageTitle = useIntl().formatMessage(
    pageTitles.warsailorOfTheMonthPage,
    {
      name: warsailorOfTheMonth.seafarer
        ? warsailorOfTheMonth.seafarer.displayName
        : "",
    }
  );
  const pageHeadProps: PageHeadProps = {
    title: pageTitle,
    openGraphTitle: `Månedens Krigsseiler - ${
      warsailorOfTheMonth.displayName || ""
    }`,
    openGraphImage: getMainImageOrFirstAvailable(warsailorOfTheMonth.images)
      ?.versions.thumbnail,
    openGraphType: "krigsseilerregisteret.article",
  };
  return (
    <>
      <PageHead {...pageHeadProps} />
      <WarSailorOfTheMonthDetailPage
        warsailorOfTheMonth={warsailorOfTheMonth}
      />
    </>
  );
}

export default WarSailorOfTheMonthPage;
