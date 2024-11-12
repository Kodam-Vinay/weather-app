import { Box } from "@mui/material";
import Header from "../components/Header";
import LocationInfo from "../components/LocationInfo";
import { Grid } from "@mui/joy";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { THEME_MODES } from "../utils/constants";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box>
      <Header />
      <Grid
        sx={{
          backgroundColor: theme === THEME_MODES.dark ? "#333" : "#f0f0f2",
        }}
      >
        <LocationInfo />
      </Grid>
    </Box>
  );
};

export default Main;
