import { IArchive } from "domain/archive";
import { IRelatedBase, IRelatedFacets } from "domain/related";
import { IShipyard } from "domain/shipyard";
import { Related } from "features/article";

interface ShipyardProps {
  shipyard: IShipyard;
  relatedSearchResults: IArchive<IRelatedBase, IRelatedFacets>; // TODO Uferdig
  relatedAllResults: IArchive<IRelatedBase, IRelatedFacets>;
}

export const Shipyard = ({
  shipyard,
  relatedSearchResults,
  relatedAllResults,
}: ShipyardProps) => {
  const relatedCount = relatedAllResults.total;

  return (
    <div className="mb-12 desktop:mt-14">
      <div className="px-5 mx-auto mt-11 max-w-prose tablet:px-10 desktop:px-0">
        <h1 className="tablet:text-3xl">{shipyard.displayName ?? null}</h1>

        {/* Relatert etc */}
        {relatedCount > 0 && (
          <Related
            title="Relatert innhold"
            subTitle=""
            archive={relatedSearchResults}
            count={relatedCount}
          />
        )}
      </div>
    </div>
  );
};
