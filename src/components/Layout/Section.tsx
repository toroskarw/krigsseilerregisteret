export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section = (props: SectionProps) => {
  return (
    <div
      className={`tablet:container tablet:mx-auto desktop:max-w-5xl ${
        props.className || ""
      }`}
    >
      {props.children}
    </div>
  );
};
