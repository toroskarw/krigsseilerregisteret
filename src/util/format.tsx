import { ReactNode } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { IGranularDate } from "../domain/common";

/**
 * Get formatted date for current locale.
 *
 * Supported input combinations are year&month&day, year&month and year.
 * Returns null if year is missing, or only year and day are present and month is missing.
 */
export const getFormattedDate = (
  // TODO: Refactor to use IGranularDate object as input?
  year?: number,
  month?: number,
  day?: number,
  short?: boolean
): ReactNode => {
  month = month ? month - 1 : month; // Month is 1-indexed in API, while formatter is 0-indexed
  if (year !== null && month != null && day != null) {
    const date: Date = new Date(year, month, day);
    return short ? (
      <FormattedDate
        value={date}
        year="numeric"
        month="numeric"
        day="numeric"
      />
    ) : (
      <FormattedDate value={date} year="numeric" month="long" day="numeric" />
    );
  } else if (year !== null && month != null) {
    const date: Date = new Date(year, month);
    return <FormattedDate value={date} year="numeric" month="long" />;
  } else if (year != null) {
    return year;
  } else {
    return null;
  }
};
export const getFormattedGranularDate = (
  date: IGranularDate,
  short?: boolean
) => {
  return date ? getFormattedDate(date.year, date.month, date.day, short) : null;
};
/**
 * Get formatted full name based on possibly empty parts of name.
 */
export const getFullName = (
  firstName: string,
  lastName: string
): string | ReactNode => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName || lastName) {
    return `${firstName ? firstName : lastName}`;
  }
  return (
    <FormattedMessage
      defaultMessage="Navn ikke registrert"
      description="Name is not registered"
    />
  );
};

/**
 * Get formatted full name based on possibly empty parts of name.
 */
export const valueToUppercase = (value: string): string => {
  return typeof value === "string"
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : "";
};
