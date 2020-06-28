import { createMuiTheme, Theme } from "@material-ui/core";

export const themes: { [id: string]: Theme } = {
  Default: createMuiTheme({
    palette: {
      primary: {
        main: "#204051",
      },
      secondary: { main: "#3b6978" },
      success: { main: "#e7dfd5" },
      info: { main: "#84a9ac" },
      warning: { main: "#e5e4cc" },
      background: {
        default: "#204051",
        paper: "#3b6978",
      },
      text: {
        primary: "#e7dfd5",
        secondary: "#e7dfd5",
      },
      divider: "#e7dfd5",
    },
    typography: {
      allVariants: {
        color: "#e7dfd5",
        fontFamily:
          'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      },
      button: {
        textTransform: "none",
      },
      body1: {
        color: "#e7dfd5",
      },
    },
  }),
  "Green Desert": createMuiTheme({
    palette: {
      primary: {
        main: "#204051",
      },
      secondary: { main: "#3b6978" },
      success: { main: "#e7dfd5" },
      info: { main: "#84a9ac" },
      warning: { main: "#e5e4cc" },
      text: {
        primary: "#84a9ac",
        secondary: "#e7dfd5",
      },
    },
  }),
};
