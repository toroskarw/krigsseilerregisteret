import { ContentType } from "domain/content";

const paths = {
  homePage: "/",
  ship: (id: number) => `/skip/${id}`,
  shipArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return "/skip?" + new URLSearchParams(urlSearchParams).toString();
    else return "/skip";
  },
  seafarer: (id: number) => `/sjofolk/${id}`,
  seafarerArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return "/sjofolk?" + new URLSearchParams(urlSearchParams).toString();
    else return "/sjofolk";
  },
  effortArchive: "/innsats",
  topicsPage: "/tema",
  article: (idOrSlug: number | string) => `/artikkel/${idOrSlug}`,
  searchPage: "/sok",
  searchArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return "/sok?" + new URLSearchParams(urlSearchParams).toString();
    else return "/sok";
  },
  mapOfShipWrecks: "/kart-over-forlis?menuOption=static",
  position: (id: number) => `/stilling/${id}`,
  enlistmentDistrict: (id: number) => `/monstringsdistrikt/${id}`,
  shippingCompany: (id: number) => `/rederi/${id}`,
  harbour: (id: number) => `/havn/${id}`,
  education: (id: number) => `/utdannelse/${id}`,
  sailorsClub: (id: number) => `/sjomannsforening/${id}`,
  shipwreck: (id: number) => `/forlis/${id}`,
  fleet: (id: number) => `/flaate/${id}`,
  navigationPage: (id: number | string) => `/navigasjonsside/${id}`,
  award: (id: number) => `/utmerkelse/${id}`,
  relatedArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return `?` + new URLSearchParams(urlSearchParams).toString();
    else return ``;
  },
  warsailorsjournalArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return (
        "/tidsskriftet-krigsseileren?" +
        new URLSearchParams(urlSearchParams).toString()
      );
    else return "/tidsskriftet-krigsseileren";
  },
  warsailorsjournalPage: (id: number) => `/tidsskriftet-krigsseileren/${id}`,
  awardArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return "/utmerkelse?" + new URLSearchParams(urlSearchParams).toString();
    else return "/utmerkelse";
  },
  warSailorOfTheMonthArchive: (urlSearchParams?: Record<string, string>) => {
    if (urlSearchParams)
      return (
        "/maanedens-krigsseiler?" +
        new URLSearchParams(urlSearchParams).toString()
      );
    else return "/maanedens-krigsseiler";
  },
  warSailorOfTheMonthPage: (id: number) => `/maanedens-krigsseiler/${id}`,
};

export const resolveLinkByContentType = (
  id: string,
  contentType: ContentType
) => {
  switch (contentType) {
    case ContentType.ARTICLE:
      return paths.article(id);
    case ContentType.NAVIGATION:
      return paths.navigationPage(id);
    default:
      throw Error("Not implemented");
  }
};

export default paths;
