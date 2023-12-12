import { IArchive } from "domain/archive";
import { IHarbour } from "domain/harbour";
import { IRelatedBase, IRelatedFacets } from "domain/related";
import { Related } from "features/article";
import { FormattedMessage } from "react-intl";

interface HarbourProps {
  harbour: IHarbour;
  relatedSearchResults: IArchive<IRelatedBase, IRelatedFacets>; // TODO Uferdig
  relatedAllResults: IArchive<IRelatedBase, IRelatedFacets>;
}

export const Harbour = ({
  harbour,
  relatedSearchResults,
  relatedAllResults,
}: HarbourProps) => {
  const relatedCount = relatedAllResults.total;

  return (
    <div className="mb-12 desktop:mt-14">
      <div className="px-5 mx-auto mt-11 max-w-prose tablet:px-10 desktop:px-0">
        <h1 className="tablet:text-3xl">{harbour.displayName ?? null}</h1>

        {/* // Article section */}
        <section>
          {harbour.additionalDetails ? (
            <div className="mt-9 space-y-5 text-sm font-medium break-all">
              <div
                dangerouslySetInnerHTML={{ __html: harbour.additionalDetails }}
                className=""
              />
            </div>
          ) : (
            ""
          )}
        </section>

        {/* Relatert etc */}
        {relatedCount > 0 && (
          <Related
            title="Relatert innhold"
            subTitle=""
            archive={relatedSearchResults}
            count={relatedCount}
          />
        )}

        {/* Koordinater */}
        {harbour.latitude && harbour.longitude && (
          <div className="bg-gray-10 tablet:px-10">
            <div className="pt-6 pb-12 mb-9 desktop:mb-20 px-5 w-full tablet:px-10 desktop:max-w-5xl desktop:mx-auto desktop:px-0">
              <div className="">
                <h2 className="mb-3 font-semibold">
                  <FormattedMessage
                    defaultMessage="Posisjon for havn"
                    description=""
                  />
                </h2>
                <dl className="">
                  <div className="flex space-x-2">
                    <dt className="font-normal">
                      <FormattedMessage
                        defaultMessage="Breddegrad"
                        description="latitude"
                      />
                      :
                    </dt>
                    <dd>{harbour.latitude}</dd>
                  </div>
                  <div className="flex space-x-2">
                    <dt className="font-normal">
                      <FormattedMessage
                        defaultMessage="Lengdegrad"
                        description="longitude"
                      />
                      :
                    </dt>
                    <dd>{harbour.longitude}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
