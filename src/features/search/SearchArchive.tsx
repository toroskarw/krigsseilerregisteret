import { Types } from "components/Facets/Types";
import { ISearchArchive } from "domain/searchArchive";
import { FormattedMessage, useIntl } from "react-intl";
import { Archive, IColumn } from "../../components/Archive/Archive";
import { Link } from "../../components/Link";
import { getFormattedDate, getFullName } from "../../util/format";
import paths from "../../util/paths";
import { SearchArchiveItem } from "./SearchArchiveItem";

interface SearchArchiveProps {
  archive: ISearchArchive;
  totalCount: number;
}

const columns: Array<IColumn> = [
  {
    id: "name",
    className: "pl-3 rounded-tl-xl tablet:py-8 tablet:pl-7 desktop:w-full",
    title: (
      <FormattedMessage
        defaultMessage="Navn/Tittel"
        description="Search archive: Navn/Tittel"
      />
    ),
  },
];

export const SearchArchive = ({ archive, totalCount }: SearchArchiveProps) => {
  const intl = useIntl();

  return (
    <div>
      <Archive
        columns={columns}
        archive={archive}
        hideSearchHits={true}
        onRenderFilters={() => {
          return [<Types key="types" facet={archive.aggregations.types} />];
        }}
        onRenderCustomTools={() => {
          return (
            <div className="tablet:flex">
              <div className="tablet:flex-1"></div>
              <div className="tablet:content-end desktop:pl-4"></div>
            </div>
          );
        }}
        onRenderRow={(searchHit, className) => {
          return (
            <tr key={searchHit.id} className={className}>
              <td className="py-3 pl-4 break-words tablet:break-normal tablet:pl-7">
                {searchHit.type.toString() === "SEAFARER" && (
                  <>
                    <Link className="mb-2" to={paths.seafarer(searchHit.id)}>
                      {searchHit.title ??
                        getFullName(searchHit?.firstName, searchHit?.lastName)}
                    </Link>
                    <p className="text-sm mb-2">
                      <FormattedMessage
                        defaultMessage="Født {birthDate} i {place}"
                        description="Born {birthDate} in {place}"
                        values={{
                          birthDate: getFormattedDate(
                            searchHit.birthYear,
                            searchHit.birthMonth,
                            searchHit.birthDay
                          ),
                          place: searchHit.placeOfBirth,
                        }}
                      />
                    </p>
                    <p
                      className="text-xs"
                      dangerouslySetInnerHTML={{ __html: searchHit.highlight }}
                    ></p>
                  </>
                )}
                {searchHit.type.toString() === "SHIP" && (
                  <>
                    <Link className="mb-2" to={paths.ship(searchHit.id)}>
                      {searchHit.title}
                    </Link>{" "}
                    <p className="text-sm mb-2">
                      <FormattedMessage
                        defaultMessage="Bygget "
                        description="Search archive: Bygget "
                      />
                      {searchHit.buildYear}
                    </p>
                    <p
                      className="text-xs"
                      dangerouslySetInnerHTML={{ __html: searchHit.highlight }}
                    ></p>
                  </>
                )}
                {searchHit.type.toString() === "NAVIGATIONPAGE" && (
                  <SearchArchiveItem
                    pathTo={paths.navigationPage(searchHit.id)}
                    searchHit={searchHit}
                  />
                )}
                {searchHit.type.toString() === "WARSAILORSJOURNAL" && (
                  <SearchArchiveItem
                    pathTo={paths.warsailorsjournalPage(searchHit.id)}
                    searchHit={searchHit}
                  />
                )}
                {searchHit.type.toString() === "SHIPWRECK" && (
                  <SearchArchiveItem
                    pathTo={paths.shipwreck(searchHit.id)}
                    searchHit={searchHit}
                  />
                )}
                {searchHit.type.toString() === "ARTICLE" && (
                  <SearchArchiveItem
                    pathTo={paths.article(searchHit.id)}
                    searchHit={searchHit}
                  />
                )}
                {searchHit.type.toString() === "AWARD" && (
                  <SearchArchiveItem
                    pathTo={paths.award(searchHit.id)}
                    searchHit={searchHit}
                  />
                )}
              </td>
            </tr>
          );
        }}
        pathResolver={paths.searchArchive}
        i18n={{
          heading: intl.formatMessage(
            {
              defaultMessage: "Søk i alt innhold på nettsiden",
              description: "Search arhive page heading",
            },
            {
              total: totalCount,
            }
          ),
          searchBoxPlaceholderText: intl.formatMessage({
            defaultMessage: "Skriv inn ditt søkeord",
            description: "Archive page search input placeholder text",
          }),
        }}
      />
    </div>
  );
};
