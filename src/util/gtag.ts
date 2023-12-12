export const GA_TRACKING_ID = "G-LG2YW8VLV8";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  (window as unknown as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  (window as unknown as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
