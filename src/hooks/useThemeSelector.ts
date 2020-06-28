import React from "react";
import { Theme } from "@material-ui/core/styles";
import { themes } from "../mui-themes";
import { singletonHook } from "react-singleton-hook";

const init = {
  theme: themes[Object.keys(themes)[0]],
  setTheme: () => {},
};

function useThemeSelectorImpl() {
  const [theme, setTheme] = React.useState<Theme>(init.theme);
  React.useEffect(() => {
    console.log(
      "[useThemeSetter]: Theme was changed to",
      Object.keys(themes)[Object.values(themes).indexOf(theme)]
    );
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}

export const useThemeSelector = singletonHook(init, useThemeSelectorImpl);
