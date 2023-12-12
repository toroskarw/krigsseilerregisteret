import { ImageGallery } from "components/ImageGallery";
import { BackToProfile } from "components/BackToProfile";
import { TabSection } from "components/TabSection";
import { IImage } from "domain/image";
import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { backToProfileMsg } from "../../messages";

export interface ImagesProps {
  images: IImage[];
  title: MessageDescriptor;
  count: number;
}

export const Images = ({ images, title, count }: ImagesProps) => {
  const intl = useIntl();
  return (
    <>
      <TabSection>
        <BackToProfile message={backToProfileMsg} />

        <div className="mt-5 desktop:hidden">
          <h2 className="text-2xl font-semibold">
            {intl.formatMessage(title, { count: count })}
          </h2>
        </div>
        <div>
          <ImageGallery
            images={images}
            galleryClassName={
              "desktop:grid desktop:grid-cols-3 gap-7 tablet:grid tablet:grid-cols-2"
            }
          />
        </div>
      </TabSection>
    </>
  );
};
