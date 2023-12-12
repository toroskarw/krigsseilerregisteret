import config from "../../tailwind.config";

export const KSREG_URL = "https://www.krigsseilerregisteret.no";
export const REVERSE_PROXY_TO_KRIGSSEILERREGISTERET_API_PREFIX =
  "krigsseilerregisteret";

export const breakpoints = {
  tablet: 768,
  desktop: 1280,
};

export const colors = config.theme.colors;

export const convertToReverseProxyLink = (path: string) => {
  return `/${REVERSE_PROXY_TO_KRIGSSEILERREGISTERET_API_PREFIX}${path}`;
};
