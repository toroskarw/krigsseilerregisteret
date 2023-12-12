import { BackToProfile } from "components/BackToProfile";
import { Link } from "components/Link";
import { TabSection } from "components/TabSection";
import { IRelatedContent } from "domain/relatedContent";
import { backToProfileMsg } from "features/ship/messages";
import { MessageDescriptor, useIntl } from "react-intl";

export interface EffortProps {
  effort: IRelatedContent[];
  title: MessageDescriptor;
  count: number;
}

export const Effort = ({ effort, title, count }: EffortProps) => {
  const intl = useIntl();
  return (
    <TabSection>
      <BackToProfile message={backToProfileMsg} />

      <div className="mt-8 desktop:hidden">
        <h2 className="text-2xl font-semibold">
          {intl.formatMessage(title, { count: count })}
        </h2>
      </div>
      <ul className="mt-6 space-y-5 desktop:mt-0">
        {effort.map((ef: IRelatedContent) => {
          return ef.path ? (
            <li key={ef.id} className="">
              <Link
                to={ef.path}
                className="desktop:no-underline desktop:hover:font-semibold desktop:hover:underline"
              >
                {ef.displayName}
              </Link>
            </li>
          ) : (
            <li key={ef.id}>{ef.displayName}</li>
          );
        })}
      </ul>
    </TabSection>
  );
};
