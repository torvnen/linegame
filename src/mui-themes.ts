import { createMuiTheme, Theme } from "@material-ui/core";

const createTheme = (colors: {
  lightest: string;
  color2: string;
  color3: string;
  darkest: string;
}) =>
  createMuiTheme({
    palette: {
      primary: {
        main: colors.darkest,
      },
      action: {
        active: colors.lightest,
        disabled: colors.color2,
      },
      secondary: { main: colors.color3 },
      success: { main: colors.lightest },
      info: { main: colors.color2 },
      warning: { main: colors.color3 },
      background: {
        default: colors.darkest,
        paper: colors.color3,
      },
      text: {
        primary: colors.lightest,
        secondary: colors.lightest,
      },
      divider: colors.lightest,
    },
    typography: {
      allVariants: {
        color: colors.lightest,
        fontFamily:
          'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      },
      button: {
        textTransform: "none",
      },
      body1: {
        color: colors.lightest,
      },
    },
  });

export const themes: { [id: string]: Theme } = {
  Default: createTheme({
    lightest: "#e7dfd5",
    color2: "#84a9ac",
    color3: "#3b6978",
    darkest: "#204051",
  }),
  "Green Desert": createTheme({
    lightest: "#e5e4cc",
    color2: "#bac7a7",
    color3: "#889e81",
    darkest: "#698474"
  }),
  "Bumblebee": createTheme({
    lightest: "#f4f4f4",
    color2: "#f0a500",
    color3: "#cf7500",
    darkest: "#000000"
  }),
  "Watermelon": createTheme({
    lightest: "#bbf1c8",
    color2: "#80bdab",
    color3: "#342b38",
    darkest: "#ff9595"
  }),
  "Limestone": createTheme({
    lightest: "#e1ffc2",
    color2: "#c7e2b2",
    color3: "#89c9b8",
    darkest: "#092532"
  }),
};
