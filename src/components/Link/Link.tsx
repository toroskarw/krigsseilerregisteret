import leaveIcon from "@/images/leave-icon.svg";
import { IMetadata } from "domain/content";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface LinkProps {
  to: string | URL;
  locale?: "no" | "en";
  className?: string;
  passHref?: boolean;
  role?: string;
  metadata?: IMetadata;
  openInNewWindow?: boolean;
  scroll?: boolean;
}

/**
 * A wrapper component for the Next.js Link component, to
 * 1) require less space and typing by automatically including the anchor tag and necessary props, and
 * 2) make it more similar to the React Link component.
 */
export const Link: FC<LinkProps> = ({
  to,
  children,
  locale,
  passHref = true,
  className,
  metadata,
  ...props
}) => {
  const router = useRouter();

  if (
    metadata &&
    metadata.publishedTo.sjohistorie === true &&
    metadata.publishedTo.krigsseilerregisteret === false
  ) {
    return (
      <a
        href={`http://sjohistorie.no/${router.locale}${to}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
        <span className="ml-1">
          <Image src={leaveIcon} height={12} width={12} />
        </span>
      </a>
    );
  }

  if (
    metadata &&
    metadata.publishedTo.sjohistorie === false &&
    metadata.publishedTo.krigsseilerregisteret === false
  ) {
    return <>{children}</>;
  }

  // Workaround: A "nonce" string is used in the anchor tag together with the passHref parameter,
  // so that the anchor tag itself gets a correct href per jsx-a11y requirements.
  return (
    <NextLink
      href={to}
      locale={locale}
      passHref={passHref}
      scroll={props.scroll}
    >
      <a
        href="nonce"
        className={className}
        role={props.role}
        target={props.openInNewWindow ? "_blank" : "_self"}
        rel={props.openInNewWindow ? "noreferrer" : ""}
      >
        <>{children}</>
      </a>
    </NextLink>
  );
};
