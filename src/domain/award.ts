import { IGranularDate, mapToGranularDate, mapToMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { getImages, IImage } from "./image";
import {
  IApiAwardRelationship,
  IApiAward,
} from "./krigsseilerregisteret-api/award";

export interface IAward extends IContent {
  id: number;
  displayName: string;
  images?: IImage[];
  receivedDate?: IGranularDate;
  furtherDetails: string;
  nationality: string;
  ranking: string;
  justification?: string;
}

export const mapFromRelationshipRewardToIReward = (
  relationship: IApiAwardRelationship
): IAward => {
  const award = relationship._embedded.otherplayer[0];
  const properties = relationship.properties;
  const images = getImages(award);

  return {
    id: award.id,
    displayName: award.navn ?? null,
    receivedDate: mapToGranularDate(
      properties.mottattAar,
      properties.mottattMaaned,
      properties.mottattDag
    ),
    justification: properties.begrunnelse,
    images: images,
    furtherDetails: award.utfyllendeOpplysninger ?? null,
    nationality: award.nasjonalitet ?? null,
    ranking: award.rangering ?? null,
    metadata: mapToMetadata(award),
    type: ContentType.AWARD,
  };
};

export const mapFromIApiAwardToIAward = (award: IApiAward): IAward => {
  const images = getImages(award);

  return {
    id: award.id,
    displayName: award.navn ?? null,
    furtherDetails: award.utfyllendeOpplysninger ?? null,
    nationality: award.nasjonalitet ?? null,
    ranking: award.rangering ?? null,
    images: images ?? null,
    metadata: mapToMetadata(award),
    type: ContentType.AWARD,
  };
};
