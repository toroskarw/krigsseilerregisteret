import { NextRouter } from "next/router";

export const getNewQuery = (
  router: NextRouter,
  key: string,
  value: string | undefined
) => {
  const newQuery = { ...router.query };
  if (value === undefined) {
    delete newQuery[key];
  } else {
    delete newQuery["page"];
    newQuery[key] = value;
  }
  return {
    pathname: router.pathname,
    query: newQuery,
  };
};

export const pushNewQuery = (
  router: NextRouter,
  query: {
    pathname: string;
    query: { [key: string]: string | Array<string> };
  }
) => {
  router.push(query);
};

export const shipTabIndexToSubrouteMap = new Map<number, string>([
  [0, ""],
  [1, "monstringer"],
  [2, "bilder"],
  [3, "dokumenter"],
  [4, "innsats"],
]);

export const shipSubrouteToTabIndexMap = new Map<string, number>();
shipTabIndexToSubrouteMap.forEach((value, key) => {
  shipSubrouteToTabIndexMap.set(value, key);
});

export const seafarerTabIndexToSubrouteMap = new Map<number, string>([
  [0, ""],
  [1, "monstringer"],
  [2, "tjenestesteder"],
  [3, "utmerkelser"],
  [4, "bilder"],
  [5, "dokumenter"],
]);

export const seafarerSubrouteToTabIndexMap = new Map<string, number>();
seafarerTabIndexToSubrouteMap.forEach((value, key) => {
  seafarerSubrouteToTabIndexMap.set(value, key);
});

export const shipwreckTabIndexToSubrouteMap = new Map<number, string>([
  [0, ""],
  [1, "dekksdagbok"],
  [2, "mannskap"],
]);

export const shipwreckSubrouteToTabIndexMap = new Map<string, number>();
shipwreckTabIndexToSubrouteMap.forEach((value, key) => {
  shipwreckSubrouteToTabIndexMap.set(value, key);
});

export const navigationValidYears: string[] = [
  "all",
  "1940",
  "1941",
  "1942",
  "1943",
  "1944",
  "1945",
];
