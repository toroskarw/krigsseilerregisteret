import { Link } from "components/Link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import paths from "util/paths";
import { navLinkMessages } from "./messages";
import { HomeNavLink } from "./navlinks/HomeNavLink";
import { NavLink } from "./navlinks/NavLink";

export const Mobile = () => {
  const intl = useIntl();
  const router = useRouter();
  const { asPath, locale, pathname } = router;

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router]);

  return (
    <div>
      <div className="flex items-center h-24 text-white bg-purple">
        <Link to={paths.homePage} className="block z-30 mx-auto">
          <div className="flex justify-center items-center p-0.5 bg-white rounded-full w-18 h-18">
            <Image
              height={68}
              width={68}
              alt="Krigsseilerregisteret logo"
              src="/images/krigsseilerregisteret-logo.png"
            />
          </div>
        </Link>
      </div>

      <div>
        <div className="absolute left-4 top-7">
          <button
            className="flex justify-center items-center w-12 h-12"
            onClick={() => {
              setIsMobileMenuOpen(true);
            }}
          >
            <Image
              alt=""
              src="/images/mobile-menu.svg"
              width={40}
              height={40}
            />
          </button>
        </div>
        {isMobileMenuOpen ? (
          <div className="container absolute top-0 left-0 font-medium bg-white rounded-b-2xl shadow-sm">
            <nav className="relative pl-6 mt-24 space-y-2 text-2xl">
              <HomeNavLink className="block no-underline" />
              <NavLink
                className="block"
                currentPath={pathname}
                message={intl.formatMessage(navLinkMessages.seafarerArchive)}
                linkPath={paths.seafarerArchive()}
              />
              <NavLink
                className="block"
                currentPath={asPath}
                message={intl.formatMessage(navLinkMessages.shipArchive)}
                linkPath={paths.shipArchive()}
              />

              <NavLink
                className="block"
                currentPath={pathname}
                message={intl.formatMessage(navLinkMessages.effortArchive)}
                linkPath={paths.navigationPage("822091")}
              />
              <NavLink
                className="block"
                currentPath={pathname}
                message={intl.formatMessage(navLinkMessages.topicsPage)}
                linkPath={paths.navigationPage("tema")}
              />
            </nav>
            <div className="flex justify-center items-center space-x-3 h-32 text-sm uppercase">
              {locale === "no" ? (
                <>
                  <span className="text-darkblue-30">Norsk</span>
                  <Link
                    to={asPath}
                    locale="en"
                    className="no-underline hover:underline"
                  >
                    English
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={asPath}
                    locale="no"
                    className="no-underline hover:underline"
                  >
                    Norsk
                  </Link>
                  <span className="text-darkblue-30">English</span>
                </>
              )}
            </div>
            <button
              className="flex absolute left-4 top-7 justify-center items-center w-12 h-12"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              <Image alt="" src="/images/close.svg" width={40} height={40} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
