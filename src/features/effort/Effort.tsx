import { INavigation } from "domain/navigation";
import { Link } from "components/Link";
import { ArrowIcon } from "components/Icons";
import { IArticle } from "domain/article";
import paths from "util/paths";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import { IImage } from "domain/image";
import { useState } from "react";

interface EffortProps {
  navigation: INavigation;
}

// FIXME: IKKE I BRUK DA SIDEN ER LAGT INN PÅ NAVIGASJON
export const Effort = ({ navigation }: EffortProps) => {
  const showMoreArticles = () => {
    setLimit(limit + 12);
  };

  const [limit, setLimit] = useState<number>(12);

  const navigationCount: number = navigation.subPages.length;

  return (
    <>
      <div className="pt-20 pb-10 bg-purple-10 tablet:py-14 desktop:pb-16 tablet:space-y-8 ">
        <div className="mx-auto max-w-prose px-5">
          <h1 className="font-semibold desktop:text-2xl">{navigation.title}</h1>

          <section>
            {navigation.leadParagraph ? (
              <div className="mt-9 space-y-5 text-sm font-medium">
                <div
                  dangerouslySetInnerHTML={{
                    __html: navigation.leadParagraph,
                  }}
                  className=""
                />
              </div>
            ) : (
              ""
            )}
          </section>
        </div>
      </div>

      <div className="desktop:mx-auto tablet:mx-auto desktop:max-w-4xl tablet:max-w-4xl">
        <div className="pt-12 px-5">
          {/* TODO: Utlisting og mulighet til å filtrere på årtall. Egen sak */}
          {/* <div>Sorter etter årstall</div> */}
          <div></div>
        </div>
        <ul className="grid desktop:grid-cols-3 desktop:gap-8 tablet:grid-cols-2 tablet:gap-8 no-underline mx-5">
          {navigation.subPages.slice(0, limit).map((subpage) => {
            const path = paths.article;
            let mainImage: IImage;
            if (subpage.images)
              mainImage = subpage?.images.find((i) => i.isMainImage);

            return (
              <li
                className="bg-gray-10 hover:bg-beige-60 mb-5 " // h-96 w-80
                key={subpage.id}
              >
                <Link
                  to={path(subpage.id)}
                  className="break-normal bg-gray-10 hover:bg-beige-60 grid grid-rows-2 "
                >
                  <Image
                    src={mainImage.versions["medium"]}
                    width={305}
                    height={225}
                    className="row-start-1"
                  />
                  <div className="pt-4 px-5 row-start-2 relative">
                    <p className="mb-2 text-base text-darkblue font-semibold">
                      {subpage.title}
                    </p>
                    <p className="text-xs text-clip overflow-hidden">
                      {subpage.leadParagraph}
                    </p>
                    <div className="absolute bottom-5 left-5">
                      <div className="flex items-center font-semibold text-sm">
                        <FormattedMessage
                          defaultMessage="Les mer"
                          description="Read more"
                        />
                        <ArrowIcon direction="right" className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          className={`${
            navigationCount <= limit ? "hidden" : ""
          } grid place-items pt-4 pb-12`}
        >
          <button
            onClick={() => showMoreArticles()}
            disabled={navigationCount <= limit}
            className=" bg-gray-10 border border-gray-60 py-1.5 px-3 rounded-sm no-underline self-center mx-auto  hover:underline"
          >
            <div>
              <FormattedMessage
                defaultMessage="Last inn flere"
                description="Read more"
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
