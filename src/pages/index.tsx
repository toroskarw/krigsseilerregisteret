import { PageHead, PageHeadProps } from "components/PageHead";
import { ContentType } from "domain/content";
import { getMainImageOrFirstAvailable } from "domain/image";
import { IApiArticle } from "domain/krigsseilerregisteret-api/article";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiNavigation } from "domain/krigsseilerregisteret-api/navigation";
import { INavigationSubPage, mapToINavigation } from "domain/navigation";
import { IStatistics, mapToIStatistics } from "domain/statistics";
import { IWarSailorOfTheMonthBase } from "domain/warSailorOfTheMonth";
import { FrontPage } from "features/home";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, fetchStatistics } from "util/client";
import { resolveLinkByContentType } from "util/paths";

const mapToWarSailorOfTheMonthFrontpage = (
  page: INavigationSubPage,
  warsailorOfTheMonth: IWarSailorOfTheMonthBase
) => {
  const image = getMainImageOrFirstAvailable(page.images);
  return {
    id: warsailorOfTheMonth.id,
    image: image ? image : null,
    seafarerName: warsailorOfTheMonth.displayName || "",
    teaserText: warsailorOfTheMonth.teaserText,
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );

  const [statistics, navigationPage] = await Promise.all([
    fetchStatistics(),
    fetchContent(
      ApiContentType.NAVIGASJONSSIDE,
      "forsidenkrigsseilerregisteret"
    ),
  ]);

  const features = mapToINavigation(navigationPage);

  const warsailorOfTheMonthFeature = features.subPages.find((sp) => {
    return sp.type === ContentType.WARSAILOR_OF_THE_MONTH;
  });

  const featuredContent = features.subPages.filter((sp) => {
    return sp.type !== ContentType.WARSAILOR_OF_THE_MONTH;
  });

  return {
    props: {
      featuredContent: featuredContent,
      statistics: mapToIStatistics(statistics),
      warsailorOfTheMonth: warsailorOfTheMonthFeature
        ? warsailorOfTheMonthFeature
        : null,
    },
  };
};

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const pageHeadProps: PageHeadProps = {
    title: useIntl().formatMessage(pageTitles.frontPage),
  };

  const statistics: IStatistics = props.statistics;
  const warsailorOfTheMonthPage = props.warsailorOfTheMonth;
  const featuredContent: Array<INavigationSubPage> = props.featuredContent;
  return (
    <>
      <PageHead {...pageHeadProps} />
      <FrontPage
        featuredContent={featuredContent.map((featuredContent) => {
          return {
            id: featuredContent.id,
            image: getMainImageOrFirstAvailable(featuredContent.images),
            link: resolveLinkByContentType(
              "" + featuredContent.id,
              featuredContent.type
            ),
            title: featuredContent.displayName || "",
          };
        })}
        statistics={statistics}
        warsailorOfTheMonth={
          warsailorOfTheMonthPage
            ? mapToWarSailorOfTheMonthFrontpage(
                warsailorOfTheMonthPage,
                warsailorOfTheMonthPage.content
              )
            : null
        }
      />
    </>
  );
};

export default Index;
