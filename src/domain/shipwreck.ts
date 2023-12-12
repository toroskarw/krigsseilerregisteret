import { IGranularDate, mapToGranularDate, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { getFiles, IFile } from "./file";
import {
  ApiContentType,
  ApiRelationshipType,
} from "./krigsseilerregisteret-api/common";
import { IApiContent } from "./krigsseilerregisteret-api/content";
import { IApiShip } from "./krigsseilerregisteret-api/ship";
import {
  IApiShipwreck,
  IApiShipwreckCrew,
  IApiShipwreckSeafarerRelationship,
} from "./krigsseilerregisteret-api/shipwreck";
import {
  getOtherplayersByRelationshipType,
  getRelationshipsOfType,
} from "./krigsseilerregisteret-api/utils/relationship";
import { IShipBase, mapToIShipBase } from "./ship";

export interface IShipwreckBase extends IContent {
  shipName: string;
  date: IGranularDate;
  position: string;
  causeSummary: string;
  cause: string;
  cargo: string;
  route: string;
  crewListStatus: string;
  missingCount: string;
  capturedCount: string;
  survivedCount: string;
  deceasedCount: string;
  inquiryPlace: string;
  inquiryAdministrator: string;
  abstract: string;
  inquiryDate: IGranularDate;
  inquiryNote: string;
  diary: string;
  shipwreckDateEpoch: number;
}

export interface IShipwreck extends IShipwreckBase {
  crew: IShipwreckCrew[];
  ship: IShipBase;
  documents: IFile[];
}

export const mapToIShipwreckBase = (data: IApiShipwreck): IShipwreckBase => {
  const title = data.displayName ? data.displayName : data.navn ?? "Forlis";
  const displayName = title + `${data.aarsak ? ", " + data.aarsak : ""}`;

  return {
    id: data.id,
    shipName: title,
    displayName: displayName,
    type: ContentType.SHIPWRECK,
    date: mapToGranularDate(data.datoAar, data.datoMaaned, data.datoDag),
    position: data.posisjonBeskrivelse ?? null,
    causeSummary: data.aarsak_stikkord ?? null,
    cause: data.aarsak ?? null,
    cargo: data.last ?? null,
    route: data.reiserute ?? null,
    crewListStatus: data.mannskapsliste ?? null,
    missingCount: data.antallSavnet ?? null,
    capturedCount: data.antallFanget ?? null,
    survivedCount: data.antallReddet ?? null,
    deceasedCount: data.antallOmkommet ?? null,
    inquiryPlace: data.sjoforklaringssted ?? null,
    inquiryAdministrator: data.administrator ?? null,
    abstract: data.referat ?? null,
    inquiryNote: data.merknadSjoforklaring ?? null,
    inquiryDate: mapToGranularDate(
      data.sjoforklaringAar,
      data.sjoforklaringMaaned,
      data.sjoforklaringDag
    ),
    diary: data.dekksdagbok ?? null,
    shipwreckDateEpoch: data.dato ?? null,
    metadata: mapToMetadata(data),
  };
};

export const mapToIShipwreck = (data: IApiShipwreck): IShipwreck => {
  return {
    ...mapToIShipwreckBase(data),
    crew: getCrew(data),
    ship: getShip(data),
    documents: getFiles(data),
  };
};

const getCrew = (data: IApiShipwreck): Array<IShipwreckCrew> => {
  return getRelationshipsOfType<
    ApiRelationshipType.DELTAKER_I_FORLIS,
    IApiShipwreckCrew
  >(data, ApiRelationshipType.DELTAKER_I_FORLIS)
    .map(mapToIShipwreckCrew)
    .filter((crew) => crew); // Filter to remove null elements from array
};

const getShip = (data: IApiShipwreck): IShipBase => {
  const allOtherplayers = getOtherplayersByRelationshipType(
    data,
    ApiRelationshipType.DELTAKER_I_FORLIS
  );
  const ship: IShipBase = allOtherplayers
    .filter((player: IApiContent) => player.type === ApiContentType.SKIP)
    .map((ship: IApiShip) => mapToIShipBase(ship))[0];

  return ship;
};

export interface IShipwreckCrew {
  id: number;
  displayName: string;
  birthDate: IGranularDate;
  birthDateEpoch: number;
  // birthYear: number;
  // birthMonth: number;
  // birthDay: number;
  nationalityShort: string;
  position: string;
  fate: string;
  type: ContentType;
  placeOfBirth: string;
  sortValue: string;
}

export const mapToIShipwreckCrew = (
  relationship: IApiShipwreckSeafarerRelationship
): IShipwreckCrew => {
  const data = relationship._embedded.otherplayer[0];
  const properties = relationship.properties;

  if (data.type === ApiContentType.SJOMANN) {
    return {
      id: data.id,
      displayName: data.displayName,
      birthDateEpoch: data.fodselsdato ?? null,
      birthDate: mapToGranularDate(data.fodtAar, data.fodtMaaned, data.fodtDag),
      // birthYear: data.fodtAar ?? null,
      // birthMonth: data.fodtMaaned ?? null,
      // birthDay: data.fodtDag ?? null,
      nationalityShort: data.nasjonalitet ?? null,
      position: properties.stilling ?? null,
      fate: properties.skjebne ?? null,
      type: ContentType.SEAFARER,
      placeOfBirth: data.fodested ?? null,
      sortValue: data.etternavn || data.fornavn || "",
    };
  }
  return null;
};
