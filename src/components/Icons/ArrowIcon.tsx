import * as React from "react";
import { SVGProps } from "react";

const directions = {
  up: "rotate(180)",
  down: "rotate(0)",
  left: "rotate(90)",
  right: "rotate(270)",
};

interface ArrowIconProps {
  direction: "up" | "down" | "left" | "right";
}

export const ArrowIcon = (props: SVGProps<SVGSVGElement> & ArrowIconProps) => {
  const width = props.width ? props.width : "14px";
  const height = props.height ? props.height : "9px";
  const rotation = directions[props.direction];
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      transform={rotation}
    >
      <path d="M13.613.637a1.245 1.245 0 0 0-1.763 0L7 5.487 2.15.638A1.246 1.246 0 1 0 .388 2.4l5.737 5.737a1.245 1.245 0 0 0 1.763 0L13.625 2.4a1.256 1.256 0 0 0-.012-1.763Z" />
    </svg>
  );
};
