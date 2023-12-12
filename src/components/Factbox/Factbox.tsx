import { ReactNode } from "react";

export interface Fact {
  key: number | string;
  label: ReactNode;
  value: ReactNode | Fact[];
}

export interface FactboxProps {
  facts: Fact[];
  type: "ship" | "seafarer" | "shipwreck";
}

export const FactboxContent = ({ facts, type }: FactboxProps) => {
  return (
    <dl className="grid tablet:block tablet:list-cols-3 desktop:list-cols-4">
      {facts.map((fact, index) => {
        return fact.value ? (
          <div
            className={`inline-block mb-2 tablet:mb-5 tablet:w-48`}
            key={fact.key}
          >
            <dt className="">{fact.label}</dt>
            <dd className="inline-block">{fact.value}</dd>
          </div>
        ) : null;
      })}
    </dl>
  );
};
