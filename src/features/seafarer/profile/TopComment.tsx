import Image from "next/image";
import React from "react";
import { FormattedMessage } from "react-intl";

/**
 * Top comment on seafarer profile page about the profile not necessarily being complete
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
            defaultMessage="Informasjonen om registrerte krigsseilere er ikke nødvendigvis fullstendig. Eksempelvis vil mønstringer og utmerkelser for enkelte sjøfolk bli registrert senere, ettersom nye kilder blir gjennomgått."
            description=""
          />
        </p>
      </div>
    </div>
  );
};
