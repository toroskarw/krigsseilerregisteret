import { Flag } from "components/Flag";

export interface OriginProps {
  countryCode?: string;
  displayName?: string;
  className?: string;
}

export const Origin = ({
  countryCode,
  displayName,
  className,
}: OriginProps) => {
  return (
    <div
      className={
        className ?? "flex flex-col-reverse tablet:flex-row tablet:flex-wrap"
      }
    >
      <div className="flex-none tablet:mr-3">
        <Flag countryCode={countryCode} />
      </div>

      <div className="flex-1 mb-1">{displayName}</div>
    </div>
  );
};
