import { ReactNode } from "react";

export interface TabSectionProps {
  children: ReactNode;
}

/**
 * A layout component used in the profile pages (seafarer, ship, shipwreck/inquiry),
 * to wrap the content of each tab section.
 */
export const TabSection = ({ children }: TabSectionProps) => {
  return (
    <div className="desktop:px-36">
      <div className="px-5 pt-7 pb-10 tablet:px-10 desktop:max-w-5xl desktop:mx-auto desktop:px-0 desktop:pt-12">
        {children}
      </div>
    </div>
  );
};
