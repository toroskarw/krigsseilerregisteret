import { Link } from "components/Link";

export interface NavLinkProps {
  className?: string;
  currentPath: string;
  message: string;
  linkPath: string;
  isDesktop?: boolean;
}

/**
 * Link component for top menu navigation.
 *
 * Displays an underline under the currently top-level page on desktop.
 */
export const NavLink = (props: NavLinkProps) => {
  const { className, currentPath, message, linkPath, isDesktop } = props;
  // Check if root of current path and navlink path are equal

  const active = isDesktop && currentPath == linkPath;

  return (
    <Link
      className={`${
        className ? className : ""
      } no-underline border-b-4 border-beige ${
        !active ? "border-opacity-0" : ""
      }`}
      to={linkPath}
    >
      {message}
    </Link>
  );
};
