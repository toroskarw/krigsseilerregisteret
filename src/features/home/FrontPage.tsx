import { ChevronLeftIcon, ChevronRightIcon } from "components/Icons";
import { Link } from "components/Link";
import { SelectSearch } from "components/SelectSearch";
import { IImage } from "domain/image";
import { IStatistics } from "domain/statistics";
import { Children, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import paths from "util/paths";
import { MapLink, Statistics } from ".";

export interface FrontPageProps {
  statistics: IStatistics;
  warsailorOfTheMonth: {
    id: number;
    image: IImage | null;
    teaserText: string;
    seafarerName: string | null;
  } | null;
  featuredContent: Array<{
    id: number;
    image: IImage | null;
    title: string;
    link: string;
  }>;
}

export const FrontPage = ({
  statistics,
  warsailorOfTheMonth,
  featuredContent,
}: FrontPageProps) => {
  const intl = useIntl();

  const readMoreAbout = intl.formatMessage({
    defaultMessage: "Les mer om",
    description: "frontpage warsailor",
  });

  const readMore = intl.formatMessage({
    defaultMessage: "Les mer",
    description: "frontpage warsailor",
  });

  return (
    <>
      <div className="relative">
        <div className="flex justify-center h-screen bg-scroll bg-center bg-no-repeat bg-cover bg-hero-1 tablet:bg-top desktop:bg-center max-h-144">
          <div className="absolute top-20 flex-col px-5 mx-auto w-full h-auto tablet:top-1/3 tablet:min-w-3/5 tablet:max-w-2xl tablet:px-0 desktop:max-w-4xl">
            <h1 className="p-4 mb-2 text-2xl font-medium text-center text-white tablet:mb-4 desktop:text-3xl">
              <span className="sr-only">Krigsseilerregisteret</span>
              <FormattedMessage
                description="Front page description"
                defaultMessage="Et digitalt monument som dokumenterer krigsseilerne"
              />
            </h1>
            <div className="mx-auto max-w-sm tablet:max-w-lg">
              <SelectSearch />
            </div>
          </div>
        </div>
        <div className="tablet:w-full tablet:mx-auto tablet:flex tablet:inset-x-0 tablet:-bottom-32 tablet:justify-center tablet:absolute">
          <div className="flex flex-col px-5 tablet:flex-row tablet:space-x-5 tablet:items-center">
            <div className="relative -top-32 mx-auto w-full tablet:top-0 tablet:w-80">
              <Statistics statistics={statistics} type="seafarer" />
            </div>
            <div className="mx-auto -mt-28 w-full tablet:m-0 tablet:w-80">
              <Statistics statistics={statistics} type="ship" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 tablet:mt-44">
        <div className="space-y-6">
          <div className="px-4 desktop:px-0 flex flex-col gap-4 desktop:flex-row desktop:justify-center">
            {warsailorOfTheMonth ? (
              <div>
                <div className="relative">
                  <Link
                    to={paths.warSailorOfTheMonthPage(warsailorOfTheMonth.id)}
                    className="no-underline"
                  >
                    <div className="text-center text-xl relative">
                      <div className="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-full">
                        <div className="w-10/12 tablet:w-96 m-auto">
                          <h3 className="text-sm mb-2 desktop:text-xl">
                            <FormattedMessage
                              defaultMessage="MÅNEDENS KRIGSSEILER"
                              description="Månedens krigsseiler forside"
                            />
                          </h3>
                          <p
                            className="m-auto text-xl desktop:text-3xl mb-4"
                            style={{ minHeight: "130px" }}
                          >
                            {warsailorOfTheMonth.teaserText}
                          </p>

                          <p className="border-white text-sm desktop:text-lg px-8 py-4 border-2 inline m-auto hover:bg-white hover:text-purple hover:underline">
                            {readMoreAbout +
                              " " +
                              warsailorOfTheMonth.seafarerName}
                          </p>
                        </div>
                      </div>
                      <div className="bg-purple w-auto  tablet:w-128 desktop:w-144 desktop:h-144 mx-auto rounded-sm">
                        {warsailorOfTheMonth.image ? (
                          <div
                            className="w-auto h-100  desktop:w-144 desktop:h-144 opacity-25 bg-cover bg-no-repeat"
                            style={{
                              backgroundImage: `url(${warsailorOfTheMonth.image.versions["gallery-preview"]})`,
                            }}
                          ></div>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="mt-2 w-auto tablet:w-128 desktop:w-144 mx-auto">
                  <Link
                    to={paths.warSailorOfTheMonthArchive()}
                    className="desktop:h-24 no-underline bg-gray-20   px-6 py-4 tablet:py-8 text-lg block hover:bg-gray-30 hover:underline"
                  >
                    <span className="flex items-center justify-center text-sm tablet:text-lg">
                      <FormattedMessage
                        defaultMessage="Se oversikt over alle månedens krigsseilere"
                        description="Link to war sailor of the month archive from frontpage"
                      />
                      <span className="ml-4">
                        <ChevronRightIcon width="7" height="12" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ) : null}
            {featuredContent.length > 0 ? (
              <div className="tablet:128:w-128 desktop:w-144 ">
                <FeaturedContent>
                  {featuredContent.map((featuredContent) => {
                    return (
                      <div key={featuredContent.id}>
                        <div className="relative">
                          <Link
                            to={featuredContent.link}
                            className="no-underline"
                          >
                            <div className="text-center text-sm relative ">
                              <div className="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-10/12 tablet:w-96">
                                <h3 className="text-sm mb-2 desktop:text-xl">
                                  <FormattedMessage
                                    defaultMessage="ARTIKKEL"
                                    description="Artikkel forside"
                                  />
                                </h3>
                                <p
                                  className="mx-auto mb-4 text-xl desktop:text-3xl"
                                  style={{ minHeight: "130px" }}
                                >
                                  {featuredContent.title}
                                </p>

                                <p className="border-white px-8 py-4 border-2 inline m-auto hover:bg-white hover:text-purple hover:underline desktop:text-lg">
                                  {readMore + " "}
                                  <span className="sr-only">
                                    {featuredContent.title}
                                  </span>
                                </p>
                              </div>
                              <div className="bg-purple h-100 tablet:w-128 desktop:w-144 desktop:h-144 mx-auto rounded-sm">
                                {featuredContent.image ? (
                                  <div
                                    className="w-auto  h-100 tablet:h-128 desktop:w-144 desktop:h-144 opacity-25 bg-cover bg-no-repeat"
                                    style={{
                                      backgroundImage: `url(${featuredContent.image.versions["gallery-preview"]})`,
                                    }}
                                  ></div>
                                ) : null}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </FeaturedContent>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center items-center">
          {/* MapLink section */}
          <div className="px-5 pt-14 pb-8">
            <h2 className="mb-2 text-center">
              <FormattedMessage
                defaultMessage="Kart over forlis"
                description="Map of shipwrecks"
              />
            </h2>
            <div className="text-center">
              <FormattedMessage
                defaultMessage="Se hvor norske skip ble senket og lær mer om dem. Kartet viser også utenlandske skip hvor norske krigsseilere var påmønstret"
                description="Text under 'Kart over forlis'"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 mb-20">
          <div className="desktop:px-12 desktop:max-w-7xl desktop:mx-auto">
            <MapLink />
          </div>
        </div>
      </div>
    </>
  );
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const FeaturedContent: React.FC = (props) => {
  const numberOfSlides = Children.count(props.children);

  const [swiper, setSwiper] = useState<SwiperClass>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(
    getRandomInt(0, numberOfSlides)
  );

  const nextSlideIndex =
    activeSlideIndex + 1 == numberOfSlides ? 0 : activeSlideIndex + 1;

  const previousSlideIndex =
    activeSlideIndex - 1 == -1 ? numberOfSlides - 1 : activeSlideIndex - 1;

  return (
    <div className="space-y-2">
      <Swiper
        initialSlide={activeSlideIndex}
        autoplay={{
          delay: 75500,
        }}
        effect="fade"
        modules={[EffectFade, Autoplay]}
        slidesPerView={1}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        onSlideChange={(slider) => {
          setActiveSlideIndex(slider.activeIndex);
        }}
      >
        {Children.map(props.children, (child, index) => {
          return <SwiperSlide key={index}>{child}</SwiperSlide>;
        })}
      </Swiper>
      <div
        key={activeSlideIndex}
        className="bg-gray-20 w-auto tablet:w-128 desktop:w-144 mx-auto tablet:py-4 desktop:h-24"
      >
        <div className="flex flex-row gap-3 justify-between">
          <button
            className="w-12 tablet:pl-0 tablet:w-12 tablet:h-16 flex justify-center items-center"
            onClick={() => {
              swiper.slideTo(previousSlideIndex);
            }}
          >
            <span className="sr-only">
              Vis lenke til artikkel {previousSlideIndex}
            </span>
            <ChevronLeftIcon width="7" height="12" />
          </button>
          <div className="flex flex-row  gap-3 justify-center items-center">
            {swiper &&
              Children.map(props.children, (_, index) => {
                const className =
                  swiper.activeIndex == index
                    ? "w-2 h-2 tablet:w-4 tablet:h-4 rounded bg-darkblue-60"
                    : "w-2 h-2 tablet:w-4 tablet:h-4 rounded bg-darkblue";
                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => {
                      swiper.slideTo(index);
                    }}
                  >
                    <span className="sr-only">
                      Vis lenke til artikkel {index}
                    </span>
                  </button>
                );
              })}
          </div>
          <button
            className="w-12 h-16 flex justify-center items-center"
            onClick={() => {
              swiper.slideTo(nextSlideIndex);
            }}
          >
            <span className="sr-only">
              Vis lenke til artikkel {nextSlideIndex}
            </span>
            <ChevronRightIcon width="7" height="12" />
          </button>
        </div>
      </div>
    </div>
  );
};
