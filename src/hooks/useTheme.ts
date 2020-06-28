import { useState } from "react";

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning?: string;
    error?: string;
    info?: string;
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
    },
    dimensions: {
        borderRadius: 8
    }
  },
  "166695": {
    name: "Green Desert",
    colors: {
      primary: "#698474",
      secondary: "#889e81",
      success: "#e5e4cc",
      info: "#bac7a7",
    },
  },
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(themes["default"]);
  return theme;
}
