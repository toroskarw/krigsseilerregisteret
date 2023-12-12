import { ImageGallery } from "components/ImageGallery";
import { IArchive } from "domain/archive";
import { IPosition } from "domain/position";
import { IRelatedBase, IRelatedFacets } from "domain/related";
import { Related } from "features/article";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface PositionProps {
  position: IPosition;
  relatedSearchResults: IArchive<IRelatedBase, IRelatedFacets>; // TODO Uferdig
  relatedAllResults: IArchive<IRelatedBase, IRelatedFacets>;
}

export const Position = ({
  position,
  relatedSearchResults,
  relatedAllResults,
}: PositionProps) => {
  const imageCount = position.images.length > 1 ? position.images.length : null;
  const relatedCount = relatedAllResults.total;
  const router = useRouter();

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    router.push(`${position.id}`);
  }, []);

  if (
    position.images.filter((image) => image.isMainImage).length <= 0 &&
    position.images.length > 0
  ) {
    position.images[0].isMainImage = true;
  }
  return (
    <div className="flex justify-center">
      <div className="mb-20 desktop:mt-14 tablet:mt-14 ">
        <div className="">
          {position.images.length > 0 && (
            <div className="">
              <ImageGallery
                images={position.images}
                frontPageImage
                count={imageCount}
                textFormat="px-5"
                thumbnailClassName="max-h-144 mx-auto"
                galleryClassName=""
              />
            </div>
          )}
        </div>
        <div className="mx-5 desktop:mx-auto max-w-prose desktop:px-0">
          <h1 className="tablet:text-3xl">{position.displayName}</h1>
          <section>
            {/* Relatert etc */}
            {relatedCount > 0 && (
              <Related
                title="Relatert innhold"
                subTitle=""
                archive={relatedSearchResults}
                count={relatedCount}
              />
            )}
            {position.additionalDetails ? (
              <div className="text-sm font-medium">
                <div
                  dangerouslySetInnerHTML={{
                    __html: position.additionalDetails,
                  }}
                  className=""
                />
              </div>
            ) : (
              ""
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
