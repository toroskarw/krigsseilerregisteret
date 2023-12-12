import { IApiStatistics } from "./krigsseilerregisteret-api/statistics";

export interface IStatistics {
  seafarer: number;
  ship: number;
  shippingCompany: number;
  shipyard: number;
  harbour: number;
  position: number;
  shipwreck: number;
  article: number;
  award: number;
  tidsskriftet_krigsseileren: number;
  sailorSchool: number;
  enlistmentDistrict: number;
  sailorsClub: number;
  county: number;
  navigationPage: number;
  nation: number;
  fleet: number;
}

export const mapToIStatistics = (data: IApiStatistics): IStatistics => {
  return {
    seafarer: data.sjomann,
    ship: data.skip,
    shippingCompany: data.rederi,
    shipyard: data.verft,
    harbour: data.havn,
    position: data.stilling,
    shipwreck: data.forlis,
    article: data.artikkel,
    award: data.utmerkelse,
    tidsskriftet_krigsseileren: data.tidsskriftet_krigsseileren,
    sailorSchool: data.sjomannsskole,
    enlistmentDistrict: data.monstringsdistrikt,
    sailorsClub: data.sjomannsforening,
    county: data.fylke,
    navigationPage: data.navigasjonsside,
    nation: data.nasjon,
    fleet: data.flaate,
  };
};
