import { ArrowIcon } from "components/Icons";
import { Link } from "components/Link";
import { IArticle } from "domain/article";
import { ContentType } from "domain/content";
import { IImage } from "domain/image";
import { INavigation } from "domain/navigation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import paths from "util/paths";

interface NavigationProps {
  navigation: INavigation;
  selectedYear: string;
}

export const Navigation = ({ navigation, selectedYear }: NavigationProps) => {
  const allFilterValue = "all";
  const [selectedYearFilter, setSelectedYearFilter] = useState(selectedYear);
  const router = useRouter();

  let navigationId: string;
  if (Array.isArray(router.query.slug)) navigationId = router.query.slug[0];
  else navigationId = router.query.slug;

  const yearChangeHandler = (year: string) => {
    setSelectedYearFilter(year);

    // Update subroute to match current tab
    router.push(navigationId + "/" + year, undefined, {
      shallow: true,
    });
  };

  const availableYearFilters = Array.from(
    new Set(
      navigation.subPages
        .map((sp) => sp.timeperiods)
        .flat()
        .map((c) => c.displayName)
    )
  ).sort();

  if (availableYearFilters.length > 0) {
    availableYearFilters.unshift(allFilterValue); // Add "all" to start of array
  }

  const isArticlePage = navigation.subPages[0].type === ContentType.ARTICLE;

  return (
    <>
      <div className="flex-col pt-20 pb-10 bg-purple-10 tablet:py-14 desktop:pb-16 tablet:space-y-8 ">
        <div className="mx-auto max-w-prose px-5">
          <h1 className="font-semibold desktop:text-2xl">{navigation.title}</h1>

          <section>
            {navigation.leadParagraph && (
              <div className="mt-9 space-y-5 text-sm font-medium">
                <div
                  dangerouslySetInnerHTML={{ __html: navigation.leadParagraph }}
                  className=""
                />
              </div>
            )}
          </section>
        </div>
      </div>

      {isArticlePage ? (
        <div className="desktop:mx-auto tablet:mx-auto desktop:max-w-4xl tablet:max-w-4xl mb-12">
          {availableYearFilters.length > 0 && (
            <div className="pt-12 px-5">
              <div className="text-xs mb-4">
                <FormattedMessage
                  defaultMessage="Vis kun artikler fra årstall"
                  description="Filter heading, show only articles from year"
                />
              </div>
              <div>
                <ul className="flex flex-row flex-wrap">
                  {availableYearFilters.map((year) => (
                    <li key={year}>
                      <button
                        className={`rounded-2xl mr-3 mb-2  px-4 py-2 text-center text-xs font-semibold ${
                          selectedYearFilter == year
                            ? "text-white bg-purple"
                            : "bg-gray-10"
                        }`}
                        value={year}
                        onClick={(e) =>
                          yearChangeHandler(e.currentTarget.value)
                        }
                      >
                        {year === allFilterValue ? (
                          <FormattedMessage
                            defaultMessage="Alle"
                            description="Filter label for displaying all years in nav page"
                          />
                        ) : (
                          year
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <ul className="mt-12 grid mx-5 gap-8 desktop:grid-cols-3 desktop:gap-8 tablet:grid-cols-2 tablet:gap-8">
            {navigation.subPages
              .filter(
                (subpage) =>
                  subpage.type === ContentType.ARTICLE &&
                  (selectedYearFilter === allFilterValue ||
                    subpage.timeperiods
                      .map((t) => t.displayName)
                      .includes(selectedYearFilter))
              )
              .map((subpage: IArticle | INavigation) => {
                const path =
                  subpage.type === ContentType.ARTICLE
                    ? paths.article
                    : paths.navigationPage;
                let mainImage: IImage;
                if (subpage.images)
                  mainImage = subpage?.images.find((i) => i.isMainImage);
                return (
                  <li
                    key={subpage.id}
                    className="bg-gray-10 hover:bg-beige-60 h-96 w-auto "
                  >
                    <Link
                      to={path(subpage.id)}
                      className="break-normal no-underline"
                    >
                      <div className="h-1/2 relative">
                        <div className="absolute h-full w-full">
                          {mainImage && (
                            <Image
                              src={mainImage.versions["medium"]}
                              objectFit="contain"
                              layout="fill"
                            />
                          )}
                        </div>
                      </div>
                      <div className="h-1/2 relative mx-5 mt-5">
                        <div className="absolute h-full w-full hover:underline">
                          <p className="mb-2 text-base text-darkblue font-semibold">
                            {subpage.title}
                          </p>
                          <div className="text-xs text-clip overflow-hidden max-h-12">
                            {subpage.leadParagraph}
                          </div>

                          <div className="flex items-center font-semibold text-sm absolute bottom-9 hover:underline">
                            <FormattedMessage
                              defaultMessage="Les mer"
                              description="Read more"
                            />
                            <ArrowIcon direction="right" className="ml-2" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center py-5 mx-auto max-w-prose tablet:py-0">
          <ul className="mt-6 w-full">
            {navigation.subPages.map((subpage: IArticle | INavigation) => {
              const path =
                subpage.type === ContentType.ARTICLE
                  ? paths.article
                  : paths.navigationPage;
              return (
                <li
                  className="border-b border-gray-60 py-4 px-5 "
                  key={subpage.id}
                >
                  <Link
                    to={path(subpage.id)}
                    className="flex justify-between space-x-6 no-underline hover:underline"
                  >
                    <h2>{subpage.title}</h2>
                    <div>
                      <ArrowIcon direction="right" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
