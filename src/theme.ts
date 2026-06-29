import { createTheme } from "@mui/material";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#fbfbf8",
          paper: "#ffffff",
        },
        text: {
          primary: "#171717",
          secondary: "#606a70",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#121212",
          paper: "#1a1a1a",
        },
        text: {
          primary: "#e8e8e8",
          secondary: "#9ca3af",
        },
      },
    },
  },
  typography: {
    fontFamily:
      '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.02,
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "3.2rem",
          borderRadius: 999,
          paddingInline: "1.25rem",
        },
      },
    },
  },
});

export default theme;
