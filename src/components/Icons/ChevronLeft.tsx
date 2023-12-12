import * as React from "react";
import { SVGProps } from "react";

// TODO: Bytt ut med ArrowIcon direction left

export const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => {
  const width = props.width ? props.width : "7px";
  const height = props.height ? props.height : "12px";
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.69 11.29a.996.996 0 0 0 0-1.41L2.81 6l3.88-3.88A.997.997 0 1 0 5.28.71L.69 5.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.02.38 1.41-.01Z" />
    </svg>
  );
};
