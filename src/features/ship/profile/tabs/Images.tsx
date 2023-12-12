import { ImageGallery } from "components/ImageGallery";
import { BackToProfile } from "components/BackToProfile";
import { TabSection } from "components/TabSection";
import { IImage } from "domain/image";
import { backToProfileMsg } from "features/ship/messages";
import React from "react";
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl";

export interface ImagesProps {
  images: IImage[];
  title: MessageDescriptor;
  count: number;
}

export const Images = ({ images, title, count }: ImagesProps) => {
  const intl = useIntl();
  return (
    <TabSection>
      <BackToProfile message={backToProfileMsg} />

      <div className="mt-8 desktop:hidden">
        <h2 className="text-2xl font-semibold">
          {intl.formatMessage(title, { count: count })}
        </h2>
      </div>
      {images.length > 0 ? (
        <div>
          <ImageGallery
            images={images}
            galleryClassName={
              "desktop:grid desktop:grid-cols-3 gap-7 tablet:grid tablet:grid-cols-2"
            }
          />
        </div>
      ) : (
        <FormattedMessage
          defaultMessage="Vi har ikke registrert noen bilder."
          description=""
        />
      )}
    </TabSection>
  );
};
