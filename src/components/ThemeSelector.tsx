import React from "react";
import Flexbox from "./Flexbox";
import { themes } from "../mui-themes";
import { useThemeSetter } from "../hooks/useThemeSetter";

const themeButtonStyle: React.CSSProperties = {
  fontSize: "140%",
  cursor: "pointer",
  margin: "-2px 2px 0 2px",
  display: "flex",
  flexGrow: 1,
};

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeSetter();
  const currentThemeIndex = Object.values(themes).indexOf(theme);
  const themeKeys = Object.keys(themes);
  const setPreviousTheme = () => {
    const previousKey =
      themeKeys[
        currentThemeIndex > 0 ? currentThemeIndex - 1 : themeKeys.length - 1
      ];
    setTheme(themes[previousKey]);
  };
  const setNextTheme = () => {
    const previousKey =
      themeKeys[
        currentThemeIndex + 1 < themeKeys.length ? currentThemeIndex + 1 : 0
      ];
    setTheme(themes[previousKey]);
  };
  return (
    <Flexbox
      style={{
        flexFlow: "column",
        flexGrow: 1,
      }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      <span
        style={{
          display: "flex",
          flexGrow: 1,
          fontSize: "70%",
          opacity: 0.8,
          paddingTop: 5,
          textAlign: "center",
          flexFlow: "column",
          textIndent: -10,
        }}
      >
        Theme
      </span>
      <Flexbox style={{ flexGrow: 1 }}>
        <a
          style={themeButtonStyle}
          className="noselect"
          onClick={() => setPreviousTheme()}
        >
          &laquo;
        </a>
        <span style={{ flexGrow: 0, textAlign: "center" }}>
          {Object.keys(themes)[Object.values(themes).indexOf(theme)]}
        </span>
        <a
          style={{ ...themeButtonStyle, flexDirection: "row-reverse" }}
          className="noselect"
          onClick={() => setNextTheme()}
        >
          &raquo;
        </a>
      </Flexbox>
    </Flexbox>
  );
};

export default ThemeSelector;
