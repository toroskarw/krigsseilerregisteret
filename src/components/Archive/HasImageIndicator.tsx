import Image from "next/image";

export const HasImageIndicator = () => {
  return (
    <Image src={"/images/image-placeholder-icon.svg"} width={25} height={19} />
  );
};
