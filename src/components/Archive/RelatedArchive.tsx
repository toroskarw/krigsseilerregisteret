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

interface RelatedArchiveProps<TRowData, TAggregationType> {
  columns: Array<IColumn>;
  archive: IArchive<TRowData, TAggregationType>;
  onRenderRow: (rowdata: TRowData, className: string) => JSX.Element;
  onRenderFilters: () => Array<JSX.Element>;
  onRenderCustomTools?: () => JSX.Element;
  pathResolver: (urlSearchParams?: Record<string, string>) => string;
  i18n: {
    heading?: string;
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

export function RelatedArchive<TRowData, TAggregationType>({
  archive,
  i18n,
  pathResolver,
  onRenderRow,
  columns,
  onRenderFilters,
}: RelatedArchiveProps<TRowData, TAggregationType>) {
  const router = useRouter();

  const currentPath = router.asPath;
  const currentLocation = currentPath.includes("?")
    ? currentPath.substring(0, currentPath.indexOf("?"))
    : currentPath;

  const currentActiveQuery = archive.query;

  const [query, setQuery] = useDebounce(archive.query, 100);

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
      <div className="mx-auto tablet:p-10 desktop:px-0 desktop:max-w-5xl">
        <div className="desktop:flex desktop:items-center tablet:flex tablet:items-center mb-7 ">
          <div className="mt-2 mb-2 items-center">
            <Filter
              activeQuery={query}
              total={archive.total}
              currentPath={currentLocation}
            >
              {onRenderFilters()}
            </Filter>
          </div>
          <div
            className="flex desktop:place-content-end  py-5 mx-auto w-full tablet:py-0"
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
                setQuery(evt.target.value);
                evt.preventDefault();
              }}
              className="border-1 border-darkblue placeholder-gray rounded-l-lg desktop:w-96 w-full"
            />
            <div className="flex items-center py-4 px-5 rounded-r-xl bg-beige">
              <SearchIcon />
            </div>
          </div>
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
            <div className="flex items-center text-darkblue desktop:hidden tablet:hidden">
              <span className="tablet:hidden">{resultsPerPageText}</span>
              <span className="hidden tablet:inline">
                {resultsPerPageTextTablet}
              </span>
              <div className="">
                <PageSizeSelect />
              </div>
            </div>
            <div className="hidden desktop:block tablet:block ">
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
          <table className="w-full text-left table-auto tablet:table-fixed ">
            <thead className="h-16">
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
    </div>
  );
}
