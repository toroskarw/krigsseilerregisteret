import { getFirstElement } from "util/array";
import { formatSjohistoriePath, mapToDefaultMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiEngine } from "./krigsseilerregisteret-api/engine";

export interface IEngineBase extends IContent {
  name?: string;
  size?: string;
  builtBy?: string;
  path?: string;
}

export type IEngine = IEngineBase;

export const mapToIEngineBase = (data: IApiEngine): IEngineBase => {
  const metadata = mapToDefaultMetadata(data);

  let path: string;
  if (metadata.publishedTo.sjohistorie) {
    path = formatSjohistoriePath(getFirstElement(data._links.sjohistorie).href);
  } else {
    path = null;
  }

  return {
    id: data.id,
    displayName: data.displayName ?? data.navn ?? null,
    type: ContentType.ENGINE,
    name: data.navn ?? null,
    size: data.storrelse ?? null,
    builtBy: data.byggested ?? null,
    metadata: metadata,
    path: path,
  };
};

export const mapToIEngine = (data: IApiEngine): IEngine | null => {
  if (!data) {
    return null;
  }
  return {
    ...mapToIEngineBase(data),
  };
};
