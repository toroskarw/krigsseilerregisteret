import { PageHead, PageHeadProps } from "components/PageHead";
import { INavigation, mapToINavigation } from "domain/navigation";
import { IApiNavigation } from "domain/krigsseilerregisteret-api/navigation";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { Navigation } from "features/navigation";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";
import { navigationValidYears } from "util/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );

  let selectedYearFilter = "all";
  if (Array.isArray(context.query.slug)) {
    const year = context.query.slug[1];
    if (navigationValidYears.includes(year)) {
      selectedYearFilter = year;
    }
  }

  return await responseHandler<
    IApiNavigation,
    {
      data: INavigation;
      selectedYear: string;
    }
  >(
    await fetchContent(ApiContentType.NAVIGASJONSSIDE, context.query.slug[0]),
    (data) => {
      return {
        data: mapToINavigation(data),
        selectedYear: selectedYearFilter,
      };
    }
  );
};

function NaivagationPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const navigation: INavigation = props.data;

  const pageTitle = useIntl().formatMessage(pageTitles.navigationPage, {
    navigationName: navigation.title ?? "",
  });

  const pageHeadProps: PageHeadProps = { title: pageTitle };
  return (
    <>
      <PageHead {...pageHeadProps} />
      <Navigation navigation={navigation} selectedYear={props.selectedYear} />
    </>
  );
}

export default NaivagationPage;
