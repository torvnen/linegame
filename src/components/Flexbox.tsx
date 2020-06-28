import React, { HTMLProps } from "react";

const Flexbox = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} style={{ display: "flex", ...props.style }}>
      {props.children}
    </div>
  );
};

export default Flexbox;
