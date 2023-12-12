import { ChevronRightIcon } from "components/Icons";
import { ImageGallery } from "components/ImageGallery";
import { Link } from "components/Link";
import { IImage } from "domain/image";
import { IWarSailorOfTheMonth } from "domain/warSailorOfTheMonth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import paths from "util/paths";

interface WarSailorOfTheMonthDetailPageProps {
  warsailorOfTheMonth: IWarSailorOfTheMonth;
}

export const WarSailorOfTheMonthDetailPage = (
  props: WarSailorOfTheMonthDetailPageProps
) => {
  const intl = useIntl();
  const mainImage: IImage = props.warsailorOfTheMonth.images.find(
    (image) => image.isMainImage
  );
  const images = props.warsailorOfTheMonth.images.filter(
    (image) => !image.isMainImage
  );
  const router = useRouter();

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    router.push(`${props.warsailorOfTheMonth.id}`);
  }, []);

  return (
    <article className="mb-12 desktop:mt-14">
      <h2 className="hidden desktop:block text-center text-3xl mb-8">
        Månedens Krigsseiler
      </h2>
      <figure className="">
        {mainImage && (
          <>
            <img
              src={mainImage.versions["medium"]}
              alt={mainImage.altText}
              className="mx-auto w-full desktop:max-w-4xl"
            />
            <figcaption
              className={
                mainImage.fullText
                  ? "text-xs mt-2 px-5 tablet:px-10 desktop:px-0 desktop:max-w-4xl desktop:mx-auto"
                  : ""
              }
            >
              {mainImage.fullText}
            </figcaption>
          </>
        )}
      </figure>
      <div className="px-5 mx-auto mt-11 max-w-prose tablet:px-10 desktop:px-0">
        <h1 className="tablet:text-3xl">{props.warsailorOfTheMonth.title}</h1>

        {/* // Article section */}
        <section>
          {props.warsailorOfTheMonth.leadParagraph ? (
            <p className="mt-9 space-y-5 text-xl font-medium">
              {props.warsailorOfTheMonth.leadParagraph}
            </p>
          ) : null}

          <div
            className={`${
              props.warsailorOfTheMonth.leadParagraph ? "mt-5" : "mt-9"
            }`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: props.warsailorOfTheMonth.bodyText,
              }}
              className="mx-auto space-y-5"
            />
          </div>

          <Link
            to={paths.seafarer(props.warsailorOfTheMonth.seafarer.id)}
            className="no-underline bg-gray-20 mt-8   px-6 py-4 tablet:py-8 text-lg block hover:bg-gray-30 hover:underline"
          >
            <span className="flex items-center justify-center">
              <FormattedMessage
                defaultMessage="Les mer om {name} på hens profilside"
                description="Link to warsailor from war sailor of the month page"
                values={{
                  name: props.warsailorOfTheMonth.displayName,
                }}
              />
              <span className="ml-4">
                <ChevronRightIcon width="7" height="12" />
              </span>
            </span>
          </Link>
        </section>
      </div>
      {/** Image section */}
      <div className="my-9 mx-5">
        <ImageGallery
          images={images}
          galleryClassName="mx-auto"
          thumbnailClassName="mx-auto"
        />
      </div>
    </article>
  );
};
