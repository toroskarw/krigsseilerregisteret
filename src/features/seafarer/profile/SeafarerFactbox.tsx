import { FactboxContent } from "components/Factbox";
import { Flag } from "components/Flag";
import { Link } from "components/Link";
import { ICounty } from "domain/county";
import { ISeafarer } from "domain/seafarer";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { getFormattedDate } from "util/format";
import {
  getFormattedCauseOfDeath,
  getFormattedGender,
  getValueList,
} from "./util";
import ClampLines from "react-clamp-lines";

export interface FactboxProps {
  seafarer: ISeafarer;
  nationalityDisplayName: string;
}

export const SeafarerFactbox = ({
  seafarer,
  nationalityDisplayName,
}: FactboxProps) => {
  const intl = useIntl();
  return (
    <div className="py-9 px-5 bg-purple-30 tablet:px-10 desktop:px-36">
      <div className="py-9 px-5 bg-white tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
        <div className="flex justify-between items-start mb-7 tablet:justify-start">
          <h1 className="tablet:mr-4">{seafarer.displayName}</h1>
          <div className="pt-1">
            <Flag countryCode={seafarer.nationalityShort} />
          </div>
        </div>
        <FactboxContent
          type="seafarer"
          facts={[
            {
              key: "birth",
              label: <FormattedMessage defaultMessage="Født" description="" />,
              value: getFormattedDate(
                seafarer.dateOfBirth.year,
                seafarer.dateOfBirth.month,
                seafarer.dateOfBirth.day
              ),
            },
            {
              key: "death",
              label: <FormattedMessage defaultMessage="Død" description="" />,
              value: seafarer.causeOfDeath ? (
                <>
                  <div>
                    {getFormattedDate(
                      seafarer.dateOfDeath.year,
                      seafarer.dateOfDeath.month,
                      seafarer.dateOfDeath.day
                    )}
                  </div>
                  <div>
                    <FormattedMessage
                      defaultMessage="Årsak"
                      description="Cause of death"
                    />
                    :{" "}
                    {intl.formatMessage(
                      getFormattedCauseOfDeath(seafarer.causeOfDeath)
                    )}
                  </div>
                </>
              ) : (
                getFormattedDate(
                  seafarer.dateOfDeath.year,
                  seafarer.dateOfDeath.month,
                  seafarer.dateOfDeath.day
                )
              ),
            },
            {
              key: "parents",
              label: (
                <FormattedMessage defaultMessage="Foreldre" description="" />
              ),
              value: seafarer.parents ? (
                <ClampLines
                  text={seafarer.parents}
                  id="sailor-parents"
                  lines={4}
                  ellipsis="..."
                  moreText={intl.formatMessage({
                    defaultMessage: "Utvid resten av teksten",
                    description: "Les mer om sjømanns foreldre",
                  })}
                  lessText={intl.formatMessage({
                    defaultMessage: "Lukk utvidet tekst",
                    description: "Les mer om sjømanns foreldre",
                  })}
                  className="krigsseilerregisteret-clamplines"
                  innerElement="p"
                />
              ) : undefined,
            },
            {
              key: "nickname",
              label: (
                <FormattedMessage defaultMessage="Kallenavn" description="" />
              ),
              value: seafarer.nickName,
            },
            {
              key: "sailorRecords",
              label: (
                <FormattedMessage defaultMessage="Matrosrulle" description="" />
              ),
              value: seafarer.sailorRecords,
            },
            {
              key: "annotationRecords",
              label: (
                <FormattedMessage
                  defaultMessage="Annotasjonsrulle"
                  description=""
                />
              ),
              value: seafarer.annotationRecords,
            },
            {
              key: "gender",
              label: <FormattedMessage defaultMessage="Kjønn" description="" />,
              value: getFormattedGender(seafarer.gender),
            },
            {
              key: "nationality",
              label: (
                <FormattedMessage
                  defaultMessage="Nasjonalitet"
                  description=""
                />
              ),
              value: nationalityDisplayName,
            },
            {
              key: "placeOfBirth",
              label: (
                <FormattedMessage defaultMessage="Fødested" description="" />
              ),
              value: seafarer.placeOfBirth,
            },
            {
              key: "residence",
              label: (
                <FormattedMessage defaultMessage="Bosted" description="" />
              ),
              value: seafarer.residence,
            },
            {
              key: "county",
              label: (
                <FormattedMessage
                  defaultMessage="Relasjon til fylke"
                  description=""
                />
              ),
              value:
                seafarer.counties && seafarer.counties.length > 0
                  ? seafarer.counties.map((county: ICounty) => {
                      return <div key={county.id}>{county.displayName}</div>;
                    })
                  : null,
            },
            {
              key: "services",
              label: (
                <FormattedMessage
                  defaultMessage="Flåtetilhørighet"
                  description=""
                />
              ),
              value: getValueList(seafarer.services),
            },
            {
              key: "enlistmentDistricts",
              label: (
                <FormattedMessage
                  defaultMessage="Tilknyttet mønstringsdistrikt"
                  description=""
                />
              ),
              value: getValueList(seafarer.enlistmentDistricts),
            },
            {
              key: "positions",
              label: (
                <FormattedMessage
                  defaultMessage="Har stillinger"
                  description=""
                />
              ),
              value: getValueList(seafarer.positions),
            },
            {
              key: "shippingCompanies",
              label: (
                <FormattedMessage
                  defaultMessage="Har seilt for rederi"
                  description=""
                />
              ),
              value: getValueList(seafarer.shippingCompanies),
            },
            {
              key: "education",
              label: (
                <FormattedMessage
                  defaultMessage="Kjente utdannelser"
                  description=""
                />
              ),
              value: getValueList(seafarer.education),
            },
            {
              key: "sailorsClub",
              label: (
                <FormattedMessage
                  defaultMessage="Medlem av sjømannsforening"
                  description=""
                />
              ),
              value: getValueList(seafarer.sailorsClub),
            },
            {
              key: "shipwreck",
              label: (
                <FormattedMessage
                  defaultMessage="Sjøforklaring 1939 - 1945"
                  description=""
                />
              ),
              value: getValueList(seafarer.shipwreck),
            },

            {
              key: "tidsskriftetKrigsseileren",
              label: (
                <FormattedMessage
                  defaultMessage="Omtalt i utgave av Krigsseileren"
                  description="Mentioned in issue of Krigsseileren"
                />
              ),
              value: getValueList(seafarer.tidsskriftetKrigsseileren),
            },

            {
              key: 16,
              label: <FormattedMessage defaultMessage="Annet" description="" />,
              value:
                seafarer.other.length > 0
                  ? seafarer.other.map((val) => {
                      if (val.path) {
                        return (
                          <div key={val.key}>
                            <Link to={val.path}>
                              {intl.formatMessage(val.message)}
                            </Link>
                          </div>
                        );
                      } else
                        return (
                          <div key={val.key}>
                            {intl.formatMessage(val.message)}
                          </div>
                        );
                    })
                  : null,
            },
          ]}
        />
      </div>
    </div>
  );
};
