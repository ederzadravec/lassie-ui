import React from "react";
import { ThemeProvider } from "styled-components/native";

declare module "styled-components" {
  interface PaletteColor {
    main: string;
    text: string;
  }

  export interface DefaultTheme {
    palette: {
      text: {
        light: string;
        dark: string;
      };
      white: PaletteColor;
      black: PaletteColor;
      primary: PaletteColor;
      success: PaletteColor;
      info: PaletteColor;
      warning: PaletteColor;
      error: PaletteColor;
    };
  }
}

interface CustomPaletteColor {
  main?: string;
  text?: string;
}

interface CustomTheme {
  palette: {
    text: {
      light?: string;
      dark?: string;
    };
    white?: CustomPaletteColor;
    black?: CustomPaletteColor;
    primary?: CustomPaletteColor;
    success?: CustomPaletteColor;
    info?: CustomPaletteColor;
    warning?: CustomPaletteColor;
    error?: CustomPaletteColor;
  };
}

interface ThemeProps {
  theme?: CustomTheme;
}

const Component: React.FC<ThemeProps> = ({ theme, children }) => {
  const customTheme = React.useMemo(() => {
    const text = {
      light: "#fafafa",
      dark: "#333",
    };

    const defaultTheme = {
      palette: {
        text,
        white: {
          main: "#FFF",
          text: text.dark,
          ...theme?.palette?.white,
        },
        black: {
          main: "#000",
          text: text.light,
          ...theme?.palette?.black,
        },
        primary: {
          main: "#52489c",
          text: text.light,
          ...theme?.palette?.primary,
        },
        success: {
          main: "#4caf50",
          text: text.dark,
          ...theme?.palette?.success,
        },
        info: {
          main: "#2196f3",
          text: text.dark,
          ...theme?.palette?.info,
        },
        warning: {
          main: "#ff9800",
          text: text.dark,
          ...theme?.palette?.warning,
        },
        error: {
          main: "#f44336",
          text: text.light,
          ...theme?.palette?.error,
        },
      },
      ...theme?.palette,
    };

    return defaultTheme;
  }, []);

  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};

export default Component;
