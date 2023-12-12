import { months } from "domain/messages/months";
import range from "lodash.range";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import { getNewQuery, pushNewQuery } from "util/router";

export const LossDateFilterSort = () => {
  const intl = useIntl();

  const router = useRouter();
  const lossMonthKey = "lossMonthWW2"; // "tapsAarsakMaanedWW2";
  const lossYearKey = "lossYearWW2"; // "tapsAarsakAarWW2";
  const lossMonth = getFirstElement(router.query[lossMonthKey]);
  const lossYear = getFirstElement(router.query[lossYearKey]);

  return (
    <form
      className="mb-2"
      onSubmit={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
    >
      <legend className="mb-2 text-sm ">
        <FormattedMessage
          defaultMessage="Vis kun skip med tapsdato"
          description="Direkte oppslag på skip tapsdato-label"
        />
      </legend>

      <div className="flex space-x-2">
        <div>
          <label
            className="sr-only"
            htmlFor="taptAar"
            aria-label="Filtrer på år skip ble tapt"
          >
            <FormattedMessage
              defaultMessage="År"
              description="Filter for tapsdato"
            />
          </label>

          <select
            className=" font-semibold text-sm py-2.5 pl-3 pr-7  rounded-lg  border-darkblue focus:ring-darkblue-60 focus:border-darkblue-60 focus:box-shadow-transparent"
            id="taptAar"
            defaultValue={lossYear}
            onChange={function (evt) {
              const lossYear = evt.target.value;
              const currentQuery = getNewQuery(router, lossYearKey, lossYear);
              const sortDsc = currentQuery[lossMonthKey] || lossYear;
              currentQuery.query["sortedBy"] = sortDsc ? "loss-dsc" : undefined;

              pushNewQuery(router, currentQuery);
            }}
          >
            <option value="" aria-label="År ikke valgt">
              {intl.formatMessage({
                defaultMessage: "År",
                description: "Filter for tapsdato",
              })}
            </option>
            {range(1939, 1946).map(function (year: number) {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            className="sr-only"
            htmlFor="taptMaaned"
            aria-label="Filtrer på måned skipet ble tapt"
          >
            Måned skipet ble tapt
          </label>
          <select
            className="font-semibold py-2.5 pl-3 pr-7 text-sm rounded-lg border-darkblue focus:ring-darkblue-60 focus:border-darkblue-60 focus:box-shadow-transparent"
            id="taptMaaned"
            defaultValue={lossMonth}
            onChange={function (evt) {
              const currentQuery = router.query;
              const lossMonth = evt.target.value;
              const newQuery = getNewQuery(router, lossMonthKey, lossMonth);
              const sortDsc = currentQuery[lossYearKey] || lossMonth;
              newQuery.query["sortedBy"] = sortDsc ? "loss-dsc" : undefined;
              pushNewQuery(router, newQuery);
            }}
          >
            <option value="" aria-label="Måned ikke valgt">
              {intl.formatMessage({
                defaultMessage: "Måned",
                description: "Filter for tapsdato",
              })}
            </option>
            {range(1, 13).map(function (month: number) {
              return (
                <option key={month} value={month}>
                  {months[`month.${month}`]
                    ? intl.formatMessage(months[`month.${month}`])
                    : month}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </form>
  );
};
