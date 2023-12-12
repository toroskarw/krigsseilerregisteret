import { PageHead, PageHeadProps } from "components/PageHead";
import { getMainImageOrFirstAvailable } from "domain/image";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiShip } from "domain/krigsseilerregisteret-api/ship";
import { IShip, mapToIShip } from "domain/ship";
import { ShipProfile } from "features/ship/profile";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";
import { shipSubrouteToTabIndexMap } from "util/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );

  let tabIndex = 0;
  if (Array.isArray(context.query.slug)) {
    const tabName = context.query.slug[1];
    if (shipSubrouteToTabIndexMap.has(tabName)) {
      tabIndex = shipSubrouteToTabIndexMap.get(tabName);
    }
  }

  return await responseHandler<
    IApiShip,
    {
      data: IShip;
      tabIndex: number;
    }
  >(await fetchContent(ApiContentType.SKIP, context.query.slug[0]), (data) => {
    return {
      data: mapToIShip(data),
      tabIndex: tabIndex,
    };
  });
};

const ShipPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const ship = props.data as IShip;

  const pageTitle = useIntl().formatMessage(pageTitles.shipProfile, {
    shipName: ship.displayName,
  });
  const pageHeadProps: PageHeadProps = {
    title: pageTitle,
    openGraphTitle: ship.displayName,
    openGraphImage: getMainImageOrFirstAvailable(ship.images)?.versions
      .thumbnail,
    openGraphType: "krigsseilerregisteret.ship",
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <ShipProfile ship={ship} tabIndex={props.tabIndex} />
    </>
  );
};

export default ShipPage;
