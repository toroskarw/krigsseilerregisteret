module.exports = {
  images: {
    domains: [
      "krigsseilerregisteret.no",
      "sjohistorie.no",
      "purecatamphetamine.github.io",
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/krigsseilerregisteret/:path*",
        destination: "https://www.sjohistorie.no/:path*",
      },
    ];
  },
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false,
  },
};
