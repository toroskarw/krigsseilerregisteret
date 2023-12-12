export const getFirstElement = <T>(
  singleOrArray: undefined | T | T[]
): T | null => {
  if (singleOrArray) {
    return Array.isArray(singleOrArray) ? singleOrArray[0] : singleOrArray;
  } else return null;
};
