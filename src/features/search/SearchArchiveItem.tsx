import { ArchiveType } from "domain/archive";
import { ISearchArchiveResult } from "domain/searchArchive";
import { Link } from "../../components/Link";
import { valueToUppercase } from "../../util/format";

interface SearchArchiveItemProps {
  pathTo: string;
  searchHit: ISearchArchiveResult;
}

export const SearchArchiveItem = ({
  pathTo,
  searchHit,
}: SearchArchiveItemProps) => {
  return (
    <>
      <Link to={pathTo}>{searchHit.title}</Link>
      <p className="text-sm mb-2">
        {valueToUppercase(
          searchHit.type.toString() === "WARSAILORSJOURNAL"
            ? "Tidsskriftet Krigsseileren"
            : ArchiveType[searchHit.type].toString()
        )}
      </p>
      <p
        className="text-xs mb-2"
        dangerouslySetInnerHTML={{ __html: searchHit.highlight }}
      ></p>
    </>
  );
};
