import * as React from "react";
import { SVGProps } from "react";

export const DownloadIcon = (props: SVGProps<SVGSVGElement>) => {
  const width = props.width ? props.width : "18px";
  const height = props.height ? props.height : "24px";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      // style={{
      //   enableBackground: "new 0 0 384 512",
      // }}
      xmlSpace="preserve"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M369.9 98 286 14.1C277 5.1 264.8 0 252.1 0H48C21.5.1 0 21.6 0 48.1V464c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V132c0-12.7-5.1-25-14.1-34zM256 32.6c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9c2.1 2.1 3.5 4.6 4.2 7.4H256V32.6zM352 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V48.1C32 39.3 39.2 32 48 32h176v104.1c0 13.3 10.7 23.9 24 23.9h104v304zM208 216c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v88h-52.7c-11 0-20.6 6.4-25 16.7-4.5 10.5-2.4 22.6 5.4 30.8l68.1 71.8c5.3 5.6 12.5 8.7 20.1 8.7s14.8-3.1 20.1-8.7l68.1-71.8c7.8-8.2 9.9-20.3 5.4-30.8-4.4-10.3-14-16.7-25-16.7H208v-88zm42.8 120L192 398l-58.8-62h117.6z"
        // style={{
        //   fill: "#00192e",
        // }}
      />
    </svg>
  );
};
