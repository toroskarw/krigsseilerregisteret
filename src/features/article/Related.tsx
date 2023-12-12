import { Accordion } from "@reach/accordion";
import { IColumn } from "components/Archive";
import { RelatedArchive } from "components/Archive/RelatedArchive";
import {
  Alphabet,
  NationalityFacet,
  ParticipatedInWar,
} from "components/Facets";
import { RelatedTypes } from "components/Facets/RelatedTypes";
import { ArrowIcon } from "components/Icons";
import { Link } from "components/Link";
import { ContentType } from "domain/content";
import { IRelated } from "domain/related";
import * as React from "react";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { getFormattedDate } from "util/format";
import paths from "util/paths";

interface RelatedProps {
  title: string;
  subTitle?: string;
  archive: IRelated;
  count?: number;
}

const columns: Array<IColumn> = [
  {
    id: "name",
    className: "px-2 rounded-tl-xl tablet:py-8 tablet:pl-7 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="Navn"
        description="Participants archive: Name"
      />
    ),
  },
  {
    id: "details",
    className: "px-2 rounded-tr-xl tablet:px-4 desktop:w-3/12 ",
    title: (
      <FormattedMessage
        defaultMessage="Detaljer"
        description="Participants archive: Details"
      />
    ),
  },
];

export const Related = ({ title, subTitle, archive, count }: RelatedProps) => {
  const intl = useIntl();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="mt-9 pb-6">
        <Accordion
          className={`py-5 px-5 font-semibold border-t border-b border-darkblue-30 grid grid-cols-6 items-center ${
            isOpen ? "bg-beige-30" : ""
          }`}
          onClick={(evt) => {
            evt.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          <div className="col-start-1 col-end-6">
            <div className="text-lg">
              <FormattedMessage
                defaultMessage="{title} ({total})"
                description=""
                values={{
                  total: count,
                  title: title,
                }}
              />
            </div>

            <div
              className={`${
                !subTitle ? "desktop: tablet: hidden" : ""
              } hidden desktop:text-xs desktop:block tablet:text-xs tablet:block`}
            >
              {subTitle ? subTitle : ""}
            </div>
          </div>
          <div className="flex col-start-6 place-content-end ">
            <ArrowIcon direction={isOpen ? "up" : "down"} />
          </div>
        </Accordion>
      </nav>

      {isOpen && (
        <div>
          <RelatedArchive
            columns={columns}
            archive={archive}
            onRenderFilters={() => {
              return [
                <Alphabet
                  key="alphabet"
                  facet={archive.aggregations.byFirstLetter}
                />,
                <ParticipatedInWar
                  key="c"
                  facet={archive.aggregations.participatedInWar}
                />,
                <NationalityFacet
                  key="nationality"
                  facet={archive.aggregations.nationality}
                />,
                <RelatedTypes key="types" facet={archive.aggregations.type} />,
              ];
            }}
            onRenderRow={(related, className) => {
              return (
                <tr key={related.id} className={className}>
                  <td className="py-3 pl-4 break-words tablet:break-normal tablet:pl-7">
                    <Link to={related.path}>{related.displayName}</Link>
                  </td>
                  <td className="py-3 px-2 break-words tablet:break-normal tablet:px-4">
                    {related.type === ContentType.SHIP ? (
                      <FormattedMessage
                        defaultMessage="Bygget i år {buildYear}"
                        description="Built year"
                        values={{ buildYear: related.buildYear }}
                      />
                    ) : (
                      //FIXME: Ta høyde for manglende verdier
                      <FormattedMessage
                        defaultMessage="Født {birthDate} i {place}"
                        description="Born {birthDate} in {place}"
                        values={{
                          birthDate: getFormattedDate(
                            related.birthYear,
                            related.birthMonth,
                            related.birthDay
                          ),
                          place: related.placeOfBirth,
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            }}
            pathResolver={paths.relatedArchive}
            i18n={{
              searchBoxPlaceholderText: intl.formatMessage({
                defaultMessage: "Søk i Krigsseilerregisteret",
                description: "Ship archive page search input placeholder text",
              }),
            }}
          />
        </div>
      )}
    </div>
  );
};
