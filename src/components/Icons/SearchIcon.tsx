import * as React from "react";
import { SVGProps } from "react";
import { colors } from "util/constants";

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  const { fill = colors.darkblue.DEFAULT, height = 16, width = 16 } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m16.105 14.446-3.524-3.524a6.51 6.51 0 0 0 1.305-3.917A6.552 6.552 0 0 0 7.342.46 6.552 6.552 0 0 0 .797 7.005a6.552 6.552 0 0 0 6.545 6.544 6.51 6.51 0 0 0 3.917-1.305l3.524 3.524a.937.937 0 0 0 1.322-1.322ZM2.667 7.005a4.674 4.674 0 1 1 9.349 0 4.674 4.674 0 0 1-9.349 0Z"
        fill={fill}
      />
    </svg>
  );
};
