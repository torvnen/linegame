import React, { HTMLProps } from "react";
import { useThemeSelector } from "../hooks/useThemeSelector";

const Flexbox = (props: HTMLProps<HTMLDivElement>) => {
  const { theme } = useThemeSelector();
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
