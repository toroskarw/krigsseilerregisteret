import Image from "next/image";
import React from "react";
import { FormattedMessage } from "react-intl";

/**
 * Top comment on shipwreck profile page
 */
export const TopComment = () => {
  return (
    <div className="flex gap-x-4 items-center p-5 tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
      <div className="w-20">
        <Image
          src="/images/exclamation-circle-icon.svg"
          height={18}
          width={18}
        />
      </div>
      <div>
        <p className="text-sm">
          <FormattedMessage
            defaultMessage="Informasjonen nedenfor vedr. skip i Nortraships flåte er direkte avskrift av orginalkilden 'Sjøforklaringer fra andre verdenskrig (1940-1945)'. Informasjonen her er fra sjøforklaringer holdt under og rett etter krigen og kan derfor avvike noe fra den øvrige kvalitetssikrede informasjonen i Krigsseilerregisteret."
            description=""
          />
        </p>
      </div>
    </div>
  );
};
