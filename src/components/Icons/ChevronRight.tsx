import * as React from "react";
import { colors } from "util/constants";

// TODO: Bytt ut med ArrowIcon direction right

interface ChevronRightIconProps {
  fill?: string;
  height?: number;
  width?: number;
}

export const ChevronRightIcon = (
  props: React.SVGProps<SVGSVGElement & ChevronRightIconProps>
) => {
  const { fill = colors.darkblue[60], height = 12, width = 7 } = props;
  return (
    // <svg
    //   width={width}
    //   height={height}
    //   fill={"red"}
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path d="M.31.71a.996.996 0 0 0 0 1.41L4.19 6 .31 9.88a.997.997 0 1 0 1.41 1.41L6.31 6.7a.996.996 0 0 0 0-1.41L1.72.7C1.34.32.7.32.31.71Z" />
    // </svg>
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.31.71a.996.996 0 0 0 0 1.41L4.19 6 .31 9.88a.997.997 0 1 0 1.41 1.41L6.31 6.7a.996.996 0 0 0 0-1.41L1.72.7C1.34.32.7.32.31.71Z"
        fill={fill}
      />
    </svg>
  );
};
