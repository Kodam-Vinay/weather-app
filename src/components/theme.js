// theme.js
import { createTheme } from "@mui/material/styles";
import { THEME_MODES } from "../utils/constants";

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode, // Dynamically set light or dark mode
      ...(mode === THEME_MODES.dark
        ? {
            background: {
              default: "#333",
              paper: "#424242",
            },
            text: {
              primary: "#f0f0f2",
              secondary: "#aaa",
            },
          }
        : {
            background: {
              default: "#f0f0f2",
              paper: "#fff",
            },
            text: {
              primary: "#333",
              secondary: "#555",
            },
          }),
    },
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
      h1: {
        fontFamily: "Poppins, Arial, sans-serif",
        fontWeight: 700,
      },
      h2: {
        fontFamily: "Poppins, Arial, sans-serif",
        fontWeight: 600,
      },
      body1: {
        fontFamily: "Poppins, Arial, sans-serif",
        fontWeight: 400,
      },
      // Customize other typography variants as needed
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins, Arial, sans-serif",
          },
        },
      },
    },
  });

export default theme;
