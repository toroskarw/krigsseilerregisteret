import { IArticle, mapToIArticle } from "./article";
import { IGranularDate, mapToGranularDate } from "./common";
import { IHarbour, IHarbourBase, mapToIHarbour } from "./harbour";
import { IApiArticle } from "./krigsseilerregisteret-api/article";
import { ApiRelationshipType } from "./krigsseilerregisteret-api/common";
import {
  IApiSeafarerEnlistment,
  IApiShipEnlistment,
} from "./krigsseilerregisteret-api/enlistment";
import { IApiHarbour } from "./krigsseilerregisteret-api/harbour";
import { IApiPosition } from "./krigsseilerregisteret-api/position";
import { IApiSeafarer } from "./krigsseilerregisteret-api/seafarer";
import { IApiShip } from "./krigsseilerregisteret-api/ship";
import { getOtherplayersByRelationshipType } from "./krigsseilerregisteret-api/utils/relationship";
import { IPosition, mapToIPosition } from "./position";
import { ISeafarerBase, mapToISeafarerBase } from "./seafarer";
import { IShipBase, mapToIShipBase } from "./ship";

export interface ISeafarerEnlistment {
  id: number;
  signedOn?: IGranularDate;
  signedOff?: IGranularDate;
  ship?: IShipBase;
  harbourOn?: IHarbourBase;
  harbourOff?: IHarbourBase;
  articles: Array<IArticle>;
  position?: IPosition;
  isRegularEnlistment: boolean;
}

export const mapToISeafarerEnlistment = (
  data: IApiSeafarerEnlistment
): ISeafarerEnlistment => {
  const ship = getShip(data);
  const isRegularEnlistment = !ship.showAsBase;
  return {
    id: data.id,
    signedOff: mapToGranularDate(
      data.avmonstringAar,
      data.avmonstringMaaned,
      data.avmonstringDag
    ),
    signedOn: mapToGranularDate(
      data.paamonstringAar,
      data.paamonstringMaaned,
      data.paamonstringDag
    ),
    ship: ship,
    articles: getArticles(data) ?? null,
    position: getPosition(data) ?? null,
    harbourOn: getHarbour(data, "on") ?? null,
    harbourOff: getHarbour(data, "off") ?? null,
    isRegularEnlistment: isRegularEnlistment,
  };
};

export interface IShipEnlistment {
  id: number;
  seafarer: ISeafarerBase;
  signedOn?: IGranularDate;
  signedOff?: IGranularDate;
  harbourOn?: IHarbourBase;
  harbourOff?: IHarbourBase;
  articles: Array<IArticle>;
  position?: IPosition;
}

export const mapToIShipEnlistment = (data): IShipEnlistment => {
  const enlistment: IApiShipEnlistment = data._embedded.otherplayer[0];
  return {
    id: enlistment.id,
    seafarer: getSeafarer(enlistment),
    signedOff: mapToGranularDate(
      enlistment.avmonstringAar,
      enlistment.avmonstringMaaned,
      enlistment.avmonstringDag
    ),
    signedOn: mapToGranularDate(
      enlistment.paamonstringAar,
      enlistment.paamonstringMaaned,
      enlistment.paamonstringDag
    ),
    articles: getArticles(enlistment) ?? null,
    position: getPosition(enlistment) ?? null,
    harbourOn: getHarbour(enlistment, "on") ?? null,
    harbourOff: getHarbour(enlistment, "off") ?? null,
  };
};

const getSeafarer = (enlistment: IApiShipEnlistment) => {
  const seafarer = getOtherplayersByRelationshipType<
    ApiRelationshipType.GJENNOMFORTE_MONSTRING,
    IApiSeafarer
  >(enlistment, ApiRelationshipType.GJENNOMFORTE_MONSTRING)[0];
  return mapToISeafarerBase(seafarer);
};

const getShip = (data: IApiSeafarerEnlistment) => {
  const ships = getOtherplayersByRelationshipType<
    ApiRelationshipType.HAR_MONSTRINGER,
    IApiShip
  >(data, ApiRelationshipType.HAR_MONSTRINGER);

  return mapToIShipBase(ships[0]);
};

const getArticles = (
  data: IApiShipEnlistment | IApiSeafarerEnlistment
): Array<IArticle> => {
  const articles = getOtherplayersByRelationshipType<
    ApiRelationshipType.OMHANDLET_I,
    IApiArticle
  >(data, ApiRelationshipType.OMHANDLET_I);

  return articles.length > 0 ? articles.map(mapToIArticle) : null;
};

const getPosition = (
  data: IApiShipEnlistment | IApiSeafarerEnlistment
): IPosition => {
  const position = getOtherplayersByRelationshipType<
    ApiRelationshipType.I_STILLING_SOM,
    IApiPosition
  >(data, ApiRelationshipType.I_STILLING_SOM)[0];
  if (position) return mapToIPosition(position);
  else return null;
};

const getHarbour = (
  data: IApiShipEnlistment | IApiSeafarerEnlistment,
  direction: "on" | "off"
): IHarbour => {
  let harbour: IApiHarbour;
  if (direction == "on") {
    harbour = getOtherplayersByRelationshipType<
      ApiRelationshipType.MONSTRET_PAA_I,
      IApiHarbour
    >(data, ApiRelationshipType.MONSTRET_PAA_I)[0];
  } else if (direction == "off") {
    harbour = getOtherplayersByRelationshipType<
      ApiRelationshipType.MONSTRET_AV_I,
      IApiHarbour
    >(data, ApiRelationshipType.MONSTRET_AV_I)[0];
  }
  if (harbour) return mapToIHarbour(harbour);
  else return null;
};
