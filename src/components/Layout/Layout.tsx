import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";

export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Global layout for the website
 * Static parts of <head> are declared here.
 */
export const Layout = ({ children }: LayoutProps) => {
  const { query } = useRouter();

  const navbarClasses =
    query?.menuOption === "static" ? "top-0 z-50" : "sticky top-0 z-50";

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          key="viewport"
        />
        <meta charSet="utf-8" />
      </Head>
      <div className={navbarClasses}>
        <Navbar />
      </div>
      <main className="relative">{children}</main>
      <Footer />
    </>
  );
};
