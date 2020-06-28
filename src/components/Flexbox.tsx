import React, { HTMLProps } from "react";
import { useThemeSetter } from "../hooks/useThemeSetter";

const Flexbox = (props: HTMLProps<HTMLDivElement>) => {
  const { theme } = useThemeSetter();
  return (
    <div
      {...props}
      style={{ display: "flex", color: theme.palette.text.primary, ...props.style }}
    >
      {props.children}
    </div>
  );
};

export default Flexbox;
