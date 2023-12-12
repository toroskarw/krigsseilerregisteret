import { defineMessages, MessageDescriptor } from "react-intl";
import paths from "util/paths";
import { IAward, mapFromRelationshipRewardToIReward } from "./award";
import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { ICounty } from "./county";
import { ISeafarerEnlistment, mapToISeafarerEnlistment } from "./enlistment";
import { getFiles, IFile } from "./file";
import { getImages, IImage } from "./image";
import { IApiAward } from "./krigsseilerregisteret-api/award";
import {
  ApiContentType,
  ApiRelationshipType,
} from "./krigsseilerregisteret-api/common";
import { IApiContent } from "./krigsseilerregisteret-api/content";
import { IApiSeafarerEnlistment } from "./krigsseilerregisteret-api/enlistment";
import { IApiSeafarer } from "./krigsseilerregisteret-api/seafarer";
import { IApiPosition } from "./krigsseilerregisteret-api/position";
import {
  getOtherplayersByRelationshipType,
  getRelationshipsOfType,
} from "./krigsseilerregisteret-api/utils/relationship";
import { IRelatedContent, mapToIRelatedContent } from "./relatedContent";

export interface ISeafarerBase extends IContent {
  dateOfBirth: { year?: number; month?: number; day?: number }; // TODO: Endre til granular date
  dateOfDeath: { year?: number; month?: number; day?: number }; // TODO: Endre til granular date
  causeOfDeath: string;
  parents?: string;
  nickName?: string; // Kallenavn
  sailorRecords?: string; // Matrosrulle
  annotationRecords?: string; // Annotasjonsrulle
  gender?: "M" | "F";
  nationalityShort?: string;
  placeOfBirth?: string;
  residence?: string;
  counties?: ICounty[]; // Fylke
  services?: IRelatedContent[]; // // Flåtetilhørighet
  enlistmentDistricts?: IRelatedContent[]; // Tilknyttet mønstringsdistrikt
  positions?: IRelatedContent[]; // Har stillinger
  shippingCompanies?: IRelatedContent[]; // Har seilt for rederi
  education?: IRelatedContent[]; // Kjente utdannelser
  sailorsClub?: IRelatedContent[]; // Medlem av sjømannsforening
  shipwreck?: IRelatedContent[]; // "Sjøforklaring 1939 - 1945"
  tidsskriftetKrigsseileren?: IRelatedContent[]; // Omtale i Tidsskriftet Krigsseileren
  maanedensKrigsseiler?: IRelatedContent[];
  other?: IOther[]; // Annet
  miscellaneous: string;
  sources: string;
}

interface IOther {
  key: number;
  message: MessageDescriptor;
  path?: string;
}

export interface ISeafarer extends ISeafarerBase {
  enlistments: Array<ISeafarerEnlistment>;
  awards: Array<IAward>;
  images: Array<IImage>;
  documents: Array<IFile>;
}

export const mapToISeafarerBase = (data: IApiSeafarer): ISeafarerBase => {
  return {
    id: data.id,
    type: ContentType.SEAFARER,
    displayName: data.displayName
      ? data.displayName
      : [data.fornavn, data.etternavn].filter(Boolean).join(" "),
    dateOfBirth: {
      year: data.fodtAar ?? null,
      month: data.fodtMaaned ?? null,
      day: data.fodtDag ?? null,
    },
    dateOfDeath: {
      year: data.dodAar ?? null,
      month: data.dodMaaned ?? null,
      day: data.dodDag ?? null,
    },
    causeOfDeath: data.dodsaarsak ?? null,
    parents: data.foreldre ?? null,
    nickName: data.kallenavn ?? null,
    sailorRecords: data.matrosrulle ?? null,
    annotationRecords: data.annotasjonsrulle ?? null,
    gender: data.kjonn ? (data.kjonn == "K" ? "F" : data.kjonn) : null,
    nationalityShort: data.nasjonalitet ?? null,
    placeOfBirth: data.fodested ?? null,
    residence: data.bosted ?? null,
    counties: getSeafarerFact(
      data,
      ApiRelationshipType.GEOGRAFISK_TILKNYTNING,
      ApiContentType.FYLKE,
      "ALWAYS_LINK_TO_SJOHISTORIE"
    ),
    services: getSeafarerFact(
      data,
      ApiRelationshipType.TJENESTEGJORDE_I,
      ApiContentType.FLAATE
    ),
    positions: getSeafarerFact(
      data,
      ApiRelationshipType.HOYESTE_STILLING,
      ApiContentType.STILLING
    ),
    enlistmentDistricts: getSeafarerFact(
      data,
      ApiRelationshipType.TILHORT_MONSTRINGSDISTRIKT,
      ApiContentType.MONSTRINGSDISTRIKT,
      "ALWAYS_LINK_TO_SJOHISTORIE"
    ),
    shippingCompanies: getSeafarerFact(
      data,
      ApiRelationshipType.SEILT_FOR,
      ApiContentType.REDERI,
      "ALWAYS_LINK_TO_SJOHISTORIE"
    ),
    education: getSeafarerFact(
      data,
      ApiRelationshipType.UTDANNELSE_INNEN,
      ApiContentType.UTDANNELSE,
      "ALWAYS_LINK_TO_SJOHISTORIE"
    ),
    sailorsClub: getSeafarerFact(
      data,
      ApiRelationshipType.MEDLEM_AV,
      ApiContentType.SJOMANNSFORENING,
      "ALWAYS_LINK_TO_SJOHISTORIE"
    ),
    shipwreck: getSeafarerFact(
      data,
      ApiRelationshipType.DELTAKER_I_FORLIS,
      ApiContentType.FORLIS
    ),
    tidsskriftetKrigsseileren: getSeafarerFact(
      data,
      ApiRelationshipType.OMHANDLER,
      ApiContentType.TIDSSKRIFTET_KRIGSSEILEREN
    ),

    other: buildOther(data),
    miscellaneous: data.utfyllendeOpplysninger ?? null,
    sources: data.kildeinformasjon ?? null,
    metadata: mapToMetadata(data),
  };
};

export const mapToSeafarer = (data: IApiSeafarer): ISeafarer => {
  return {
    ...mapToISeafarerBase(data),
    enlistments: getEnlistments(data),
    awards: getAwards(data),
    images: getImages(data),
    documents: getFiles(data),
  };
};

const getSeafarerFact = <
  TRelationshipType extends ApiRelationshipType,
  TOtherPlayerType extends IApiContent
>(
  data: IApiSeafarer,
  relationshipType: TRelationshipType,
  representationOf: ApiContentType,
  override?: "ALWAYS_LINK_TO_SJOHISTORIE"
): IRelatedContent[] => {
  const apiContents = getOtherplayersByRelationshipType<
    TRelationshipType,
    TOtherPlayerType
  >(data, relationshipType);
  const facts: IRelatedContent[] = apiContents.map((fact: TOtherPlayerType) => {
    if (fact.type === ApiContentType.STILLING) {
      if ((fact as unknown as IApiPosition).harUtdypendeInformasjon === false) {
        //Hack for å kun rendre position som lenker hvis de har utdypende informasjon
        //https://jira.bouvet.no/browse/KSR-769
        delete fact._links.krigsseilerregisteret;
      }
      delete fact._links.sjohistorie;
    }

    return mapToIRelatedContent(
      fact,
      representationOf,
      override === "ALWAYS_LINK_TO_SJOHISTORIE"
    );
  });
  return facts;
};

const buildOther = (data: IApiSeafarer): IOther[] => {
  const values: IOther[] = [];
  const messages = defineMessages({
    ww1Message: {
      defaultMessage: "Deltok i 1. verdenskrig",
      description: "Participant in WW1",
    },
    ww2Message: {
      defaultMessage: "Deltok i 2. verdenskrig",
      description: "Participant in WW2",
    },
    captivity: {
      defaultMessage: "Fangenskap",
      description: "Captivity in WW2",
    },
    missingAtSea: {
      defaultMessage: "Borte på havet",
      description: "Went missing on the sea",
    },
    whalingExpedition: {
      defaultMessage: "Hvalfangstekspedisjon 1939-1940",
      description: "Whaling expedition 1939-1940",
    },
    nortraship: {
      defaultMessage: "Tilhørt Sjøforsvarets Skytteravdeling for Handelsflåten",
      description: "Served in the Merchant Marine Defence department",
    },
    warsailorOfTheMonth: {
      defaultMessage: "Omtalt som Månedens krigsseiler",
      description: "Link to war sailor of the month on seafarer profile page",
    },
  });

  const maanedensKrigsseiler = getSeafarerFact(
    data,
    ApiRelationshipType.OMHANDLET_I,
    ApiContentType.MAANEDENS_KRIGSSEILER
  );

  if (data.tjenestegjordeWW1)
    values.push({ key: 1, message: messages.ww1Message });
  if (data.tjenestegjordeWW2)
    values.push({ key: 2, message: messages.ww2Message });
  if (data.fangenskap) {
    values.push({ key: 3, message: messages.captivity });
  }
  if (data.bortePaaHavet)
    values.push({ key: 4, message: messages.missingAtSea });
  if (data.hvalfangstekspedisjon)
    values.push({
      key: 5,
      message: messages.whalingExpedition,
      path: paths.article(330961),
    });
  if (data.nortrashipSkytter)
    values.push({
      key: 6,
      message: messages.nortraship,
      path: paths.article(431827),
    });
  if (maanedensKrigsseiler && maanedensKrigsseiler.length > 0) {
    values.push({
      key: 7,
      message: messages.warsailorOfTheMonth,
      path: paths.warSailorOfTheMonthPage(maanedensKrigsseiler[0].id),
    });
  }
  return values;
};

const getEnlistments = (data: IApiSeafarer): Array<ISeafarerEnlistment> => {
  return getOtherplayersByRelationshipType<
    ApiRelationshipType.GJENNOMFORTE_MONSTRING,
    IApiSeafarerEnlistment
  >(data, ApiRelationshipType.GJENNOMFORTE_MONSTRING).map((enlistment) =>
    mapToISeafarerEnlistment(enlistment)
  );
};

const getAwards = (data: IApiSeafarer): Array<IAward> => {
  return getRelationshipsOfType<ApiRelationshipType.HAR_MOTTATT, IApiAward>(
    data,
    ApiRelationshipType.HAR_MOTTATT
  ).map(mapFromRelationshipRewardToIReward);
};
