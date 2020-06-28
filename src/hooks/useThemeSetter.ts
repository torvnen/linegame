import React from "react";
import { Theme } from "@material-ui/core/styles";
import { themes } from "../mui-themes";

export function useThemeSetter() {
  const [theme, setTheme] = React.useState<Theme>(
    themes[Object.keys(themes)[0]]
  );

  return {
    theme,
    setTheme,
  };
}
