import { PageHead, PageHeadProps } from "components/PageHead";
import { getMainImageOrFirstAvailable } from "domain/image";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiSeafarer } from "domain/krigsseilerregisteret-api/seafarer";
import { ISeafarer, mapToSeafarer } from "domain/seafarer";
import { SeafarerProfile } from "features/seafarer";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";
import { seafarerSubrouteToTabIndexMap } from "util/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );

  let tabIndex = 0;
  if (Array.isArray(context.query.slug)) {
    const tabName = context.query.slug[1];
    if (seafarerSubrouteToTabIndexMap.has(tabName)) {
      tabIndex = seafarerSubrouteToTabIndexMap.get(tabName);
    }
  }

  return await responseHandler<
    IApiSeafarer,
    {
      data: ISeafarer;
      tabIndex: number;
    }
  >(
    await fetchContent(ApiContentType.SJOMANN, context.query.slug[0]),
    (data) => {
      return {
        data: mapToSeafarer(data),
        tabIndex: tabIndex,
      };
    }
  );
};

function SeafarerPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const seafarer: ISeafarer = props.data;
  const pageTitle = useIntl().formatMessage(pageTitles.seafarerProfile, {
    seafarerName: seafarer.displayName,
  });
  const pageHeadProps: PageHeadProps = {
    title: pageTitle,
    openGraphTitle: seafarer.displayName,
    openGraphImage: getMainImageOrFirstAvailable(seafarer.images)?.versions
      .thumbnail,
    openGraphType: "krigsseilerregisteret.seafarer",
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <SeafarerProfile seafarer={seafarer} tabIndex={props.tabIndex} />
    </>
  );
}

export default SeafarerPage;
