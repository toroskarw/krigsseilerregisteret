import { ChevronRightIcon } from "components/Icons";
import { ImageGallery } from "components/ImageGallery";
import { Link } from "components/Link";
import { ISeafarer } from "domain/seafarer";
import React from "react";
import { FormattedMessage } from "react-intl";
import { colors } from "util/constants";
import paths from "util/paths";

export interface PrimaryInformationProps {
  seafarer: ISeafarer;
}

/**
 * The main content of a seafarer profile, before navigating to other tabs.
 */
export const PrimaryInformation = ({ seafarer }: PrimaryInformationProps) => {
  // If a main image is indicated, show that one. Otherwise, show first image if one exists

  const imageCount = seafarer.images.length > 1 ? seafarer.images.length : null;

  if (
    seafarer.images.filter((image) => image.isMainImage).length <= 0 &&
    seafarer.images.length > 0
  ) {
    seafarer.images[0].isMainImage = true;
  }

  const colSpan =
    seafarer.images.length > 0
      ? "desktop:col-span-2 tablet:col-span-4"
      : "desktop:col-span-3 tablet:col-span-5";

  return (
    <>
      {/* Opplysninger section */}
      <div className="desktop:px-36">
        <div className="py-9 w-full tablet:px-10 tablet:grid-cols-5 tablet:grid desktop:grid-cols-3 desktop:max-w-5xl desktop:mx-auto desktop:px-0">
          {seafarer.images.length > 0 && (
            <div className="px-5 mx-auto w-full tablet:col-start-5 tablet:px-0 desktop:col-start-3 desktop:pl-5">
              <>
                <ImageGallery
                  images={seafarer.images}
                  frontPageImage
                  count={imageCount}
                  thumbnailClassName="max-h-auto"
                />
              </>
            </div>
          )}

          <div
            className={`flex flex-col pt-5 space-y-6 tablet:row-start-1 tablet:pt-0  desktop:px-0 ${colSpan} tablet:flex tablet:justify-between`}
          >
            <div
              dangerouslySetInnerHTML={{ __html: seafarer.miscellaneous }}
              className="px-5 space-y-2 desktop:p-0"
            />

            {/* Participated in operations section */}
            {seafarer.enlistments.filter(
              (en) => en.articles && en.articles.length > 0
            ).length > 0 && (
              <div className="tablet:mr-5">
                <div className="px-5 pt-7 pb-6 bg-beige-60">
                  <h2 className="mb-2 text-lg font-semibold">
                    <FormattedMessage
                      defaultMessage="Var med på følgende historiske hendelser 1939-1945"
                      description=""
                    />
                  </h2>
                  <ul>
                    {seafarer.enlistments
                      .filter((en) => en.articles && en.articles.length > 0)
                      .map((en) => {
                        return en.articles.map((article) => {
                          return (
                            <li key={article.id}>
                              <Link to={paths.article(article.id)}>
                                {article.title}
                                <span className="inline-block ml-4">
                                  <ChevronRightIcon
                                    fill={colors.darkblue.DEFAULT}
                                  />
                                </span>
                              </Link>
                              <div className="text-sm">
                                {en.ship && en.position ? (
                                  <FormattedMessage
                                    defaultMessage="Påmønstret {ship} som {position}"
                                    description=""
                                    values={{
                                      ship: en.ship.displayName,
                                      position:
                                        en.position.displayName.toLowerCase(),
                                    }}
                                  />
                                ) : (
                                  <FormattedMessage
                                    defaultMessage="Påmønstret {ship}"
                                    description=""
                                    values={{
                                      ship: en.ship.displayName,
                                    }}
                                  />
                                )}
                              </div>
                            </li>
                          );
                        });
                      })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sources section */}
      {seafarer.sources && (
        <div className="desktop:px-36 bg-gray-10 tablet:px-10">
          <div className="px-5 pt-6 pb-12 mb-9 desktop:max-w-5xl desktop:mx-auto desktop:px-0 desktop:mb-20">
            <h2 className="mb-2 text-lg font-semibold">
              <FormattedMessage defaultMessage="Kilder" description="" />
            </h2>
            <div className="space-y-6">
              <div
                dangerouslySetInnerHTML={{ __html: seafarer.sources }}
                className="break-words space-y-2"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
