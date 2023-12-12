import { getFirstElement } from "util/array";
import paths from "util/paths";
import { formatSjohistoriePath } from "./common";
import { ApiContentType } from "./krigsseilerregisteret-api/common";
import { IApiContent } from "./krigsseilerregisteret-api/content";
import { IApiShipwreck } from "./krigsseilerregisteret-api/shipwreck";

export enum PublishTarget {
  KRIGSSEILERREGISTERET = "Krigsseilerregisteret",
  SJOHISTORIE = "Sjøhistorie",
}

export interface IRelatedContent {
  id: number;
  displayName: string;
  representationOf: ApiContentType;
  publishedToTarget?: PublishTarget;
  path?: string;
  additionalInfo?: string;
}

export const mapToIRelatedContent = <T extends IApiContent>(
  data: T,
  representationOf: ApiContentType,
  overrideAndAlwaysLinkToSjøhistorie = false
): IRelatedContent => {
  let target: PublishTarget;
  let path: string;
  if (
    data._links.krigsseilerregisteret &&
    overrideAndAlwaysLinkToSjøhistorie === false
  ) {
    target = PublishTarget.KRIGSSEILERREGISTERET;
    path = getFactPath(data.id, representationOf);
  } else if (data._links.sjohistorie) {
    target = PublishTarget.SJOHISTORIE;
    path = formatSjohistoriePath(getFirstElement(data._links.sjohistorie).href);
  } else {
    target = null;
    path = null;
  }

  let displayName = data.displayName;
  let additionalInfo: string;
  if (representationOf == ApiContentType.FORLIS) {
    const shipwreck = data as unknown as IApiShipwreck;
    displayName = shipwreck.displayName ?? shipwreck.navn ?? "Forlis";
    additionalInfo = shipwreck.aarsak
      ? shipwreck.aarsak
      : shipwreck.aarsak_stikkord ?? "Ukjent årsak";
  }

  return {
    id: data.id,
    displayName: displayName,
    additionalInfo: additionalInfo ?? null,
    publishedToTarget: target,
    path: path,
    representationOf: representationOf,
  };
};

const getFactPath = (id: number, contentType: ApiContentType) => {
  switch (contentType) {
    case ApiContentType.FYLKE:
      return null;
    case ApiContentType.HAVN:
      return paths.harbour(id);
    case ApiContentType.SJOMANNSFORENING:
      return paths.sailorsClub(id);
    case ApiContentType.SJOMANN:
      return paths.seafarer(id);
    case ApiContentType.SKIP:
      return paths.ship(id);
    case ApiContentType.FLAATE:
      return getFleetPath(id);
    case ApiContentType.STILLING:
      return paths.position(id);
    case ApiContentType.MONSTRINGSDISTRIKT:
      return paths.enlistmentDistrict(id);
    case ApiContentType.REDERI:
      return paths.shippingCompany(id);
    case ApiContentType.UTDANNELSE:
      return paths.education(id);
    case ApiContentType.FORLIS:
      return paths.shipwreck(id);
    case ApiContentType.ARTIKKEL:
      return paths.article(id);
    case ApiContentType.NAVIGASJONSSIDE:
      return paths.navigationPage(id);
    default:
      return null;
  }
};

const getFleetPath = (fleetId: number): string | null => {
  const fleetPathLookup = {
    121489: paths.article(320524),
    121490: paths.article(320528),
    121487: paths.article(320552),
    121488: paths.article(320546),
    121495: paths.article(320558),
    121497: paths.article(704099),
  };

  if (Object.keys(fleetPathLookup).includes(fleetId.toString()))
    return fleetPathLookup[fleetId];
  else return null;
};
