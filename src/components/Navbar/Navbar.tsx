import React from "react";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

export const Navbar: React.FunctionComponent = () => {
  // TODO: Sjekk om løsningen er OK ift. universell utforming.
  // - Hvilke utslag har display: none av disse for skjermlesere
  // - Se om det er behov for fokushåndtering m.m. react-aria er alternativ å se på
  return (
    <header>
      <div className="tablet:hidden">
        <Mobile />
      </div>
      <div className="hidden tablet:block">
        <Desktop />
      </div>
    </header>
  );
};
