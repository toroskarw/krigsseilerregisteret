import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { useMediaQuery } from "@react-hook/media-query";
import { nationalities } from "domain/messages/nationality";
import { ISeafarer } from "domain/seafarer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { seafarerTabIndexToSubrouteMap } from "util/router";
import { SeafarerFactbox } from "./SeafarerFactbox";
import {
  Awards,
  Documents,
  Enlistments,
  Images,
  PrimaryInformation,
} from "./tabs";
import { TopComment } from "./TopComment";
import { PlacesOfService } from "./tabs/PlacesOfService";

interface SeafarerProps {
  seafarer: ISeafarer;
  tabIndex: number;
}

export const SeafarerProfile = ({ seafarer, tabIndex }: SeafarerProps) => {
  const [isTabOpen, setIsTabOpen] = useState(tabIndex == 0 ? false : true);
  const [currentTab, setCurrentTab] = useState(tabIndex);
  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");
  const intl = useIntl();
  const router = useRouter();

  const nationalityDisplayName =
    seafarer.nationalityShort &&
    nationalities[seafarer.nationalityShort.toLowerCase()]
      ? intl.formatMessage(
          nationalities[seafarer.nationalityShort.toLowerCase()]
        )
      : seafarer.nationalityShort;

  // Get the seafarer ID part of URL to use as root for tab subrouting
  let seafarerId: string;
  if (Array.isArray(router.query.slug)) seafarerId = router.query.slug[0];
  else seafarerId = router.query.slug;

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    if (tabIndex == 0) router.push(seafarerId);
  }, []);

  const tabChangeHandler = (tabIndex: number) => {
    // Scroll to top on mobile when switching to tabs from main
    if (tabIndex > 0 && !isDesktopWidth) window.scrollTo(0, 0);

    tabIndex > 0 ? setIsTabOpen(true) : setIsTabOpen(false);
    setCurrentTab(tabIndex);
    // Update subroute to match current tab
    router.push(
      seafarerId + "/" + seafarerTabIndexToSubrouteMap.get(tabIndex),
      undefined,
      {
        shallow: true,
      }
    );
  };

  const desktopTabStyle = (index: number) => {
    return `px-4 pt-2 pb-2 font-semibold ${
      currentTab == index ? "text-white bg-purple" : ""
    }`;
  };

  const regularEnlistments = seafarer.enlistments.filter(
    (enlistment) => enlistment.isRegularEnlistment
  );
  const placeOfServiceEnlistments = seafarer.enlistments.filter(
    (enlistment) => !enlistment.isRegularEnlistment
  );
  const counts = {
    enlistments: regularEnlistments.length,
    placeOfServiceEnlistments: placeOfServiceEnlistments.length,
    awards: seafarer.awards.length,
    images: seafarer.images.length,
    documents: seafarer.documents.length,
  };

  const tabTitles = defineMessages({
    enlistments: {
      defaultMessage: "Mønstringer ({count})",
      description: "",
    },
    placeOfServiceEnlistments: {
      defaultMessage: "Tjenestesteder ({count})",
      description: "",
    },
    awards: {
      defaultMessage: "Utmerkelser ({count})",
      description: "",
    },
    images: {
      defaultMessage: "Bilder ({count})",
      description: "",
    },
    documents: {
      defaultMessage: "Dokumenter ({count})",
      description: "",
    },
  });

  return (
    <div>
      <Tabs onChange={tabChangeHandler} index={currentTab}>
        <div className={isTabOpen ? "hidden desktop:block" : ""}>
          <TopComment />

          <SeafarerFactbox
            seafarer={seafarer}
            nationalityDisplayName={nationalityDisplayName}
          />
        </div>

        <div className="hidden px-36 mt-12 desktop:block">
          <div className="flex mx-auto max-w-5xl border-b border-purple-30">
            <div className="flex text-lg">
              <TabList className="flex items-center space-x-3">
                <Tab index={0} className={desktopTabStyle(0)}>
                  <FormattedMessage
                    defaultMessage="Opplysninger"
                    description="Opplysninger"
                  />
                </Tab>
                <Tab index={1} className={desktopTabStyle(1)}>
                  {intl.formatMessage(tabTitles.enlistments, {
                    count: counts.enlistments,
                  })}
                </Tab>
                {counts.placeOfServiceEnlistments > 0 ? (
                  <Tab index={2} className={desktopTabStyle(2)}>
                    {intl.formatMessage(tabTitles.placeOfServiceEnlistments, {
                      count: counts.placeOfServiceEnlistments,
                    })}
                  </Tab>
                ) : null}

                <Tab index={3} className={desktopTabStyle(3)}>
                  {intl.formatMessage(tabTitles.awards, {
                    count: counts.awards,
                  })}
                </Tab>
                <Tab index={4} className={desktopTabStyle(4)}>
                  {intl.formatMessage(tabTitles.images, {
                    count: counts.images,
                  })}
                </Tab>
                <Tab index={5} className={desktopTabStyle(5)}>
                  {intl.formatMessage(tabTitles.documents, {
                    count: counts.documents,
                  })}
                </Tab>
              </TabList>
            </div>
          </div>
        </div>

        <TabPanels>
          <TabPanel>
            <PrimaryInformation seafarer={seafarer} />
          </TabPanel>
          <TabPanel>
            <Enlistments
              title={tabTitles.enlistments}
              count={counts.enlistments}
              enlistments={regularEnlistments}
            />
          </TabPanel>

          <TabPanel>
            <PlacesOfService
              title={tabTitles.placeOfServiceEnlistments}
              count={counts.placeOfServiceEnlistments}
              enlistments={placeOfServiceEnlistments}
            />
          </TabPanel>

          <TabPanel>
            <Awards
              title={tabTitles.awards}
              count={counts.awards}
              awards={seafarer.awards}
            />
          </TabPanel>
          <TabPanel>
            <Images
              title={tabTitles.images}
              count={counts.images}
              images={seafarer.images}
            />
          </TabPanel>
          <TabPanel>
            <Documents
              title={tabTitles.documents}
              count={counts.documents}
              documents={seafarer.documents}
            />
          </TabPanel>
        </TabPanels>

        <div className={isTabOpen ? "hidden" : ""}>
          <TabList className="px-5 mb-16 font-semibold tablet:px-10 desktop:hidden">
            <Tab
              index={1}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.enlistments, {
                  count: counts.enlistments,
                })}
              </h2>
              {/* TODO: Color of chevron should be darkblue. Refactor chevron to top level SVG component (since it is also used in mini-pagination) */}
              <Image src="/images/chevron-right.svg" height={21} width={13} />
            </Tab>
            {counts.placeOfServiceEnlistments > 0 ? (
              <Tab
                index={2}
                className="flex justify-between items-center py-5 px-5 w-full border-t border-darkblue-30"
              >
                <h2 className="text-2xl">
                  {intl.formatMessage(tabTitles.placeOfServiceEnlistments, {
                    count: counts.placeOfServiceEnlistments,
                  })}
                </h2>
                {/* TODO: Color of chevron should be darkblue. Refactor chevron to top level SVG component (since it is also used in mini-pagination) */}
                <Image src="/images/chevron-right.svg" height={21} width={13} />
              </Tab>
            ) : null}

            <Tab
              index={3}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.awards, {
                  count: counts.awards,
                })}
              </h2>
              <Image src="/images/chevron-right.svg" height={21} width={13} />
            </Tab>
            <Tab
              index={4}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.images, {
                  count: counts.images,
                })}
              </h2>
              <Image src="/images/chevron-right.svg" height={21} width={13} />
            </Tab>
            <Tab
              index={5}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-b border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.documents, {
                  count: counts.documents,
                })}
              </h2>
              <Image src="/images/chevron-right.svg" height={21} width={13} />
            </Tab>
          </TabList>
        </div>
      </Tabs>
    </div>
  );
};
