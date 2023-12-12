import { ChevronRightIcon, SeafarerIcon, ShipIcon } from "components/Icons";
import { Link } from "components/Link";
import { IStatistics } from "domain/statistics";
import React, { ReactNode } from "react";
import { defineMessages, FormattedNumber, useIntl } from "react-intl";
import { colors } from "util/constants";
import paths from "util/paths";

export interface StatisticsProps {
  statistics: IStatistics;
  type: "seafarer" | "ship";
}

export const Statistics = ({ statistics, type }: StatisticsProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    seafarer: {
      defaultMessage: "Registrerte sjøfolk",
      description: "Registered seafarers",
    },
    ship: {
      defaultMessage: "Registrerte skip",
      description: "Registered ships",
    },
  });
  const buttonmessages = defineMessages({
    seafarer: {
      defaultMessage: "Søk etter sjøfolk",
      description: "Søk etter sjøfolk",
    },
    ship: {
      defaultMessage: "Søk etter skip",
      description: "Søk etter skip",
    },
  });

  let count: number;
  let message: string;
  let buttonmessage: string;
  let icon: ReactNode;
  let path: string;
  if (type == "seafarer") {
    count = statistics.seafarer;
    message = intl.formatMessage(messages.seafarer);
    icon = <SeafarerIcon width={45} height={30} />;
    buttonmessage = intl.formatMessage(buttonmessages.seafarer);
    path = paths.seafarerArchive();
  } else if (type == "ship") {
    count = statistics.ship;
    message = intl.formatMessage(messages.ship);
    icon = <ShipIcon width={43} height={30} />;
    buttonmessage = intl.formatMessage(buttonmessages.ship);
    path = paths.shipArchive();
  }

  return (
    <div className="flex flex-col items-center px-6 pt-7 pb-6 w-full bg-beige-30">
      <div className="flex mb-6 fill-current text-gold">{icon}</div>
      <div className="flex items-center mb-3 text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
        <span className="mr-2 w-6 border-b"></span>
        {message}
        <span className="ml-2 w-6 border-b"></span>
      </div>
      <div className="mb-8 text-5xl font-bold text-purple">
        <FormattedNumber value={count} />
      </div>
      <div className="py-2.5 pr-4 pl-8 text-sm font-medium text-white bg-purple">
        <Link to={path} className="flex items-center no-underline">
          <span>{buttonmessage}</span>
          <span className="ml-4">
            <ChevronRightIcon
              width="7"
              height="12"
              fill={colors.white.DEFAULT} // TODO: Gjør lilla ved hover (som på seafarer icon og ship icon)
            />
          </span>
        </Link>
      </div>
    </div>
  );
};
