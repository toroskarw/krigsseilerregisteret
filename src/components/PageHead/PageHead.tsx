import Head from "next/head";
import { useRouter } from "next/router";

export interface PageHeadProps {
  title: string;
  description?: string;
  author?: string;
  openGraphTitle?: string;
  openGraphType?: string;
  openGraphImage?: string;
}

export const PageHead = (props: PageHeadProps) => {
  const {
    title,
    description,
    author,
    openGraphTitle,
    openGraphType,
    openGraphImage,
  } = props;

  const { locale, locales, asPath } = useRouter();

  const titleLong = `${title} - Krigsseilerregisteret`;

  const hostname = "https://krigsseilerregisteret.no";

  return (
    <>
      <Head>
        <title>{titleLong}</title>
        {description ? (
          <meta name="description" content={description} key="description" />
        ) : null}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <meta name="author" content={author || "Krigsseilerregisteret.no"} />
        <meta property="og:title" content={openGraphTitle ?? titleLong} />

        <meta property="og:type" content={openGraphType ?? "website"} />
        {openGraphImage ? (
          <meta property="og:image" content={`${hostname}${openGraphImage}`} />
        ) : null}

        <meta property="og:url" content={`${hostname}/${locale}${asPath}`} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`${hostname}/${locale}${asPath}`}
        ></link>

        {locales
          ? locales.map((otherLocale) => {
              if (locale === otherLocale) {
                return null;
              }
              return (
                <link
                  key={locale}
                  rel="alternate"
                  href={`${hostname}/${otherLocale}${asPath}`}
                  hrefLang={otherLocale}
                />
              );
            })
          : null}
      </Head>
    </>
  );
};
