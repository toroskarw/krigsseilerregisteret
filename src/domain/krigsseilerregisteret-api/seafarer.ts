import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";
import { IApiCounty } from "./county";
import { IApiSeafarerEnlistment } from "./enlistment";
import { IApiImageRelationship } from "./image";
import { IApiSailorsClub } from "./sailorsClub";

export type contentType = ApiContentType.SJOMANN;

export interface IApiSeafarer extends IApiContent<IApiSeafarerRelationships> {
  id: number;
  type: contentType;
  _import_krigsforlis_merknad?: string;
  _importSourceId?: string;
  _nasjonalitet?: string;
  annotasjonsrulle?: string;
  bortePaaHavet?: boolean;
  bosted?: string;
  displayName: string;
  dodAar?: number;
  dodDag?: number;
  dodMaaned?: number;
  dodsaarsak?: string;
  etternavn?: string;
  fodested?: string;
  fodselsdato?: number;
  fodtAar?: number;
  fodtDag?: number;
  fodtMaaned?: number;
  foreldre?: string;
  fornavn?: string;
  hvalfangstekspedisjon?: boolean;
  kallenavn?: string;
  kildeinformasjon?: string;
  kjonn?: "M" | "K";
  matrosrulle?: string;
  nasjonalitet?: string;
  nasjonalitetVisningsnavn?: string;
  nortrashipSkytter?: boolean;
  omkommetWW1?: boolean;
  omkommetWW2?: boolean;
  sivilstatus?: string;
  tjenestegjordeWW1?: boolean;
  tjenestegjordeWW2?: boolean;
  utfyllendeOpplysninger?: string;
  fangenskap?: boolean;
}

export type IApiSeafarerRelationships =
  | IApiRelationship<ApiRelationshipType.MEDLEM_AV, IApiSailorsClub>
  | IApiRelationship<ApiRelationshipType.GEOGRAFISK_TILKNYTNING, IApiCounty>
  | IApiRelationship<
      ApiRelationshipType.GJENNOMFORTE_MONSTRING,
      IApiSeafarerEnlistment
    >
  | IApiImageRelationship;
