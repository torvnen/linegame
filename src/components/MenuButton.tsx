import React, { HTMLProps } from "react";
import { useTheme } from "../hooks/useTheme";

const MenuButton = (props: HTMLProps<HTMLButtonElement>) => {
  const { theme } = useTheme();
  const [hovering, setHovering] = React.useState<boolean>(false);
  return (
    <button
      style={{
        minHeight: 40,
        margin: "10px 5px",
        color: theme.colors.success,
        background: hovering ? theme.colors.secondary : theme.colors.primary,
        borderRadius: theme.dimensions?.borderRadius || 0,
        border: `1px solid ${
          hovering ? theme.colors.primary : theme.colors.secondary
        }`,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default MenuButton;
