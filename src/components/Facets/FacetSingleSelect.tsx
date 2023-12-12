import Link from "next/link";
import { useRouter } from "next/router";
import { IFacet } from "../../domain/archive";

export interface IBaseFacetProps {
  facet: IFacet;
}

interface IFacetSingleSelectProps extends IBaseFacetProps {
  queryParamName: string;
  displayName: string;
}

export const FacetSingleSelect = (props: IFacetSingleSelectProps) => {
  const router = useRouter();

  const currentValue = router.query[props.queryParamName]
    ? router.query[props.queryParamName].toString()
    : undefined;

  const newQuery = { ...router.query };
  if (currentValue === undefined) {
    delete newQuery["page"];
    newQuery[props.queryParamName] = "true";
  } else {
    delete newQuery[props.queryParamName];
  }

  const isSelected = currentValue !== undefined;

  return (
    <Link
      passHref
      href={{
        href: router.basePath,
        query: newQuery,
      }}
      scroll={false}
    >
      <a
        className={
          isSelected
            ? "flex items-center pl-3 pr-2 py-2 border border-darkblue-60 rounded bg-darkblue-60 text-white no-underline"
            : "flex  items-center pl-3 pr-2 py-2 border border-darkblue-60 rounded no-underline"
        }
        href="passed"
      >
        <span className="flex-1">{props.displayName}</span>
        <svg
          className=""
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="white"
            d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
          ></path>
        </svg>
      </a>
    </Link>
  );
};
