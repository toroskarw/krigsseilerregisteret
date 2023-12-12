import { Link } from "components/Link";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";
import paths from "util/paths";

export const Footer = () => {
  const intl = useIntl();
  return (
    <footer className="text-sm">
      <div className="flex bg-beige-60">
        <div className="flex flex-grow items-center py-11 px-12 mx-auto max-w-xs font-semibold tablet:w-12">
          <div className="mr-1">
            <FormattedMessage
              defaultMessage="Følg oss"
              description="Follow us"
            />
          </div>
          <ul className="flex flex-grow justify-around">
            <li>
              <a
                href="https://www.facebook.com/Krigsseilerne"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={"/images/facebook.svg"}
                  height={29}
                  width={29}
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/krigsseilerne"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={"/images/instagram.svg"}
                  height={29}
                  width={29}
                  alt="Instagram"
                />
              </a>
            </li>
            <li>
              <a
                href="https://krigsseilerblogg.wordpress.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={"/images/blogg.svg"}
                  height={29}
                  width={29}
                  alt="Blogg"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-5 pt-14 pb-24 text-white bg-purple">
        <div className="flex justify-center">
          <a href={paths.homePage} className="p-0 m-0">
            <Image
              height={60}
              width={60}
              alt="Krigsseilerregisteret logo"
              src="/images/krigsseilerregisteret-logo.png"
            />
          </a>
        </div>
        <hr className="mx-auto mt-4 mb-5 w-1/5 max-w-xs" />
        <p className="text-center">
          <FormattedMessage
            defaultMessage="Krigsseilerregisteret eies og drives av"
            description="Krigsseilerregisteret eies og drives av"
          />{" "}
          <a
            href="https://arkivet.no/satsingsomraader/krigsseilerhistorie/norsk-senter-for-krigsseilerhistorie"
            className="no-underline hover:underline"
          >
            <FormattedMessage
              defaultMessage="Norsk senter for krigsseilerhistorie"
              description="Footer link text"
            />
          </a>
        </p>
        <div className="desktop:flex desktop:mt-12 desktop:space-x-20 desktop:justify-center">
          <div className="">
            <div className="flex justify-center my-10 desktop:m-0">
              <button className="py-2 px-9 font-semibold border hover:bg-white hover:text-darkblue">
                <Link
                  to={paths.article(
                    intl.formatMessage({
                      defaultMessage: "krigsseilerregisteret-kontakt",
                      description: "artikkellenke",
                    })
                  )}
                  className="no-underline"
                >
                  <FormattedMessage
                    defaultMessage="Kontakt oss"
                    description="Footer link text"
                  />
                </Link>
              </button>
            </div>
          </div>
          <ul className="grid gap-y-3 gap-x-10 mx-auto w-11/12 tablet:grid-cols-2 tablet:grid-rows-4 tablet:w-96 tablet:grid-flow-col tablet:whitespace-nowrap">
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage: "krigsseilerregisteret-i-korte-trekk-no",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Utviklingen av registeret"
                  description="Footer link text"
                />
              </Link>
            </li>
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage: "redaktorer-for-krigsseilerregisteret",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Redaktører"
                  description="Footer link text"
                />
              </Link>
            </li>
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage: "bakgrunn-for-krigsseilerregisteret",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Bakgrunn"
                  description="Footer link text"
                />
              </Link>
            </li>
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage: "kilder-til-krigsseilerregisteret",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Kilder"
                  description="Footer link text"
                />
              </Link>
            </li>
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage: "stottespillere-for-krigsseilerregisteret",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Våre støttespillere"
                  description="Footer link text"
                />
              </Link>
            </li>
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage:
                      "stott-vaart-arbeid-med-krigsseilerregisteret",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Støtt vårt arbeid"
                  description="Footer link text"
                />
              </Link>
            </li>
            <li>
              <a
                href="https://arkivet.no/satsingsomraader/forskning/jon-michelets-mastergradsstipend"
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Jon Michelet mastergradsstipend"
                  description="Footer link text"
                />
              </a>
            </li>
            <li>
              <Link
                to={paths.article(
                  intl.formatMessage({
                    defaultMessage: "krigsseilerregisteret-personvern",
                    description: "artikkellenke",
                  })
                )}
                className="no-underline hover:underline"
              >
                <FormattedMessage
                  defaultMessage="Personvern"
                  description="Footer link text"
                />
              </Link>
            </li>
          </ul>
          <div className="flex justify-center mt-12 desktop:m-0">
            <a href="https://arkivet.no/">
              <Image
                height={80}
                width={230}
                alt="Stiftelsen Arkivet logo"
                src="/images/arkivet-logo.svg"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
