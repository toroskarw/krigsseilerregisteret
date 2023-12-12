import { DownloadIcon } from "components/Icons";
import { Link } from "components/Link";
import { IWarSailorsJournal } from "domain/warSailorsJournal";
import { FormattedMessage } from "react-intl";

interface WarSailorsJournalProps {
  warSailorsJournal: IWarSailorsJournal;
}

export const WarSailorsJournal = ({
  warSailorsJournal,
}: WarSailorsJournalProps) => {
  const file =
    warSailorsJournal.documents?.length > 0
      ? warSailorsJournal.documents[0]
      : undefined;
  return (
    <article className="h-128 mb-12 desktop:mt-14">
      <div className="px-5 mx-auto mt-11 max-w-prose tablet:px-10 desktop:px-0">
        <h1 className="tablet:text-3xl">{warSailorsJournal.displayName}</h1>
      </div>

      {/* Download attachment section */}
      {/* Note: Assuming there is only one attachment per journal */}
      {file && (
        <div className="my-9 tablet:px-10 desktop:max-w-2xl desktop:mx-auto">
          <aside className="px-5 py-4 bg-beige-30">
            <div>
              <FormattedMessage defaultMessage="Utgave" description="Issue" />
            </div>
            <div className="font-semibold">{warSailorsJournal.issue}</div>
            <div>
              <FormattedMessage defaultMessage="År" description="Year" />
            </div>
            <div className="font-semibold">{warSailorsJournal.year}</div>
            <div>
              <FormattedMessage
                defaultMessage="Last ned utgave"
                description="Download issue"
              />
            </div>
            <Link
              to={file.downloadPath}
              className="flex items-center space-x-6 no-underline hover:underline font-semibold"
            >
              <span>
                <DownloadIcon />
              </span>
              <span>{file.filename}</span>
            </Link>
          </aside>
        </div>
      )}
    </article>
  );
};
