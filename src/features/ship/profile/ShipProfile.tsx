import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { useMediaQuery } from "@react-hook/media-query";
import { nationalities } from "domain/messages/nationality";
import { IShip } from "domain/ship";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { shipTabIndexToSubrouteMap } from "util/router";
import { ShipFactbox } from "./ShipFactbox";
import { CrewList, Documents, Effort, Images, Main } from "./tabs";

interface ShipProfileProps {
  ship: IShip;
  tabIndex: number;
}

export const ShipProfile = ({ ship, tabIndex }: ShipProfileProps) => {
  const [isTabOpen, setIsTabOpen] = useState(tabIndex == 0 ? false : true);
  const [currentTab, setCurrentTab] = useState(tabIndex);
  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");
  const intl = useIntl();
  const router = useRouter();

  const nationalityDisplayName =
    ship.nationalityShort && nationalities[ship.nationalityShort.toLowerCase()]
      ? intl.formatMessage(nationalities[ship.nationalityShort.toLowerCase()])
      : ship.nationalityShort;

  // Get the ship ID part of URL to use as root for tab subrouting
  let shipId: string;
  if (Array.isArray(router.query.slug)) shipId = router.query.slug[0];
  else shipId = router.query.slug;

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    if (tabIndex == 0) router.push(shipId);
  }, []);

  const tabChangeHandler = (tabIndex: number) => {
    // Scroll to top on mobile when switching to tabs from main
    if (tabIndex > 0 && !isDesktopWidth) window.scrollTo(0, 0);

    tabIndex > 0 ? setIsTabOpen(true) : setIsTabOpen(false);
    setCurrentTab(tabIndex);
    // Update subroute to match current tab
    router.push(
      shipId + "/" + shipTabIndexToSubrouteMap.get(tabIndex),
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

  const effort = ship.specialMention;

  const counts = {
    images: ship.images.length,
    documents: ship.documents.length,
    effort: ship.specialMention.length,
  };

  const tabTitles = defineMessages({
    enlistments: {
      defaultMessage: "Mannskap",
      description: "",
    },
    personnel: {
      defaultMessage: "Personell",
      description: "Personnel (for ships with show as base = true)",
    },
    images: {
      defaultMessage: "Bilder ({count})",
      description: "",
    },
    documents: {
      defaultMessage: "Dokumenter ({count})",
      description: "",
    },
    effort: {
      defaultMessage: "Innsats ({count})",
      description: "Navigation link text to Effort archive",
    },
  });

  return (
    <div>
      <Tabs onChange={tabChangeHandler} index={currentTab}>
        <div className={isTabOpen ? "hidden desktop:block" : ""}>
          <ShipFactbox
            ship={ship}
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
                    description=""
                  />
                </Tab>
                <Tab index={1} className={desktopTabStyle(1)}>
                  {ship.showAsBase
                    ? intl.formatMessage(tabTitles.personnel)
                    : intl.formatMessage(tabTitles.enlistments)}
                </Tab>

                <Tab index={2} className={desktopTabStyle(2)}>
                  {intl.formatMessage(tabTitles.images, {
                    count: counts.images,
                  })}
                </Tab>
                <Tab index={3} className={desktopTabStyle(3)}>
                  {intl.formatMessage(tabTitles.documents, {
                    count: counts.documents,
                  })}
                </Tab>
                <Tab
                  index={4}
                  className={
                    desktopTabStyle(4) + (counts.effort > 0 ? "" : "hidden")
                  }
                >
                  {intl.formatMessage(tabTitles.effort, {
                    count: counts.effort,
                  })}
                </Tab>
              </TabList>
            </div>
          </div>
        </div>

        <TabPanels>
          <TabPanel>
            <Main ship={ship} />
          </TabPanel>
          <TabPanel>
            <CrewList title={tabTitles.enlistments} shipId={ship.id} />
          </TabPanel>
          <TabPanel>
            <Images
              images={ship.images}
              title={tabTitles.images}
              count={counts.images}
            />
          </TabPanel>
          <TabPanel>
            <Documents
              documents={ship.documents}
              title={tabTitles.documents}
              count={counts.documents}
            />
          </TabPanel>
          <TabPanel>
            <Effort
              effort={effort}
              title={tabTitles.effort}
              count={counts.effort}
            />
          </TabPanel>
        </TabPanels>

        <div className={isTabOpen ? "hidden" : "mt-9"}>
          <TabList className="px-5 mb-16 font-semibold tablet:px-10 desktop:hidden">
            <Tab
              index={1}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.enlistments)}
              </h2>
              {/* TODO: Color of chevron should be darkblue. Refactor chevron to top level SVG component (since it is also used in mini-pagination) */}
              <Image src="/images/chevron-right.svg" height={21} width={13} />
            </Tab>

            <Tab
              index={2}
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
              index={3}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-b border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.documents, {
                  count: counts.documents,
                })}
              </h2>
              <Image src="/images/chevron-right.svg" height={21} width={13} />
            </Tab>
            <Tab
              index={4}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-b border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.effort, {
                  count: counts.effort,
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
