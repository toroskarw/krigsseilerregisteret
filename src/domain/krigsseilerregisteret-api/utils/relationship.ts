import { ApiRelationshipType, IApiRelationship } from "../common";
import { IApiContent } from "../content";

// TODO: Route brukeren til 404 Not Found dersom content ikke finnes (skriver inn feil id i URL for eksempel)
export function getRelationshipsOfType<
  TRelationshipType extends ApiRelationshipType,
  TOtherPlayerType
>(content: IApiContent, type: TRelationshipType) {
  try {
    return content._embedded.relationships.filter(
      (r) => r.type === type
    ) as unknown as Array<
      IApiRelationship<TRelationshipType, TOtherPlayerType>
    >;
  } catch (error) {
    if (error instanceof TypeError) {
      const response = content as unknown as {
        error: { status: number };
        message: string;
      };
      throw new Error(
        `Server responded with ${response.error.status}: ${response.message}`
      );
    }
  }
}

export function getOtherplayersByRelationshipType<
  TRelationshipType extends ApiRelationshipType,
  TOtherPlayerType
>(content: IApiContent, type: TRelationshipType): TOtherPlayerType[] {
  const relationships = getRelationshipsOfType<
    TRelationshipType,
    TOtherPlayerType
  >(content, type);
  return relationships.map(function (relationship) {
    return relationship._embedded.otherplayer[0];
  });
}

export function getOtherplayerByRelationshipType<
  TRelationshipType extends ApiRelationshipType,
  TOtherPlayerType
>(content: IApiContent, type: TRelationshipType): TOtherPlayerType | null {
  const relationships = getRelationshipsOfType<
    TRelationshipType,
    TOtherPlayerType
  >(content, type);
  const otherPlayers = relationships.flatMap(function (relationship) {
    return relationship._embedded.otherplayer;
  });

  if (otherPlayers.length > 0) {
    return otherPlayers[0];
  }
  return null;
}
