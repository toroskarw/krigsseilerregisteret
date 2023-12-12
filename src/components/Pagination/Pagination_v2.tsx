import { useSize } from "hooks";
import Image from "next/image";
import React from "react";
import { FormattedMessage } from "react-intl";
import { generatePageItems } from "./util";

interface PaginationProps {
  pageCount: number;
  currentPage?: number;
  ellipsis?: string;
  onPageChange?: (page: number) => void;
  isMini?: boolean;
}

/**
 * Pagination component, with ellipses, previous and next buttons
 *
 * @param pageCount Number of pages in total
 * @param currentPage Index of current page, zero-based
 * @param maxPageItemCount Maximum number of navigation items to render, minimum 7
 * @param ellipsis Content for ellipsis item
 * @param pathResolver Function to return href content based on page number, zero-based
 */
export const Pagination_v2 = ({
  pageCount,
  currentPage = 0,
  onPageChange,
  isMini,
}: PaginationProps) => {
  /* Set the number of navigation elements in pagination based on component width */
  const target = React.useRef(null);
  const componentSize = useSize(target) ?? { width: 0 };
  let maxPageItemCount = 5;
  if (componentSize.width > 600) maxPageItemCount = 7;
  if (componentSize.width > 1000) maxPageItemCount = 9;

  const pageItems = generatePageItems(pageCount, currentPage, maxPageItemCount);
  const existsPrevious = currentPage > 0;
  const existsNext = currentPage < pageCount - 1;
  if (currentPage >= pageCount) currentPage = pageCount; // Clicking "previous" will then return the user to the last page containing results. Other solutions to out-of-bounds page number are possible!

  const listElementStyle =
    "mr-2 bg-gray-10 border border-gray-60 py-1.5 px-3 rounded-sm no-underline";
  const currentElementStyle =
    "mr-2 border border-gray-60 py-1.5 px-3 rounded-sm no-underline";

  const previousText = (
    <FormattedMessage defaultMessage="Forrige" description="Pagination back" />
  );
  const nextText = (
    <FormattedMessage defaultMessage="Neste" description="Pagination forward" />
  );

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  /* Mini-version for top of results list */
  // TODO: Idea for UX improvement: Make the box displaying the number of the current page an input
  //       with submit on enter, to navigate to other pages.
  if (isMini) {
    return (
      <div ref={target} className="flex items-center">
        {existsPrevious && (
          <button onClick={() => onPrevious()} className={listElementStyle}>
            <Image src="/images/chevron-left.svg" width={7} height={12} />
          </button>
        )}
        <div className={currentElementStyle}>{currentPage + 1}</div>
        {existsNext && (
          <button onClick={() => onNext()} className={listElementStyle}>
            <Image src="/images/chevron-right.svg" width={7} height={12} />
          </button>
        )}
        <span className="text-darkblue-60">
          <FormattedMessage defaultMessage="av" description="of" /> {pageCount}
        </span>
      </div>
    );
  }

  /* Full version for bottom of results list */
  return (
    <nav className="flex justify-center font-normal" ref={target}>
      <ul className="flex items-center text-sm">
        {existsPrevious ? (
          <li className={listElementStyle}>
            <button onClick={() => onPrevious()}>{previousText}</button>
          </li>
        ) : (
          <span className="mr-3 font-medium text-darkblue-30">
            {previousText}
          </span>
        )}

        {/* Expand to wider pagination version when component is wider than 400px (that's when it will fit), otherwise display smaller version. */}
        {componentSize.width >= 400 &&
          pageItems.map((item) =>
            typeof item === "number" ? (
              // Render button with page number
              <li key={item}>
                {currentPage == item ? (
                  <div className={currentElementStyle}>{item + 1}</div>
                ) : (
                  <div>
                    <button
                      className={listElementStyle}
                      type="button"
                      onClick={() => onPageChange(item)}
                    >
                      {item + 1}
                    </button>
                  </div>
                )}
              </li>
            ) : (
              // Render ellipsis
              <li key={item} className="pb-2 mr-2 align-text-top">
                <div>…</div>
              </li>
            )
          )}
        {existsNext ? (
          <li>
            <button className={listElementStyle} onClick={() => onNext()}>
              {nextText}
            </button>
          </li>
        ) : (
          <span className="ml-1 font-medium text-darkblue-30">{nextText}</span>
        )}
      </ul>
    </nav>
  );
};
