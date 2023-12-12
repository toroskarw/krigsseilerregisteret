import { BackToProfile } from "components/BackToProfile";
import { DownloadIcon } from "components/Icons";
import { Link } from "components/Link";
import { TabSection } from "components/TabSection";
import { IFile } from "domain/file";
import { backToProfileMsg } from "features/ship/messages";
import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";

export interface DocumentsProps {
  documents: IFile[];
  title: MessageDescriptor;
  count: number;
}

export const Documents = ({ documents, title, count }: DocumentsProps) => {
  const intl = useIntl();
  return (
    <TabSection>
      <BackToProfile message={backToProfileMsg} />

      <div className="mt-8 desktop:hidden">
        <h2 className="text-2xl font-semibold">
          {intl.formatMessage(title, { count: count })}
        </h2>
      </div>
      {documents.length > 0 && (
        <ul className="mt-6 desktop:mt-0">
          {documents.map((file: IFile) => {
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
      )}
      {documents.length === 0 && (
        <p className="mt-6">
          {intl.formatMessage({
            defaultMessage:
              "Vi har ikke registrert noen vedlegg for dette skipet",
            description: "No attachments for ship",
          })}
        </p>
      )}
    </TabSection>
  );
};
