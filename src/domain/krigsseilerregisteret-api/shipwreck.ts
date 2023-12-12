import {
  ApiContentType,
  ApiRelationshipType,
  IApiRelationship,
} from "./common";
import { IApiContent } from "./content";

export type contentType = ApiContentType.FORLIS;

export interface IApiShipwreck
  extends IApiContent<IApiShipwreckSeafarerRelationship> {
  id: number;
  type: ApiContentType.FORLIS;
  displayName?: string;
  _importSourceId?: string;
  aarsak?: string;
  aarsak_stikkord?: string;
  administrator?: string;
  antallFanget?: string;
  antallOmkommet?: string;
  antallReddet?: string;
  antallSavnet?: string;
  dato?: number;
  datoAar?: number;
  datoDag?: number;
  datoMaaned?: number;
  dekksdagbok?: string;
  last?: string;
  mannskapsliste?: string;
  merknadSjoforklaring?: string;
  navn?: string;
  posisjonBeskrivelse?: string;
  rapportKilde?: string;
  rapportOk?: string;
  referat?: string;
  referatKilde?: string;
  reiserute?: string;
  sjoforklaringAar?: number;
  sjoforklaringDag?: number;
  sjoforklaringMaaned?: number;
  sjoforklaringOk?: string;
  sjoforklaringsdato?: number;
  sjoforklaringssted?: string;
}

export type IApiShipwreckSeafarerRelationship = IApiRelationship<
  ApiRelationshipType.DELTAKER_I_FORLIS,
  IApiShipwreckCrew,
  {
    stilling: string;
    skjebne: string;
  }
>;

// TODO: Dette er en delmengde av SJOMANN... hva hadde vært en bedre måte?
export interface IApiShipwreckCrew extends IApiContent {
  id: number;
  displayName: string;
  bosted?: string;
  dodAar?: number;
  dodDag?: number;
  dodMaaned?: number;
  etternavn?: string;
  fodested?: string;
  fodselsdato?: number;
  fodtAar?: number;
  fodtDag?: number;
  fodtMaaned?: number;
  fornavn?: string;
  kildeinformasjon?: string;
  kjonn?: string;
  nasjonalitet?: string;
  nasjonalitetVisningsnavn?: string;
  sivilstatus?: string;
  tjenestegjordeWW2?: boolean;
  utfyllendeOpplysninger?: string;
}
