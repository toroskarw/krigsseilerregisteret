import { Layout } from "components/Layout";
import English from "lang/compiled-locales/en.json";
import Norwegian from "lang/compiled-locales/no.json";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import Script from "next/script";
import { useEffect, useMemo } from "react";
import { IntlProvider } from "react-intl";
import "styles/globals.css";
import * as gtag from "../util/gtag";

const Krigsseilerregisteret = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const messages = useMemo(() => {
    switch (locale) {
      case "en":
        return English;
      case "no":
        return Norwegian;
      default:
        return Norwegian;
    }
  }, [locale]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale="no"
        onError={() => null}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </>
  );
};

export default Krigsseilerregisteret;
