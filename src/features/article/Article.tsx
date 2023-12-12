import { DownloadIcon } from "components/Icons";
import { ImageGallery } from "components/ImageGallery";
import { Link } from "components/Link";
import { IArchive } from "domain/archive";
import { IArticle } from "domain/article";
import { IFile } from "domain/file";
import { IImage } from "domain/image";
import { IRelatedBase, IRelatedFacets } from "domain/related";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { Related } from ".";

interface ArticleProps {
  article: IArticle;
  relatedSearchResults: IArchive<IRelatedBase, IRelatedFacets>;
  relatedAllResults: IArchive<IRelatedBase, IRelatedFacets>;
}

export const Article = ({
  article,
  relatedSearchResults,
  relatedAllResults,
}: ArticleProps) => {
  const intl = useIntl();
  const relatedCount = relatedAllResults.total;
  const mainImage: IImage = article.images.find((image) => image.isMainImage);
  const articleImages = article.images.filter((image) => !image.isMainImage);
  const router = useRouter();

  useEffect(() => {
    // Reset any non-existent subroutes that user may have entered
    router.push(`${article.id}`);
  }, []);

  return (
    <article className="mb-12 desktop:mt-14">
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
        <h1 className="tablet:text-3xl">{article.title}</h1>
        {/* Registrerte deltakere etc */}
        {relatedCount > 0 && (
          <Related
            title={intl.formatMessage({
              defaultMessage: "Registrerte deltakere",
              description: "Registrerte deltakere",
            })}
            subTitle={intl.formatMessage({
              defaultMessage: "Sjøfolk og skip",
              description: "Sjøfolk og skip",
            })}
            archive={relatedSearchResults}
            count={relatedCount}
          />
        )}
        {/* // Article section */}
        <section>
          {article.leadParagraph ? (
            <p className="mt-9 space-y-5 text-xl font-medium">
              {article.leadParagraph}
            </p>
          ) : null}

          <div className={`${article.leadParagraph ? "mt-5" : "mt-9"}`}>
            <div
              dangerouslySetInnerHTML={{ __html: article.bodyText }}
              className="mx-auto space-y-5"
            />
          </div>
        </section>
      </div>
      {/** Image section */}
      <div className="my-9 mx-5">
        <ImageGallery
          images={articleImages}
          galleryClassName="mx-auto"
          thumbnailClassName="mx-auto"
        />
      </div>

      {/* Attachments section */}
      {article.documents.length > 0 && (
        <aside className="px-5 my-9 space-y-6 tablet:px-10 desktop:max-w-2xl desktop:mx-auto desktop:px-0">
          <ul>
            {article.documents.map((file: IFile) => {
              return (
                <li key={file.id} className="py-4 px-5 odd:bg-beige-30">
                  <Link
                    to={file.downloadPath}
                    className="flex items-center space-x-6 no-underline hover:underline"
                  >
                    <span>
                      <DownloadIcon />
                    </span>
                    <span>{file.displayName ?? file.filename}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </article>
  );
};
