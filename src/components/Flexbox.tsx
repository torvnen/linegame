import React, { HTMLProps } from "react";
import { useTheme } from "../hooks/useTheme";

const Flexbox = (props: HTMLProps<HTMLDivElement>) => {
  const { theme } = useTheme();
  return (
    <div
      {...props}
      style={{ display: "flex", color: theme.colors.primary, ...props.style }}
    >
      {props.children}
    </div>
  );
};

export default Flexbox;
