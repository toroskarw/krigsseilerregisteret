import { Link } from "components/Link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import paths from "util/paths";
import { navLinkMessages } from "./messages";
import { HomeNavLink } from "./navlinks/HomeNavLink";
import { NavLink } from "./navlinks/NavLink";

export const Desktop: FunctionComponent = () => {
  const intl = useIntl();
  const router = useRouter();
  const { asPath, locale, pathname } = router;

  const [isTop, setIsTop] = useState(true);
  const isFrontpage = pathname === paths.homePage;
  const isInFocus = isTop && isFrontpage;
  const logoDimension = isInFocus ? 74 : 46;

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      }
      if (window.scrollY > 0) {
        setIsTop(false);
      }
    };
    if (isFrontpage) {
      window.addEventListener("scroll", checkScroll);
      // Remove event listener on cleanup
      return () => window.removeEventListener("scroll", checkScroll);
    }
  });

  return (
    <div className={isFrontpage ? "absolute w-full" : "relative"}>
      <div className="text-white">
        <nav
          className={`flex justify-center items-center py-2 tracking-wide font-medium space-x-12 ${
            !isInFocus && "bg-purple"
          }`}
        >
          <NavLink
            isDesktop
            currentPath={pathname}
            message={intl.formatMessage(navLinkMessages.seafarerArchive)}
            linkPath={paths.seafarerArchive()}
          />
          <NavLink
            isDesktop
            currentPath={pathname}
            message={intl.formatMessage(navLinkMessages.shipArchive)}
            linkPath={paths.shipArchive()}
          />
          <HomeNavLink
            isDesktop
            isInFocus={isInFocus}
            logoDimension={logoDimension}
          />
          <NavLink
            isDesktop
            currentPath={asPath}
            message={intl.formatMessage(navLinkMessages.effortArchive)}
            linkPath={paths.navigationPage("822091")}
          />
          <NavLink
            isDesktop
            currentPath={asPath}
            message={intl.formatMessage(navLinkMessages.topicsPage)}
            linkPath={paths.navigationPage("tema")}
          />
        </nav>
        <div className="absolute top-5 right-10 desktop:right-12">
          <Link
            to={asPath}
            locale={locale === "no" ? "en" : "no"}
            className="text-xs no-underline uppercase hover:underline"
          >
            {locale === "no" ? "English" : "Norsk"}
          </Link>
        </div>
      </div>
    </div>
  );
};
