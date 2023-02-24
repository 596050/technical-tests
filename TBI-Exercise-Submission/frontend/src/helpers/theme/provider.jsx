import React, { memo } from "react";

import { rem } from "polished";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const defaultTheme = {
  colors: {
    active: "hsla(0, 0%, 100%, 0.2)",
    blue: "rgba(0, 28, 56, 1)",
    gray: "rgba(240, 240, 243, 1)",
    darkGray: "rgba(115, 119, 127, 1)",
    black: "rgba(47, 48, 51, 1)",
    yellow: "rgba(253, 185, 10, 1)",
    white: "rgba(253, 252, 255, 1)",
    pastelBlue: "rgba(11, 97, 164, 1)",
    lightPastelBlue: "rgba(233, 241, 255, 1)",
    transparent: "rgba(0,0,0,0)",
    outlineBlue: "rgba(11, 97, 164, 1)",
    base: "#444444",
    baseMid: "#71747E",
    baseLight: "#D7DAE0",
    baseExtraLight: "#F5F6FA",

    primary: "#0E4EFB",
    hover: "#507FFF",
    pressed: "#0035C5",
    danger: "#CC0700",
    success: "#007B46",
    warning: "#FF8500",
    highlight: "#CC0700",

    background: "#F9F9FA",
    foreground: "#FFFFFF",

    primary10: "#E6EDFF",
    primary20: "#CEE5FF",

    lightOrange: "#FFE0B2",
    orange: "#FFCAB4",
    babyPink: "#FFCDD2",
    pink: "#FFB5CF",
    lightPurple: "#F9F5FF",
    purple: "#C4B2F7",
    lightRed: "#FFD5D5",
    lightBlue: "#EFF8FF",
    periwinkle: "#C2D3FF",
    skyBlue: "#B2EDF2",
    aquaBlue: "#C5F3F3",
    lightGreen: "#D4E8B4",
    green: "#ABE7AD",
    darkGreen: "#0DA060",
    grey: "#CED9E0",
    lightYellow: "#FFEBC4",
    darkYellow: "#C43A00",
  },
  typography: {
    fontSizes: {
      size12: rem("12px"),
      size14: rem("14px"),
      size16: rem("16px"),
      size20: rem("20px"),
      size22: rem("22px"),
      size26: rem("26px"),
      size28: rem("28px"),
      size32: rem("32px"),
      size40: rem("40px"),
      size42: rem("42px"),
    },
    lineHeight: "1.6",
    lineHeightSmall: "1.4",
    fontFamilyDisplay: "Playfair Display, serif",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "400",
    fontWeightBold: "600",
  },
  breakpoints: ["950px", "1024px"],
  boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.2)",
  clientBoxShadow: "0px 4px 10px rgba(28, 36, 82, 0.1)",

  opacity: {
    op50: 0.5,
    op80: 0.8,
    op90: 0.9,
    op95: 0.95,
  },

  display: {
    spacingIncrement: 4,
    inputBorderWidth: "1px",
    inputHeight: "48px",
    borderRadius: "6px",
    navHeightSmall: 50,
    navHeightMedium: 112,
    navHeightLarge: 156,
    navTextWidth: 120,
    navIconWidth: 50,
    navZIndex: 2,
    subnavZIndex: 1,
    popOverWidthMin: 180,
    popOverWidthMax: 400,
    dropdownWrapperZIndex: 10,
    dropdownOptionsZIndex: 11,
    modalHeadingZIndex: 100,
    modalHeadingHeight: 96,
    modalPadding: "3rem",
    formMediumWidth: 480,
    drawerNavWidth: 320,
  },

  spacers: {
    size4: rem("4px"),
    size8: rem("8px"),
    size12: rem("12px"),
    size16: rem("16px"),
    size24: rem("24px"),
    size32: rem("32px"),
    size40: rem("40px"),
    size48: rem("48px"),
    size64: rem("64px"),
    size80: rem("80px"),
    size128: rem("128px"),
  },

  wrappers: {
    a4Width: "8.27in",
    small: "320px",
    medium: "480px",
    large: "800px",
    extraLarge: "1280px",
    fullScreen: "100vh",
    mediumBreakpoint: 768, // no px as we do math on this in media queries,
  },
};

export const createCustomMUITheme = options => {
  return createTheme({
    custom: defaultTheme,
    ...options,
    typography: {
      fontFamily: ['"Nunito"', "sans-serif"].join(","),
      body1: {
        fontSize: defaultTheme.typography.fontSizes.size14,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        contrastText: defaultTheme.colors.white,
        main: defaultTheme.colors.blue,
      },
      secondary: {
        contrastText: defaultTheme.colors.blue,
        main: defaultTheme.colors.white,
      },
    },
    components: {
      MuiContainer: {
        defaultProps: {
          disableGutters: true,
          maxWidth: "xl",
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiMenu: {
        defaultProps: {
          sx: {
            maxHeight: "300px",
          },
        },
      },
      MuiList: {
        defaultProps: {
          disablePadding: true,
        },
      },
      MuiListItem: {
        defaultProps: {
          disablePadding: true,
        },
      },
      MuiLink: {
        defaultProps: {
          color: defaultTheme.colors.pastelBlue,
          underline: "hover",
          sx: {},
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              "&.Mui-focusVisible": {
                outline: `2px solid ${defaultTheme.colors.outlineBlue}`,
                outlineOffset: "0.5px",
              },
              border: "1px solid",
              borderColor: "transparent",
              textTransform: "none",
              boxShadow: "none",
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              "&.Mui-focusVisible": {
                outline: `2px solid ${defaultTheme.colors.outlineBlue}`,
                outlineOffset: "0.5px",
              },
              borderRadius: "8px",
              border: "1px solid",
              borderColor: defaultTheme.colors.darkGray,
              textTransform: "none",
              boxShadow: "none",
              color: defaultTheme.colors.pastelBlue,
            },
          },
        ],
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            borderColor: defaultTheme.colors.darkGray,
          },
          notchedOutline: {
            borderColor: defaultTheme.colors.darkGray,
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
          },
        },
      },
    },
  });
};

export const MUIThemeProvider = memo(
  ({ children, theme = createCustomMUITheme({}) }) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  },
);
