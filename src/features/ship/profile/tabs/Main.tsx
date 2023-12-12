import { ImageGallery } from "components/ImageGallery";
import { IShip } from "domain/ship";
import { FormattedMessage } from "react-intl";
import { ShipwreckSection } from "../ShipwreckSection";

export interface MainProps {
  ship: IShip;
}

export const Main = ({ ship }: MainProps) => {
  // If a main image is indicated, show that one. Otherwise, show first image if one exists
  const imageCount = ship.images.length > 1 ? ship.images.length : null;

  if (
    ship.images.filter((image) => image.isMainImage).length <= 0 &&
    ship.images.length > 0
  ) {
    ship.images[0].isMainImage = true;
  }

  const colSpan =
    ship.images.length > 0
      ? "desktop:col-span-2 tablet:col-span-4"
      : "desktop:col-span-3 tablet:col-span-5";

  return (
    <>
      {/* Opplysninger section */}
      <div className="desktop:px-36">
        <div className="py-9 w-full tablet:px-10 tablet:grid-cols-5 tablet:grid desktop:grid-cols-3 desktop:max-w-5xl desktop:mx-auto desktop:px-0">
          {ship.images.length > 0 && (
            <div className="px-5 mx-auto w-full tablet:col-start-5 tablet:px-0 desktop:col-start-3 desktop:pl-5">
              <>
                <ImageGallery
                  images={ship.images}
                  frontPageImage
                  count={imageCount}
                  thumbnailClassName="max-h-auto"
                />
              </>
            </div>
          )}

          <div
            className={`flex flex-col pt-5 space-y-6 tablet:row-start-1 tablet:pt-0 ${colSpan} desktop:px-0 tablet:flex tablet:justify-between`}
          >
            <div
              dangerouslySetInnerHTML={{ __html: ship.miscellaneous }}
              className="px-5 space-y-2 break-words tablet:pl-0 desktop:p-0"
            />
          </div>
        </div>
      </div>

      {/* Sources section */}
      {ship.sources && (
        <div className="desktop:px-36 bg-gray-10 tablet:px-10">
          <div className="px-5 pt-6 pb-12 mb-9 desktop:max-w-5xl desktop:mx-auto desktop:px-0 desktop:mb-20">
            <h2 className="mb-2 text-lg font-semibold">
              <FormattedMessage defaultMessage="Kilder" description="" />
            </h2>
            <div className="space-y-6">
              <div
                dangerouslySetInnerHTML={{ __html: ship.sources }}
                className="break-words"
              />
            </div>
          </div>
        </div>
      )}
      <ShipwreckSection ship={ship} />
    </>
  );
};
