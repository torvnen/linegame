import { useState } from "react";
import React from "react";

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    error?: string;
  };
  dimensions?: {
    borderRadius?: number | string;
    spacing?: number | string;
  };
}

export const themes: { [id: string]: Theme } = {
  default: {
    name: "Default",
    colors: {
      primary: "#204051",
      secondary: "#3b6978",
      success: "#e7dfd5",
      info: "#84a9ac",
      warning: "#e5e4cc",
    },
    dimensions: {
      borderRadius: 8,
    },
  },
  "166695": {
    name: "Green Desert",
    colors: {
      primary: "#698474",
      secondary: "#889e81",
      success: "#e5e4cc",
      info: "#bac7a7",
      warning: "#e5e4cc",
    },
  },
};
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(themes["default"]);

  return {
    theme,
    setTheme,
    themes,
  };
}
