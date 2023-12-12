import { SeafarerIcon, ShipIcon } from "components/Icons";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { components } from "react-select";
import { getFormattedDate } from "util/format";

const { Option } = components;
export const CustomOption = (props) => {
  const { year, month, day, type, place } = props.data;
  const date = getFormattedDate(year, month, day);

  let seafarerMessage: ReactNode;
  if (date && place) {
    seafarerMessage = (
      <FormattedMessage
        defaultMessage="Født {date} i {place}"
        description="Born date in place"
        values={{ date: date, place: place }}
      />
    );
  } else if (date && !place) {
    seafarerMessage = (
      <FormattedMessage
        defaultMessage="Født {date}"
        description="Born (date)"
        values={{ date: date }}
      />
    );
  } else if (!date && place) {
    seafarerMessage = (
      <FormattedMessage
        defaultMessage="Født i {place}"
        description="Born (place)"
        values={{ place: place }}
      />
    );
  }

  const shipMessage = year ? (
    <FormattedMessage
      defaultMessage="Bygget {year}"
      description="Built"
      values={{ year: year }}
    />
  ) : null;

  return (
    <Option
      {...props}
      className="hover:underline tablet:flex tablet:items-center hover:cursor-pointer"
    >
      <div className="flex">
        <div className="flex items-center space-x-4 w-full">
          <div className="fill-current">
            {props.data.type == "seafarer" ? <SeafarerIcon /> : <ShipIcon />}
          </div>

          <div className="text-darkblue tablet:flex tablet:items-center tablet:w-full tablet:justify-evenly">
            <div className="tablet:flex tablet:flex-grow tablet:whitespace-nowrap tablet:mr-5">
              {props.data.label}
            </div>
            <div className="text-sm text-darkblue-60 tablet:justify-end tablet:text-right">
              {type == "seafarer" ? seafarerMessage : shipMessage}
            </div>
          </div>
        </div>
      </div>
    </Option>
  );
};
