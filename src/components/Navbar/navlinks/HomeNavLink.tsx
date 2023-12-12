import { Link } from "components/Link";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import paths from "util/paths";

export interface HomeNavLinkProps {
  className?: string;
  isDesktop?: boolean;
  logoDimension?: number;
  isInFocus?: boolean;
}

export const HomeNavLink = (props: HomeNavLinkProps) => {
  const { className, isDesktop, logoDimension, isInFocus } = props;

  return (
    <Link className={className} to={paths.homePage}>
      {isDesktop ? (
        <div
          className={
            !isInFocus
              ? "flex justify-center items-center bg-white p-0.5 rounded-full"
              : null
          }
        >
          <Image
            height={logoDimension}
            width={logoDimension}
            alt="Krigsseilerregisteret logo"
            src="/images/krigsseilerregisteret-logo.png"
            quality={100}
          />
        </div>
      ) : (
        <FormattedMessage
          defaultMessage="Hjem"
          description="Navigation link text to Seafarer archive"
        />
      )}
    </Link>
  );
};
