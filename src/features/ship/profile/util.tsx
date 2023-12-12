import leaveIconWhite from "@/images/leave-icon-white.svg";
import leaveIcon from "@/images/leave-icon.svg";
import { Link } from "components/Link";
import { IEngine } from "domain/engine";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IRelatedContent, PublishTarget } from "domain/relatedContent";
import Image from "next/image";
import { ReactNode } from "react";
import { defineMessages, MessageDescriptor } from "react-intl";

export const getFormattedCauseOfSinking = (
  cause: string
): MessageDescriptor => {
  const causesOfSinking = defineMessages({
    "": {
      defaultMessage: "Annen årsak",
      description: "Other cause",
    },
    brann_eksplosjon: {
      defaultMessage: "Brann/Eksplosjon",
      description: "Fire/Explosion",
    },
    beskutt: {
      defaultMessage: "Beskutt",
      description: "Shelled by gunfire",
    },
    flyangrep: {
      defaultMessage: "Flyangrep",
      description: "Attacked from air",
    },
    grunnstott_uvaer: {
      defaultMessage: "Grunnstøtt/uvær",
      description: "Ran aground",
    },
    internert: {
      defaultMessage: "Internert",
      description: "Interned",
    },
    kapret: {
      defaultMessage: "Kapret",
      description: "Hijacked",
    },
    kollisjon: {
      defaultMessage: "Kollisjon",
      description: "Collision",
    },
    minesprengt: {
      defaultMessage: "Minesprengt",
      description: "Sunk by mine",
    },
    senket_av_eget_mannskap_eller_alliert_skip: {
      defaultMessage: "Senket av eget mannskap eller alliert skip",
      description: "Shuttled",
    },
    torpedert: {
      defaultMessage: "Torpedert",
      description: "Torpedoed",
    },
    rekvirert: {
      defaultMessage: "Rekvirert/beslaglagt av aksemaktene",
      description: "Requisitioned/confiscated by Axis power",
    },
  });
  return causesOfSinking[cause] ?? null;
};

const getDisplayValue = (content: IRelatedContent) => {
  if (content.representationOf == ApiContentType.FORLIS) {
    return content.additionalInfo;
  } else return content.displayName;
};

/**
 * Takes in a list of facts and formats them to JSX
 */
export const getValueList: (contentArray: IRelatedContent[]) => ReactNode = (
  contentArray
) => {
  if (contentArray.length > 0) {
    return (
      <ul>
        {contentArray.map((relatedContent) => {
          return (
            <li key={relatedContent.id}>
              {relatedContent.path ? (
                <Link
                  to={relatedContent.path}
                  openInNewWindow={
                    relatedContent.publishedToTarget ==
                    PublishTarget.SJOHISTORIE
                      ? true
                      : false
                  }
                >
                  <span>{getDisplayValue(relatedContent)}</span>
                  {relatedContent.publishedToTarget ==
                    PublishTarget.SJOHISTORIE && (
                    <span className="ml-1">
                      <Image src={leaveIcon} height={12} width={12} />
                    </span>
                  )}
                </Link>
              ) : (
                getDisplayValue(relatedContent)
              )}
            </li>
          );
        })}
      </ul>
    );
  } else return null;
};

export const getEngineLink: (engine: IEngine) => ReactNode = (engine) => {
  // Assumes engine will always link to Sjøhistorie if present.
  // Unsure if there will ever be an engine without a path, but
  // added a fallback just in case.
  return engine.path ? (
    <Link
      to={engine.path}
      openInNewWindow={engine.metadata.publishedTo.sjohistorie}
    >
      <span>{engine.displayName}</span>
      {engine.metadata.publishedTo.sjohistorie && (
        <span className="ml-1">
          <Image src={leaveIconWhite} height={12} width={12} />
        </span>
      )}
    </Link>
  ) : (
    engine.displayName
  );
};
