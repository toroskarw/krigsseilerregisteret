import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";
import { IApiShipEnlistment } from "./enlistment";
import { IApiImageRelationship } from "./image";

export type contentType = ApiContentType.SKIP;

export interface IApiShip extends IApiContent<IApiShipRelationships> {
  id: number;
  type: contentType;
  displayName?: string;
  navn?: string;
  _importSourceId?: string;
  _nasjonalitet?: string;
  _visLokaltRegister?: boolean;
  _visNasjonaltRegister?: boolean;
  andreNavn?: string;
  bortePaaHavet?: boolean;
  bredde?: string;
  bruttoTonnasje?: string;
  byggeaar?: string;
  byggenummer?: string;
  commerceLaester?: string;
  dodvekt?: string;
  dypgang?: string;
  fart?: string;
  forlistAarsak?: string;
  fungertSomBase?: boolean;
  fungertSomHandelsskip?: boolean;
  fungertSomMarineskip?: boolean;
  kallesignal?: string;
  kildeinformasjon?: string;
  klasse?: string;
  lengde?: string;
  leveringsmaaned?: string;
  motorstorrelse?: string;
  nasjonalitet?: string;
  nettoTonnasje?: string;
  senketBreddegrad?: string;
  senketLengdegrad?: string;
  senketWW1?: boolean;
  senketWW2?: boolean;
  skipsregisterindex?: string;
  tapsAarsakAarWW2: number;
  tapsAarsakDagWW2: number;
  tapsAarsakMaanedWW2: number;
  tapsAarsakUtforelseWW2: string;
  tapsAarsakWW2?: string;

  tjenestegjordeWW1?: boolean;
  tjenestegjordeWW2?: boolean;
  tollregisterdato?: string;
  tollregistreringsnummer?: string;
  tonnasjeUnderDekk?: string;
  typebetegnelse?: string;
  utfyllendeOpplysninger?: string;
  visSomBase?: boolean;
}

export type IApiShipRelationships =
  | IApiRelationship<ApiRelationshipType.HAR_MONSTRINGER, IApiShipEnlistment>
  | IApiImageRelationship;
