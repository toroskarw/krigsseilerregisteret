import { DownloadIcon } from "components/Icons";
import { Link } from "components/Link";
import { TabSection } from "components/TabSection";
import { IFile } from "domain/file";
import { IShipwreck } from "domain/shipwreck";
import { FormattedMessage } from "react-intl";
import { getFormattedGranularDate } from "util/format";

export interface SeaExplanationProps {
  shipwreck: IShipwreck;
}

export const SeaExplanation = ({ shipwreck }: SeaExplanationProps) => {
  const inquiryDate = getFormattedGranularDate(shipwreck.inquiryDate);

  return (
    <TabSection>
      <div className="mt-4 desktop:w-full">
        {inquiryDate ||
        shipwreck.inquiryPlace ||
        shipwreck.inquiryAdministrator ||
        shipwreck.inquiryNote ? (
          <dl className="py-9 px-5 mb-8 text-sm tablet:flex tablet:space-x-24 bg-beige-30 tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
            {inquiryDate && (
              <div className="">
                <dt className="">
                  <FormattedMessage defaultMessage="Dato" description="" />
                </dt>
                <dd>{inquiryDate}</dd>
              </div>
            )}
            {shipwreck.inquiryPlace && (
              <div className="mt-5 tablet:mt-0">
                <dt>
                  <FormattedMessage defaultMessage="Sted" description="" />
                </dt>
                <dd>{shipwreck.inquiryPlace}</dd>
              </div>
            )}
            {shipwreck.inquiryAdministrator && (
              <div className="mt-5 tablet:mt-0">
                <dt>
                  <FormattedMessage
                    defaultMessage="Administrator"
                    description=""
                  />
                </dt>
                <dd>{shipwreck.inquiryAdministrator}</dd>
              </div>
            )}
            {shipwreck.inquiryNote && (
              <div className="mt-5 tablet:mt-0">
                <dt>
                  <FormattedMessage defaultMessage="Merknad" description="" />
                </dt>
                <dd>{shipwreck.inquiryNote}</dd>
              </div>
            )}
          </dl>
        ) : null}

        <div>
          <h2 className="font-semibold">
            <FormattedMessage defaultMessage="Referat" description="" />
          </h2>
          <div className="">
            <ul className="mt-3 text-sm desktop:mt-0">
              {shipwreck.documents.map((file: IFile) => {
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
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: shipwreck.abstract }}
            className="mt-4 space-y-2 max-w-prose text-sm break-words"
          />
        </div>
      </div>
    </TabSection>
  );
};
