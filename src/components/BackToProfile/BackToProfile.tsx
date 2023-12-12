import { Tab, TabList } from "@reach/tabs";
import { ChevronLeftIcon } from "components/Icons";
import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";

export interface BackToProfileProps {
  message: MessageDescriptor;
}

export const BackToProfile = ({ message }: BackToProfileProps) => {
  const intl = useIntl();
  return (
    <nav className="desktop:hidden">
      <TabList>
        <Tab index={0} className="flex items-center text-xs tablet:text-sm">
          <span className="mr-3.5">
            <ChevronLeftIcon />
          </span>
          {intl.formatMessage(message)}
        </Tab>
      </TabList>
    </nav>
  );
};
