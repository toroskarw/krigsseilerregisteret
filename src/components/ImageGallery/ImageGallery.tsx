/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
// TODO: Sjekk eslint
import { IImage } from "domain/image";
import "photoswipe/dist/default-skin/default-skin.css";
import "photoswipe/dist/photoswipe.css";
/* Lag generisk bildegalleri som kan brukes på alle sider hvor man viser bilder
1. Hent inn bildene fra en artikkel
2. Mapp bildene om til ps-bilder
3. Vis bildene på gitt side (feks artikkelside)
*/
import React from "react";
import { FormattedMessage } from "react-intl";
import { Gallery, Item } from "react-photoswipe-gallery";

interface GalleryProps {
  images?: IImage[];
  frontPageImage?: boolean;
  count?: number;
  galleryClassName?: string;
  thumbnailClassName?: string;
  showText?: boolean;
  textFormat?: string;
}

export const ImageGallery = ({
  images,
  count,
  frontPageImage,
  galleryClassName,
  thumbnailClassName,
  showText,
  textFormat,
}: GalleryProps) => {
  return (
    <div className={`${galleryClassName}`}>
      <Gallery>
        {images.map((image) => {
          // Removes the dot at the start of fullText of image (FIXME: Check if necessary)
          const imageFullText = image.fullText.replace(/\./g, " ");

          return (
            <figure
              key={image.id}
              className={` ${
                (frontPageImage && image.isMainImage) || !frontPageImage
                  ? "flex mx-auto"
                  : "hidden"
              }`}
            >
              <div className="mx-auto ">
                <Item
                  key={image.id}
                  id={image.id}
                  original={image.versions.high}
                  width="1024" // TODO: Få inn dynamisk bredde
                  height="1365" // TODO: Få inn dynamisk høyde
                  title={imageFullText ? imageFullText : image.displayName}
                >
                  {({ ref, open }) => (
                    <div className="group overflow-hidden">
                      <img
                        ref={ref as React.MutableRefObject<HTMLImageElement>}
                        onClick={open}
                        src={image.versions["gallery-preview"]}
                        alt={image.altText}
                        className={`${thumbnailClassName} transform duration-200 group-hover:scale-110 cursor-pointer `}
                      />
                      <div className="relative">
                        <img
                          width={18}
                          height={18}
                          className="absolute bottom-2 right-2  transform group-hover:scale-110  duration-200 cursor-pointer"
                          src={"/images/icon_enlarge.svg"}
                        ></img>
                      </div>
                    </div>
                  )}
                </Item>

                {!showText &&
                  ((frontPageImage && image.isMainImage) ||
                    !frontPageImage) && (
                    <figcaption
                      className={`${textFormat} mb-5 text-xs mt-2 tablet:px-10 tablet:max-w-fit desktop:max-w-lg desktop:mx-auto desktop:px-0 max-w-lg`}
                    >
                      <div>{imageFullText}</div>
                      <div className="font-semibold">
                        {count && (
                          <FormattedMessage
                            defaultMessage="Bilde 1 av {count}"
                            description="PictureCount label"
                            values={{ count: count }}
                          />
                        )}
                      </div>
                    </figcaption>
                  )}
              </div>
            </figure>
          );
        })}
      </Gallery>
    </div>
  );
};

export default ImageGallery;
