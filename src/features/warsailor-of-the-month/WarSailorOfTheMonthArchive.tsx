import { ArrowIcon } from "components/Icons";
import { Link } from "components/Link";
import { IWarSailorOfTheMonthArchive } from "domain/warSailorOfTheMonthArchive";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import paths from "util/paths";

interface WarSailorOfTheMonthArchiveProps {
  archive: IWarSailorOfTheMonthArchive;
}

export const WarSailorOfTheMonthArchive = (
  props: WarSailorOfTheMonthArchiveProps
) => {
  return (
    <>
      <div className="flex-col pt-20 pb-10 bg-purple-10 tablet:py-14 desktop:pb-16 tablet:space-y-8 ">
        <div className="mx-auto max-w-prose px-5">
          <h1 className="font-semibold desktop:text-2xl">
            <FormattedMessage
              defaultMessage="Månedens Krigsseiler"
              description={"Månedens Krigsseiler arkiv overskrift"}
            />
          </h1>

          <section>
            <p className="mt-9 space-y-5 text-sm font-medium">
              <FormattedMessage
                defaultMessage="Månedens Kriggseiler fremhever enkelte krigsseilere og deres
              innsats"
                description={"Månedens Krigsseiler archive intro"}
              />
            </p>
          </section>
        </div>
      </div>
      <div className="desktop:mx-auto tablet:mx-auto desktop:max-w-4xl tablet:max-w-4xl mb-12">
        <ul className="mt-12 grid mx-5 gap-8 desktop:grid-cols-3 desktop:gap-8 tablet:grid-cols-2 tablet:gap-8">
          {props.archive.results.map((warsailor) => {
            const path = paths.warSailorOfTheMonthPage;

            return (
              <li
                key={warsailor.id}
                className="bg-gray-10 hover:bg-beige-60 h-96 w-auto "
              >
                <Link
                  to={path(warsailor.id)}
                  className="break-normal no-underline"
                >
                  <div className="h-1/2 relative">
                    <div className="absolute h-full w-full">
                      {warsailor.imageUrl && (
                        <Image
                          src={warsailor.imageUrl}
                          objectFit="contain"
                          layout="fill"
                        />
                      )}
                    </div>
                  </div>
                  <div className="h-1/2 relative mx-5 mt-5">
                    <div className="absolute h-full w-full hover:underline">
                      <p className="mb-2 text-base text-darkblue font-semibold">
                        {warsailor.title}
                      </p>
                      <div className="text-xs text-clip overflow-hidden max-h-12">
                        {warsailor.teaserText}
                      </div>

                      <div className="flex items-center font-semibold text-sm absolute bottom-9 hover:underline">
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
      </div>
    </>
  );
};
