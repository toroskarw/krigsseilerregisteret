import { convertToReverseProxyLink } from "util/constants";
import { mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { ApiRelationshipType } from "./krigsseilerregisteret-api/common";
import { IApiContent } from "./krigsseilerregisteret-api/content";
import {
  IApiFile,
  IApiFileRelationship,
} from "./krigsseilerregisteret-api/file";
import { getRelationshipsOfType } from "./krigsseilerregisteret-api/utils/relationship";

export interface IFile extends IContent {
  filename: string;
  downloadPath: string;
}

export const mapToIFile = (relationship: IApiFileRelationship): IFile => {
  const file = relationship._embedded.otherplayer[0];
  const properties = relationship.properties;

  return {
    id: file.id,
    filename: file.filename,
    type: ContentType.FILE,
    displayName: properties.title ?? file.name ?? null,
    downloadPath: convertToReverseProxyLink(file._links.self.href),
    metadata: mapToMetadata(file),
  };
};

export const getFiles = (data: IApiContent): Array<IFile> => {
  return getRelationshipsOfType<
    ApiRelationshipType.HAR_TILKNYTTEDE_FILER,
    IApiFile
  >(data, ApiRelationshipType.HAR_TILKNYTTEDE_FILER).map(mapToIFile);
};
