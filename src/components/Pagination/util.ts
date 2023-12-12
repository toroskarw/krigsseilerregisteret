// first, ..., prev, current, next, ..., last
const MINIMAL_PAGE_ITEM_COUNT = 3;

/**
 * Generate numeric page items around current page.
 *   - Always include first and last page
 *   - Add ellipsis if needed
 */
export const generatePageItems = (
  total: number,
  current: number,
  width: number
) => {
  if (width < MINIMAL_PAGE_ITEM_COUNT) {
    throw new Error(
      `Must allow at least ${MINIMAL_PAGE_ITEM_COUNT} page items`
    );
  }
  if (width % 2 === 0) {
    throw new Error(`Must allow odd number of page items`);
  }
  if (total < width) {
    return [...new Array(total).keys()];
  }
  const left = Math.max(
    0,
    Math.min(total - width, current - Math.floor(width / 2))
  );
  const items: (string | number)[] = new Array(width);
  for (let i = 0; i < width; i += 1) {
    items[i] = i + left;
  }
  // replace non-ending items with placeholders
  if (items[0] > 0) {
    items[0] = 0;
    items[1] = "prev-more";
  }
  if (items[items.length - 1] < total - 1) {
    items[items.length - 1] = total - 1;
    items[items.length - 2] = "next-more";
  }
  return items;
};

export const validatePageSize = (num: string) => {
  const integer = parseInt(num);
  if (Number.isNaN(integer)) {
    return 25;
  } else if (integer > 400) {
    return 400;
  } else if (integer <= 0) {
    return 25;
  } else return integer;
};

export const validatePageNumber = (num: string) => {
  const integer = parseInt(num);
  if (Number.isNaN(integer) || integer < 0) {
    return 0;
  } else return integer;
};
