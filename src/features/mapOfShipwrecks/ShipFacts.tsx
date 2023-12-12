import { Fact } from "components/Factbox";
import { ReactNode } from "react";

export interface ShipFactsProps {
  groupHeading: ReactNode;
  facts: Fact[];
  className?: string;
}

export const ShipFactGroup = ({
  groupHeading,
  facts,
  className,
}: ShipFactsProps) => {
  if (facts.filter((fact) => fact.value).length > 0) {
    return (
      <div className={className}>
        <h2 className="text-sm tablet:text-base font-semibold">
          {groupHeading}
        </h2>

        {facts.map((fact) => {
          return (
            fact.value && (
              <div className="mb-1 tablet:mb-5" key={fact.key}>
                <dt className="font-normal">{fact.label}: </dt>
                <dd className="">{fact.value}</dd>
              </div>
            )
          );
        })}
      </div>
    );
  } else return null;
};
