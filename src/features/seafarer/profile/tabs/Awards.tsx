import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import { BackToProfile } from "components/BackToProfile";
import { ArrowIcon } from "components/Icons";
import { ImageGallery } from "components/ImageGallery";
import { Link } from "components/Link";
import { TabSection } from "components/TabSection";
import { IAward } from "domain/award";
import React, { useState } from "react";
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl";
import { fetchAwardStatistics } from "util/client";
import { getFormattedGranularDate } from "util/format";
import paths from "util/paths";
import { backToProfileMsg } from "../../messages";

export interface AwardsProps {
  awards: IAward[];
  count: number;
  title: MessageDescriptor;
}

export const Awards = ({ awards, count, title }: AwardsProps) => {
  const [accordionIndices, setAccordionIndices] = useState([]);
  const [numberOfReceivers, setNumberOfReceivers] = useState(new Map());
  const delay = 300;
  const intl = useIntl();

  const fetchData = async (id: number) => {
    if (id > 0) {
      const statistics = await fetchAwardStatistics(id);
      numberOfReceivers.set(id, statistics.numberOfReceivers);
      setNumberOfReceivers(numberOfReceivers);
    }
  };

  async function toggleAccordionItem(toggledIndex: number) {
    if (toggledIndex > 0 && !numberOfReceivers.has(toggledIndex)) {
      fetchData(toggledIndex);
    }
    setTimeout(() => {
      if (accordionIndices.includes(toggledIndex)) {
        setAccordionIndices(
          accordionIndices.filter(
            (currentIndex) => currentIndex !== toggledIndex
          )
        );
      } else {
        setAccordionIndices([...accordionIndices, toggledIndex].sort());
      }
    }, delay);
  }

  return (
    <TabSection>
      <BackToProfile message={backToProfileMsg} />
      <div className="mt-8 desktop:hidden">
        <h2 className="text-2xl font-semibold">
          {intl.formatMessage(title, { count: count })}
        </h2>
      </div>
      <Accordion
        className="w-full"
        index={accordionIndices}
        onChange={toggleAccordionItem}
      >
        <ul className="mt-6 desktop:mt-0">
          {awards.map((award: IAward) => {
            const image = award.images ? award.images[0] : null;
            return (
              <li
                key={award.id}
                className="mb-5 tablet:flex bg-gray-20 hover:bg-beige"
              >
                {image && (
                  <div className="content-center grid tablet:w-44">
                    {award.images && (
                      <>
                        <ImageGallery
                          images={award.images}
                          frontPageImage
                          count={award.images.length}
                          showText
                          thumbnailClassName="max-h-128 w-auto  tablet:object-cover"
                          galleryClassName=""
                        />
                      </>
                    )}
                  </div>
                )}

                <AccordionItem className="w-full" index={award.id}>
                  <AccordionButton className="w-full text-left">
                    <div className="p-4 tablet:pt-6 tablet:pl-7 tablet:flex-grow group">
                      <h2 className="flex items-center text-xl font-semibold group-hover:underline tablet:text-2xl">
                        <span className="mr-4">{award.displayName} </span>
                        <span className="fill-current group-hover:visible visible">
                          <ArrowIcon
                            direction={
                              accordionIndices.includes(award.id)
                                ? "up"
                                : "down"
                            }
                          />
                        </span>
                      </h2>

                      <div className="tablet:flex tablet:items-baseline tablet:space-x-12">
                        <div>
                          <h3 className="mt-4 text-sm font-semibold">
                            <FormattedMessage
                              defaultMessage="Tildelingsdato"
                              description=""
                            />
                          </h3>
                          <p className="text-sm">
                            {getFormattedGranularDate(award.receivedDate) ?? (
                              <FormattedMessage
                                defaultMessage="Ukjent"
                                description=""
                              />
                            )}
                          </p>
                        </div>
                        {award.justification && (
                          <div>
                            <h3 className="mt-3 text-sm font-semibold">
                              <FormattedMessage
                                defaultMessage="Begrunnelse"
                                description=""
                              />
                            </h3>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: award.justification,
                              }}
                              className="space-y-1 text-sm "
                            />
                          </div>
                        )}
                      </div>

                      <AccordionPanel>
                        <div className="flex flex-col mt-5 text-sm">
                          {/* // TODO Formatering av meldingen under: {number, plural, =0{Vi har ikke registrert at noen har mottatt denne utmerkelsen i våre arkiver} one{Vi har i vårt arkiv registrert én mottaker av denne utmerkelsen} other{Vi har i vårt arkiv registert # mottakere av denne utmerkelsen.}} */}
                          <FormattedMessage
                            defaultMessage="Vi har i vårt arkiv registrert {recipientCount} mottakere av denne utmerkelsen."
                            description=""
                            values={{
                              recipientCount: numberOfReceivers.get(award.id),
                            }}
                          />
                          <Link to={paths.award(award.id)}>
                            <FormattedMessage
                              defaultMessage="Se mer info om utmerkelsen og oversikt over de mottakerne som vi har registrert."
                              description=""
                            />
                          </Link>
                        </div>

                        {image && accordionIndices.includes(award.id) ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: image.fullText,
                            }}
                            className="mt-4 space-y-2 text-xs tablet:text-mini"
                          />
                        ) : null}
                      </AccordionPanel>
                    </div>
                  </AccordionButton>
                </AccordionItem>
              </li>
            );
          })}
        </ul>
      </Accordion>

      <p className={`${awards.length > 0 ? "mt-9" : "mt-0"} text-sm`}>
        <FormattedMessage
          defaultMessage="Gjennomgang av nye kilder for å dokumentere krigsseilernes historie er et pågående og omfattende arbeid, og det finnes ikke et helhetlig
        register over medaljetildelinger. Informasjon om medaljer vil derfor
        registreres gradvis og være basert på forskjellige kilder. Krigsseilerne
        ble tildelt medaljer både under og etter krigen. Ønsker du mer
        informasjon om dekorasjoner, så vennligst se følgende temaside:"
          description=""
        />{" "}
        <Link to={paths.navigationPage(318238)}>
          <FormattedMessage defaultMessage="Dekorasjoner" description="" />
        </Link>
      </p>
    </TabSection>
  );
};
