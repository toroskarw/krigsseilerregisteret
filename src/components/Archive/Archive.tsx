import { useDebounce } from "@react-hook/debounce";
import { SearchIcon } from "components/Icons";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { IArchive } from "../../domain/archive";
import { PageSizeSelect } from "../PageSizeSelect";
import { Pagination } from "../Pagination";
import { Filter } from "./Filter";

export interface IColumn {
  title: string | JSX.Element;
  id: string;
  className?: string;
}

interface ArchiveProps<TRowData, TAggregationType> {
  columns: Array<IColumn>;
  archive: IArchive<TRowData, TAggregationType>;
  hideSearchHits?: boolean;
  onRenderRow: (rowdata: TRowData, className: string) => JSX.Element;
  onRenderFilters?: () => Array<JSX.Element>;
  onRenderCustomTools?: () => JSX.Element;
  pathResolver: (urlSearchParams?: Record<string, string>) => string;
  i18n: {
    heading: string;
    searchBoxPlaceholderText: string;
  };
}

const resultsPerPageText = (
  <FormattedMessage
    defaultMessage="Resultater per side"
    description="Results per page"
  />
);

const resultsPerPageTextTablet = (
  <FormattedMessage
    defaultMessage="Antall resultater per side"
    description="Results per page for tablet and desktop (longer)"
  />
);

export function Archive<TRowData, TAggregationType>({
  archive,
  hideSearchHits,
  i18n,
  pathResolver,
  onRenderRow,
  columns,
  onRenderFilters,
  onRenderCustomTools,
}: ArchiveProps<TRowData, TAggregationType>) {
  const router = useRouter();

  const currentActiveQuery = archive.query;

  const [query, setQuery] = useDebounce(archive.query, 100);
  const hideHits = hideSearchHits ? currentActiveQuery.length > 0 : true;

  const pushNewQuery = (
    key: string,
    value: string | undefined,
    removePage: boolean
  ) => {
    const newQuery = { ...router.query };
    if (value === undefined) {
      delete newQuery[key];
    } else {
      if (removePage) {
        delete newQuery["page"];
      }
      newQuery[key] = value;
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  React.useEffect(() => {
    if (query !== currentActiveQuery || query === "") {
      pushNewQuery("q", query, query !== currentActiveQuery);
    }
  }, [query, currentActiveQuery]);

  return (
    <div>
      <div className="flex-col pt-20 pb-10 bg-purple-10 tablet:py-14 desktop:pb-16 tablet:space-y-8">
        <h1 className="px-3 font-semibold text-center desktop:text-2xl">
          {i18n.heading}
        </h1>

        <div className="">
          <form
            className="flex justify-center py-5 mx-auto w-full tablet:py-0"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              autoComplete="off"
              type="text"
              id="archiveSearch"
              name="q"
              defaultValue={query}
              placeholder={i18n.searchBoxPlaceholderText}
              onChange={(evt) => {
                evt.preventDefault();
                setQuery(evt.target.value);
              }}
              className="py-4 px-4 h-12 rounded-l-xl border-0  focus:ring-darkblue-30 placeholder-gray text-md tablet:w-96 desktop:w-2/5 desktop:max-w-xl desktop:h-14"
            />
            <div className="flex items-center py-4 px-5 rounded-r-xl bg-beige">
              <SearchIcon />
            </div>
          </form>
        </div>
      </div>
      {hideHits && (
        <div className="p-4 mx-auto tablet:p-10 desktop:px-0 desktop:max-w-5xl">
          <div className="desktop:flex desktop:items-center">
            {onRenderFilters ? (
              <div className="mt-2 mb-2 desktop:flex-1 desktop:mt-0">
                <Filter activeQuery={query} total={archive.total}>
                  {onRenderFilters()}
                </Filter>
              </div>
            ) : null}
            {onRenderCustomTools ? (
              <div className="my-4 desktop:my-0 desktop:mb-6">
                {onRenderCustomTools()}
              </div>
            ) : null}
          </div>

          {/* Results section */}

          <div className="">
            <div className="flex justify-between items-center mb-2 text-sm font-normal">
              <div className="text-darkblue-60">
                <FormattedMessage
                  defaultMessage="{total, plural, =0 {Ingen treff} one {# treff} other {# treff}}"
                  description="search hits"
                  values={{
                    total: archive.total,
                  }}
                />
              </div>
              <div className="flex items-center text-darkblue">
                <span className="tablet:hidden">{resultsPerPageText}</span>
                <span className="hidden tablet:inline">
                  {resultsPerPageTextTablet}
                </span>
                <div className="">
                  <PageSizeSelect />
                </div>
              </div>
              <div className="hidden desktop:block">
                <Pagination
                  isMini
                  pageCount={Math.ceil(
                    archive.total / parseInt(archive.pagesize)
                  )}
                  currentPage={parseInt(archive.page)}
                  pathResolver={(page: number): string => {
                    return pathResolver({
                      ...router.query,
                      page: page.toString(),
                    });
                  }}
                />
              </div>
            </div>
            <table className="w-full text-left table-auto tablet:table-fixed">
              <thead className="h-20">
                <tr className="text-base bg-gray-20 text-semibold tablet:text-lg">
                  {columns.map((column) => {
                    return (
                      <th key={column.id} className={`${column.className}`}>
                        {column.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="font-normal">
                {archive.results.map((rowdata) => {
                  return onRenderRow(rowdata, "even:bg-gray-20");
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination section */}
          <div className="mt-12">
            <Pagination
              pageCount={Math.ceil(archive.total / parseInt(archive.pagesize))}
              currentPage={parseInt(archive.page)}
              pathResolver={(page: number): string => {
                return pathResolver({
                  ...router.query,
                  page: page.toString(),
                });
              }}
            />
          </div>

          <div className="flex justify-center items-center my-10 text-sm text-darkblue">
            {resultsPerPageText}
            <PageSizeSelect />
          </div>
        </div>
      )}
    </div>
  );
}
