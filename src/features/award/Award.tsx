import { ImageGallery } from "components/ImageGallery";
import { IArchive } from "domain/archive";
import { IAward } from "domain/award";
import { IRelatedBase, IRelatedFacets } from "domain/related";
import { Related } from "features/article";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface AwardProps {
  award: IAward;
  relatedSearchResults: IArchive<IRelatedBase, IRelatedFacets>;
  relatedAllResults: IArchive<IRelatedBase, IRelatedFacets>;
}

export const Award = ({
  award,
  relatedSearchResults,
  relatedAllResults,
}: AwardProps) => {
  const imageCount = award.images.length > 1 ? award.images.length : null;
  const relatedCount = relatedAllResults.total;
  const router = useRouter();

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    router.push(`${award.id}`);
  }, []);

  if (
    award.images.filter((image) => image.isMainImage).length <= 0 &&
    award.images.length > 0
  ) {
    award.images[0].isMainImage = true;
  }
  return (
    <div className="flex justify-center">
      <div className="mb-20 desktop:mt-14 tablet:mt-14 ">
        <div className="">
          {award.images.length > 0 && (
            <div className="">
              <ImageGallery
                images={award.images}
                frontPageImage
                count={imageCount}
                textFormat="px-5"
                thumbnailClassName=""
                galleryClassName=""
              />
            </div>
          )}
        </div>
        <div className="mx-5 desktop:mx-auto max-w-prose desktop:px-0">
          <h1 className="tablet:text-3xl">{award.displayName}</h1>
          <section>
            {/* Relatert etc */}
            {relatedCount > 0 && (
              <Related
                title="Registrerte mottakere"
                subTitle=""
                archive={relatedSearchResults}
                count={relatedCount}
              />
            )}
            {award.furtherDetails ? (
              <div className="text-sm font-medium">
                <div
                  dangerouslySetInnerHTML={{ __html: award.furtherDetails }}
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
