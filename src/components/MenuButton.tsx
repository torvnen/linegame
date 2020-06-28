import React, { HTMLProps } from "react";
import { useThemeSelector } from "../hooks/useThemeSelector";

const MenuButton = (props: HTMLProps<HTMLButtonElement>) => {
  const { theme } = useThemeSelector();
  const [hovering, setHovering] = React.useState<boolean>(false);
  return (
    <button
      style={{
        minHeight: 40,
        margin: "10px 5px",
        color: theme.palette.text.secondary,
        background: hovering
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
        borderRadius: theme.spacing(1),
        border: `1px solid ${
          hovering ? theme.palette.secondary.main : theme.palette.primary.main
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
