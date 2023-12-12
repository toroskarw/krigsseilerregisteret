import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { useMediaQuery } from "@react-hook/media-query";
import { IShipwreck } from "domain/shipwreck";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { shipwreckTabIndexToSubrouteMap } from "util/router";
import { ShipwreckFactbox } from "./ShipwreckFactbox";
import { CrewList, Diary, SeaExplanation } from "./tabs";
import { TopComment } from "./TopComment";

interface ShipwreckProfileProps {
  shipwreck: IShipwreck;
  tabIndex: number;
}

export const ShipwreckProfile = ({
  shipwreck,
  tabIndex,
}: ShipwreckProfileProps) => {
  const [isTabOpen, setIsTabOpen] = useState(tabIndex == 0 ? false : true);
  const [currentTab, setCurrentTab] = useState(tabIndex);
  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");
  const intl = useIntl();
  const router = useRouter();

  // Get the shipwreck ID part of URL to use as root for tab subrouting
  let shipwreckId: string;
  if (Array.isArray(router.query.slug)) shipwreckId = router.query.slug[0];
  else shipwreckId = router.query.slug;

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    if (tabIndex == 0) router.push(shipwreckId);
  }, []);

  const tabChangeHandler = (tabIndex: number) => {
    // Scroll to top on mobile when switching to tabs from main
    if (tabIndex > 0 && !isDesktopWidth) window.scrollTo(0, 0);

    tabIndex > 0 ? setIsTabOpen(true) : setIsTabOpen(false);
    setCurrentTab(tabIndex);
    // Update subroute to match current tab
    router.push(
      shipwreckId + "/" + shipwreckTabIndexToSubrouteMap.get(tabIndex),
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

  const counts = {
    crew: shipwreck.crew.length,
  };

  const tabTitles = defineMessages({
    crew: {
      defaultMessage: "Mannskap ({count})",
      description: "",
    },
    diary: {
      defaultMessage: "Utdrag fra dekksdagbok",
      description: "",
    },
  });

  return (
    <div>
      <Tabs onChange={tabChangeHandler} index={currentTab}>
        <div className={isTabOpen ? "hidden desktop:block" : ""}>
          <TopComment />
          <ShipwreckFactbox shipwreck={shipwreck} />
        </div>

        <div className="hidden px-36 mt-12 desktop:block">
          <div className="flex mx-auto max-w-5xl border-b border-purple-30">
            <div className="flex text-lg">
              <TabList className="flex items-center space-x-3">
                <Tab index={0} className={desktopTabStyle(0)}>
                  <FormattedMessage
                    defaultMessage="Sjøforklaring"
                    description=""
                  />
                </Tab>
                <Tab index={1} className={desktopTabStyle(1)}>
                  {intl.formatMessage(tabTitles.diary)}
                </Tab>
                <Tab index={2} className={desktopTabStyle(2)}>
                  {intl.formatMessage(tabTitles.crew, {
                    count: counts.crew,
                  })}
                </Tab>
              </TabList>
            </div>
          </div>
        </div>

        <TabPanels>
          <TabPanel>
            <SeaExplanation shipwreck={shipwreck} />
          </TabPanel>
          <TabPanel>
            <Diary shipwreck={shipwreck} title={tabTitles.diary} />
          </TabPanel>
          <TabPanel>
            <CrewList
              crewList={shipwreck.crew.sort((a, b) =>
                a.sortValue.localeCompare(b.sortValue, "nb-no")
              )}
              shipwreck={shipwreck}
              title={tabTitles.crew}
              count={counts.crew}
            />
          </TabPanel>
        </TabPanels>

        <div className={isTabOpen ? "hidden" : "mt-9"}>
          <TabList className="px-5 mb-16 font-semibold tablet:px-10 desktop:hidden">
            <Tab
              index={1}
              className="flex justify-between items-center py-5 px-5 w-full text-left border-t border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.diary)}
              </h2>
            </Tab>
            <Tab
              index={2}
              className="flex justify-between items-center py-5 px-5 w-full border-t border-b border-darkblue-30"
            >
              <h2 className="text-2xl">
                {intl.formatMessage(tabTitles.crew, {
                  count: counts.crew,
                })}
              </h2>
            </Tab>
          </TabList>
        </div>
      </Tabs>
    </div>
  );
};
