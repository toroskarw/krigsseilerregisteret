import { ApiRelationshipType, IApiRelationship } from "./common";
import { IApiContent } from "./content";
import { IApiImageRelationship } from "./image";

export type IApiAwardRelationship = IApiRelationship<
  ApiRelationshipType.HAR_MOTTATT,
  IApiAward,
  {
    begrunnelse?: string;
    mottattDag?: number;
    mottattMaaned?: number;
    mottattAar?: number;
    mottattDato?: string;
  }
>;

export interface IApiAward extends IApiContent<IApiImageRelationship> {
  id: number;
  nasjonalitet: string;
  rangering: string;
  navn: string;
  utfyllendeOpplysninger: string;
  oppsummering?: string;

  bildeURN: string;
}
