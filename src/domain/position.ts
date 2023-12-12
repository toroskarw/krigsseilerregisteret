import { mapToDefaultMetadata, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IImage, mapToImage } from "./image";
import { ApiRelationshipType } from "./krigsseilerregisteret-api/common";
import { IApiImage } from "./krigsseilerregisteret-api/image";
import { IApiPosition } from "./krigsseilerregisteret-api/position";
import { getRelationshipsOfType } from "./krigsseilerregisteret-api/utils/relationship";

export interface IPositionBase extends IContent {
  id: number;
  displayName?: string;
  name?: string;
  type: ContentType;
  additionalDetails?: string;
}
export interface IPosition extends IPositionBase {
  images: Array<IImage>;
}

export const mapToIPositionBase = (data: IApiPosition): IPositionBase => {
  return {
    id: data.id,
    displayName: data.displayName ?? data.navn ?? null,
    type: ContentType.POSITION,
    additionalDetails: data.utfyllendeOpplysninger ?? null,
    metadata: data.harUtdypendeInformasjon
      ? {
          publishedTo: {
            ...mapToMetadata(data).publishedTo,
            sjohistorie: false,
            krigsseilerregisteret: true,
          },
        }
      : {
          publishedTo: {
            ...mapToDefaultMetadata(data).publishedTo,
            sjohistorie: false,
          },
        },
  };
};

export const mapToIPosition = (data: IApiPosition): IPosition => {
  return {
    ...mapToIPositionBase(data),
    images: getImages(data),
  };
};

const getImages = (data: IApiPosition): Array<IImage> => {
  return getRelationshipsOfType<
    ApiRelationshipType.HAR_TILKNYTTEDE_BILDER,
    IApiImage
  >(data, ApiRelationshipType.HAR_TILKNYTTEDE_BILDER).map(mapToImage);
};
