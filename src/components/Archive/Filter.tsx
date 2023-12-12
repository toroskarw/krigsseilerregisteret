import { Dialog } from "@headlessui/react";
import { FunnelIcon } from "components/Icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

export const Filter: React.FunctionComponent<{
  activeQuery: string | undefined;
  total: number;
  currentPath?: string;
}> = (props) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filterMsg = (
    <FormattedMessage
      defaultMessage="Filtrer listen"
      description="Tittel på dialog for å filtrere arkivet"
    />
  );

  const router = useRouter();

  return (
    <div>
      <button
        onClick={toggleFilterVisibility}
        className="flex items-center py-3 px-3 w-full text-sm font-medium text-left text-white rounded-lg fill-current bg-purple tablet:w-40"
      >
        <FunnelIcon />
        <span className="ml-2">{filterMsg}</span>
      </button>
      {isFilterOpen ? (
        <Dialog
          aria-labelledby="#filter-dialog"
          open={true}
          onClose={toggleFilterVisibility}
          className="fixed z-10 top-20 w-full h-full "
        >
          <div className="flex items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-purple opacity-30 " />

            <div className="inline-flex flex-col w-full max-w-md overflow-hidden h-[calc(100vh-5rem)] mt-4 ">
              <div className="relative bg-white max-w-sm mx-auto p-6 overflow-y-auto ">
                <div className="pb-4">
                  <div className="flex items-center fill-current">
                    <FunnelIcon />
                    <h2
                      id="filter-dialog"
                      className="ml-4 text-base font-semibold"
                    >
                      {filterMsg}
                    </h2>
                  </div>
                  <div className="flex items-center fill-current mt-4">
                    {props.activeQuery ? (
                      <p>
                        <FormattedMessage
                          description=""
                          defaultMessage='Gjeldende tekstsøk er "{query}"'
                          values={{
                            query: props.activeQuery,
                          }}
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                <button
                  className="absolute right-4 top-5"
                  onClick={toggleFilterVisibility}
                >
                  <div className="flex">
                    <span className="mr-2 font-semibold">
                      <FormattedMessage
                        description="Lukk"
                        defaultMessage="Lukk"
                      />
                    </span>
                    <Image
                      alt=""
                      src="/images/close.svg"
                      width={22}
                      height={22}
                    />
                  </div>
                </button>
                {React.Children.map(props.children, (child) => {
                  return <div className="mb-4">{child}</div>;
                })}
                <button
                  className="py-4 px-2 mt-8 w-full text-sm font-medium text-white align-middle bg-purple"
                  onClick={toggleFilterVisibility}
                >
                  <FormattedMessage
                    defaultMessage="{total, plural, =0 {Viser ingen treff} one {Viser ett treff} other {Viser # treff}}"
                    description="filterdialog vis treff knapp"
                    values={{
                      total: props.total,
                    }}
                  />
                </button>
                <div className="mt-8 text-right">
                  <button
                    className="text-sm font-medium underline text-darkblue-60"
                    onClick={() => {
                      router.push(
                        props.currentPath ? props.currentPath : router.basePath,
                        undefined,
                        { scroll: false }
                      );
                    }}
                  >
                    <FormattedMessage
                      defaultMessage="Nullstill filter"
                      description="Nullstill filter knapp i filter-dialog"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
};
