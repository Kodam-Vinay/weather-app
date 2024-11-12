import { Box } from "@mui/material";
import "./App.css";
import Main from "./pages/Main";
import ThemeContext from "./context/ThemeContext";
import { useState } from "react";
import { THEME_MODES } from "./utils/constants";

function App() {
  const [theme, setTheme] = useState(THEME_MODES.light);

  const toggleTheme = () => {
    setTheme(theme === THEME_MODES.dark ? THEME_MODES.light : THEME_MODES.dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <Box
        sx={{
          backgroundColor: theme === THEME_MODES.dark ? "#333" : "#f0f0f2",
          height: "100vh",
        }}
      >
        <Main />
      </Box>
    </ThemeContext.Provider>
  );
}

export default App;
