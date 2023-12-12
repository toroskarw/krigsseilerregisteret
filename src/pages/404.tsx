import { Link } from "components/Link";
import { SelectSearch } from "components/SelectSearch";
import { FormattedMessage } from "react-intl";
import paths from "util/paths";

const Custom404Page = () => {
  const backToFrontPage = (
    <Link to={paths.homePage} className=" font-semibold">
      <FormattedMessage
        defaultMessage="gå tilbake til forsiden"
        description="Return to homepage"
      />
    </Link>
  );

  const visitShipArchive = (
    <Link to={paths.shipArchive()} className=" font-semibold">
      <FormattedMessage
        defaultMessage="arkiv over registrerte skip"
        description="Visit shiparchive label"
      />
    </Link>
  );

  const visitSeafarerArchive = (
    <Link to={paths.seafarerArchive()} className="font-semibold">
      <FormattedMessage
        defaultMessage=" arkiv over registrerte sjøfolk"
        description="Visit shiparchive label"
      />
    </Link>
  );

  const missingPage = (
    <FormattedMessage
      defaultMessage="Beklager, denne siden fant vi ikke "
      description="Missing page label"
    />
  );
  const helpText = (
    <FormattedMessage
      defaultMessage="For å hjelpe deg videre foreslår vi at du forsøker et søk"
      description="Helping text label"
      values={{ backToFrontPage: backToFrontPage }}
    />
  );

  const helpTextWithLinks = (
    <FormattedMessage
      defaultMessage="Alternativt kan du enten {backToFrontPage}, besøke vårt {visitShipArchive} eller {visitSeafarerArchive}"
      description="Helping text with links label"
      values={{
        backToFrontPage: backToFrontPage,
        visitShipArchive: visitShipArchive,
        visitSeafarerArchive: visitSeafarerArchive,
      }}
    />
  );

  return (
    <div>
      <div className="flex-col bg-purple-10 desktop:pb-28 py-32">
        <div className="mx-auto max-w-prose px-5">
          <span className="font-semibold text-xl tablet:text-2xl desktop:text-3xl">
            {missingPage}
          </span>
          <p className="mt-5">{helpText}</p>
          <div className="mb-5 mt-3">
            <SelectSearch />
          </div>
          <div>{helpTextWithLinks}</div>
        </div>
      </div>
    </div>
  );
};

export default Custom404Page;
