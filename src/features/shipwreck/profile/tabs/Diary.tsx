import { BackToProfile } from "components/BackToProfile";
import { TabSection } from "components/TabSection";
import { IShipwreck } from "domain/shipwreck";
import { backToProfileMsg } from "features/shipwreck/messages";
import { MessageDescriptor, useIntl } from "react-intl";

export interface DiaryProps {
  shipwreck: IShipwreck;
  title: MessageDescriptor;
}

export const Diary = ({ shipwreck, title }: DiaryProps) => {
  const intl = useIntl();
  return (
    <TabSection>
      <BackToProfile message={backToProfileMsg} />
      <div className="mt-8 desktop:hidden">
        <h2 className="text-2xl font-semibold">{intl.formatMessage(title)}</h2>
      </div>
      <div className="mt-6 desktop:mt-0">
        <div
          dangerouslySetInnerHTML={{ __html: shipwreck.diary }}
          className="space-y-2 max-w-prose"
        />
      </div>
    </TabSection>
  );
};
