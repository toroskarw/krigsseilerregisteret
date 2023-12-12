import leaveIcon from "@/images/leave-icon.svg";
import { Link } from "components/Link";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import { IRelatedContent, PublishTarget } from "domain/relatedContent";
import Image from "next/image";
import React, { ReactElement } from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";

export const getFormattedCauseOfDeath = (cause: string): MessageDescriptor => {
  const causesOfDeath = defineMessages({
    ukjent: {
      defaultMessage: "Ukjent",
      description: "Unknown",
    },
    sykdom: {
      defaultMessage: "Sykdom",
      description: "Disease",
    },
    alminnelig_ulykke: {
      defaultMessage: "Alminnelig ulykke",
      description: "Accident",
    },
    krigsulykke: {
      defaultMessage: "Krigsulykke",
      description: "War accident",
    },
    alminnelig_forlis: {
      defaultMessage: "Alminnelig forlis",
      description: "Shipwreck",
    },
    krigsforlis: {
      defaultMessage: "Krigsforlis",
      description: "War-related shipwreck",
    },
    fangenskap: {
      defaultMessage: "Fangenskap",
      description: "Captivity",
    },
    annet: {
      defaultMessage: "Annet",
      description: "Other",
    },
  });
  return causesOfDeath[cause];
};

export const getFormattedGender = (code: string) => {
  switch (code) {
    case "M":
      return <FormattedMessage defaultMessage="Mann" description="Male" />;
    case "F":
      return <FormattedMessage defaultMessage="Kvinne" description="Female" />;
    default:
      return null;
  }
};

const getDisplayValue = (content: IRelatedContent) => {
  if (content.representationOf == ApiContentType.FORLIS) {
    return (
      content.displayName +
      `${content.additionalInfo ? ", " + content.additionalInfo : ""}`
    );
  } else return content.displayName;
};

/**
 * Takes in a list of facts and formats them to JSX
 */
export const getValueList: (
  values: IRelatedContent[]
) => ReactElement[] | null = (values) => {
  if (values.length > 0) {
    return values.map((fact) => {
      return (
        <div key={fact.id}>
          {fact.path ? (
            <Link
              to={fact.path}
              openInNewWindow={
                fact.publishedToTarget == PublishTarget.SJOHISTORIE
                  ? true
                  : false
              }
            >
              <span>{getDisplayValue(fact)}</span>
              {fact.publishedToTarget == PublishTarget.SJOHISTORIE && (
                <span className="ml-1">
                  <Image src={leaveIcon} height={12} width={12} />
                </span>
              )}
            </Link>
          ) : (
            getDisplayValue(fact)
          )}
        </div>
      );
    });
  } else return null;
};
