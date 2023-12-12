import { PageHead, PageHeadProps } from "components/PageHead";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IApiShipwreck } from "domain/krigsseilerregisteret-api/shipwreck";
import { IShipwreck, mapToIShipwreck } from "domain/shipwreck";
import { ShipwreckProfile } from "features/shipwreck";
import { pageTitles } from "lang/pageTitles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useIntl } from "react-intl";
import { fetchContent, responseHandler } from "util/client";
import { shipwreckSubrouteToTabIndexMap } from "util/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=60"
  );

  let tabIndex = 0;
  if (Array.isArray(context.query.slug)) {
    const tabName = context.query.slug[1];
    if (shipwreckSubrouteToTabIndexMap.has(tabName)) {
      tabIndex = shipwreckSubrouteToTabIndexMap.get(tabName);
    }
  }

  return await responseHandler<
    IApiShipwreck,
    {
      data: IShipwreck;
      tabIndex: number;
    }
  >(
    await fetchContent(ApiContentType.FORLIS, context.query.slug[0]),
    (data) => {
      return {
        data: mapToIShipwreck(data),
        tabIndex: tabIndex,
      };
    }
  );
};

const ShipwreckPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const shipwreck = props.data as IShipwreck;

  const pageTitle = useIntl().formatMessage(pageTitles.shipwreckProfile, {
    shipwreckName: shipwreck.shipName,
  });
  const pageHeadProps: PageHeadProps = {
    title: pageTitle,
    openGraphTitle: shipwreck.displayName,
    openGraphType: "krigsseilerregisteret.shipwreck",
  };

  return (
    <>
      <PageHead {...pageHeadProps} />
      <ShipwreckProfile shipwreck={shipwreck} tabIndex={props.tabIndex} />
    </>
  );
};

export default ShipwreckPage;
