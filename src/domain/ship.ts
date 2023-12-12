import { getFormattedCauseOfSinking } from "features/ship/profile/util";
import { ReactNode } from "react";
import { defineMessages, MessageDescriptor } from "react-intl";
import { IGranularDate, mapToGranularDate, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IEngine, mapToIEngine } from "./engine";
import { getFiles, IFile } from "./file";
import { getImages, IImage } from "./image";
import {
  ApiContentType,
  ApiRelationshipType,
} from "./krigsseilerregisteret-api/common";
import { IApiContent } from "./krigsseilerregisteret-api/content";
import { IApiEngine } from "./krigsseilerregisteret-api/engine";
import { IApiNation } from "./krigsseilerregisteret-api/nation";
import { IApiShip } from "./krigsseilerregisteret-api/ship";
import {
  getOtherplayerByRelationshipType,
  getOtherplayersByRelationshipType,
} from "./krigsseilerregisteret-api/utils/relationship";
import { INation, mapToINationBase } from "./nation";
import { IRelatedContent, mapToIRelatedContent } from "./relatedContent";

export interface IShipBase extends IContent {
  showAsBase: boolean;
  nationalityShort: string;
  callSignal: string;
  otherNames: string;
  class: string;
  shippingCompany: IRelatedContent[];
  shipwreck: IRelatedContent[];
  homePort: IRelatedContent[];
  enlistmentDistrict: IRelatedContent[];
  shipyard: IRelatedContent[];
  buildYear: string;
  yardNumber: string;
  monthOfDelivery: string;
  customsRegisterNumber: string;
  customsRegisterDate: string;
  tidsskriftetKrigsseileren: IRelatedContent[];
  other: IOther[];
  specialMention: IRelatedContent[];
  grossTonnage: string;
  netTonnage: string;
  deadweight: string;
  cargoVolume: string;
  engine: IEngine;
  speed: string;
  length: string;
  beam: string;
  draft: string;
  engineSize: string;
  miscellaneous: string;
  sources: string;
  shipwreckLongitude: string;
  shipwreckLatitude: string;
  lossWW2?: {
    date?: IGranularDate;
    causedByNation?: INation;
    causedByService?: string;
    reason?: string;
  };
}

export interface IShip extends IShipBase {
  images: IImage[];
  documents: IFile[];
}

interface IOther {
  key: number | string;
  message: string | MessageDescriptor | (string | MessageDescriptor)[];
  values?: ReactNode;
  path?: string;
}

export const mapToIShipBase = (data: IApiShip): IShipBase => {
  return {
    id: data.id,
    displayName: data.displayName
      ? data.displayName
      : [data.typebetegnelse, data.navn].filter(Boolean).join(" "),
    type: ContentType.SHIP,
    showAsBase: data.visSomBase ?? false,
    nationalityShort: data.nasjonalitet ?? null,
    callSignal: data.kallesignal ?? null,
    otherNames: data.andreNavn ?? null,
    class: data.klasse ?? null,
    shippingCompany: getRelatedContent(
      data,
      ApiRelationshipType.EID_AV,
      ApiContentType.REDERI,
      true
    ),
    shipwreck: getRelatedContent(
      data,
      ApiRelationshipType.DELTAKER_I_FORLIS,
      ApiContentType.FORLIS
    ),
    homePort: getRelatedContent(
      data,
      ApiRelationshipType.TILHORT_HAVN,
      ApiContentType.HAVN,
      true
    ),
    enlistmentDistrict: getRelatedContent(
      data,
      ApiRelationshipType.TILHORT_MONSTRINGSDISTRIKT,
      ApiContentType.MONSTRINGSDISTRIKT,
      true
    ),
    shipyard: getRelatedContent(
      data,
      ApiRelationshipType.BYGGET_AV,
      ApiContentType.VERFT,
      true
    ),
    buildYear: data.byggeaar ?? null,
    yardNumber: data.byggenummer ?? null,
    monthOfDelivery: data.leveringsmaaned ?? null,
    customsRegisterNumber: data.tollregistreringsnummer ?? null,
    customsRegisterDate: data.tollregisterdato ?? null,
    tidsskriftetKrigsseileren: getRelatedContent(
      data,
      ApiRelationshipType.OMHANDLER,
      ApiContentType.TIDSSKRIFTET_KRIGSSEILEREN
    ),
    other: buildOther(data),
    specialMention: getRelatedContent(
      data,
      ApiRelationshipType.HAR_SPESIELL_OMTALE,
      ApiContentType.ARTIKKEL
    ),
    grossTonnage: data.bruttoTonnasje ?? null,
    netTonnage: data.nettoTonnasje ?? null,
    deadweight: data.dodvekt ?? null,
    cargoVolume: data.commerceLaester ?? null,
    engine: mapToIEngine(
      getOtherplayerByRelationshipType<
        ApiRelationshipType.HAR_UTSTYR,
        IApiEngine
      >(data, ApiRelationshipType.HAR_UTSTYR)
    ),
    speed: data.fart ?? null,
    length: data.lengde ?? null,
    beam: data.bredde ?? null,
    draft: data.dypgang ?? null,
    engineSize: data.motorstorrelse ?? null,
    miscellaneous: data.utfyllendeOpplysninger ?? null,
    sources: data.kildeinformasjon ?? null,
    shipwreckLongitude: data.senketLengdegrad ?? null,
    shipwreckLatitude: data.senketBreddegrad ?? null,
    lossWW2:
      data.senketWW2 || data.tapsAarsakWW2
        ? {
            date: mapToGranularDate(
              data.tapsAarsakAarWW2,
              data.tapsAarsakMaanedWW2,
              data.tapsAarsakDagWW2
            ),
            causedByNation: mapToINationBase(
              getOtherplayerByRelationshipType<
                ApiRelationshipType.SENKET_AV_NASJON,
                IApiNation
              >(data, ApiRelationshipType.SENKET_AV_NASJON)
            ),
            causedByService: data.tapsAarsakUtforelseWW2 ?? null,
            reason: data.tapsAarsakWW2 ?? null,
          }
        : null,
    metadata: mapToMetadata(data),
  };
};

export const mapToIShip = (data: IApiShip): IShip => {
  return {
    ...mapToIShipBase(data),
    images: getImages(data),
    documents: getFiles(data),
  };
};

const getRelatedContent = <
  TRelationshipType extends ApiRelationshipType,
  TOtherPlayerType extends IApiContent
>(
  data: IApiShip,
  relationshipType: TRelationshipType,
  representationOf: ApiContentType,
  overrideAndAlwaysLinkToSjøhistorie = false
): IRelatedContent[] => {
  const apiContents = getOtherplayersByRelationshipType<
    TRelationshipType,
    TOtherPlayerType
  >(data, relationshipType);
  const contents: IRelatedContent[] = apiContents.map(
    (content: TOtherPlayerType) =>
      mapToIRelatedContent(
        content,
        representationOf,
        overrideAndAlwaysLinkToSjøhistorie
      )
  );
  return contents;
};

const buildOther = (data: IApiShip): IOther[] | null => {
  const values: IOther[] = [];
  const messages = defineMessages({
    navyShip: {
      defaultMessage: "Marineskip",
      description: "Navy ship",
    },
    civilianShip: {
      defaultMessage: "Sivilt skip",
      description: "Civilian ship",
    },
    base: {
      defaultMessage: "Base",
      description: "Base",
    },
    ww1Message: {
      defaultMessage: "Deltok i 1. verdenskrig",
      description: "Participant in WW1",
    },
    ww2Message: {
      defaultMessage: "Deltok i 2. verdenskrig",
      description: "Participant in WW2",
    },
    wasSunk: {
      defaultMessage: "Ble senket: ",
      description: "Was sunk: ",
    },
    nortraship: {
      defaultMessage: "Tilhørt Sjøforsvarets Skytteravdeling for Handelsflåten",
      description: "Served in the Merchant Marine Defence department",
    },
  });

  const shipTypes = [];
  if (data.fungertSomHandelsskip) shipTypes.push(messages.civilianShip);
  if (data.fungertSomMarineskip) shipTypes.push(messages.navyShip);
  if (data.fungertSomBase) shipTypes.push(messages.base);

  const shipType: IOther = {
    key: "shipType",
    message: shipTypes,
  };

  if (data.tjenestegjordeWW1)
    values.push({ key: 1, message: messages.ww1Message });
  if (data.tjenestegjordeWW2)
    values.push({ key: 2, message: messages.ww2Message });
  if (data.senketWW1)
    values.push({
      key: 3,
      message: [
        messages.wasSunk,
        getFormattedCauseOfSinking(data.forlistAarsak),
      ],
    });
  if (data.senketWW2 || data.tapsAarsakWW2) {
    const year = data.tapsAarsakAarWW2;
    const month = data.tapsAarsakMaanedWW2;
    const day = data.tapsAarsakDagWW2;
    const cause = data.tapsAarsakWW2 ?? data.forlistAarsak ?? "";
    let date: string;
    if (year || month || day) {
      date = `(${[day, month, year].join(".")})`;
    } else date = null;
    values.push({
      key: "sunkWW2",
      message: [getFormattedCauseOfSinking(cause), date],
    });
  }
  if (shipTypes.length > 0) values.push(shipType);

  return values.length > 0 ? values : null;
};
