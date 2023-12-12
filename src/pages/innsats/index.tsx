import { PageHead, PageHeadProps } from "components/PageHead";
import { INavigation, mapToINavigation } from "domain/navigation";
import { IApiNavigation } from "domain/krigsseilerregisteret-api/navigation";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";
import { Effort } from "features/effort";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const effortNavigationPage = "822091";
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );
  return await responseHandler<
    IApiNavigation,
    {
      data: INavigation;
    }
  >(
    await fetchContent(ApiContentType.NAVIGASJONSSIDE, effortNavigationPage),
    (data) => {
      return {
        data: mapToINavigation(data),
      };
    }
  );
};

function EffortPage(
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
      <Effort navigation={navigation} />
    </>
  );
}

export default EffortPage;
