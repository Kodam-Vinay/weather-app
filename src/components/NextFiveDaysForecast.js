import { Grid } from "@mui/joy";

import { Card, CardActionArea, Typography } from "@mui/material";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { THEME_MODES, WEATHER_CONDITIONS } from "../utils/constants";

const NextFiveDaysForecast = ({ fiveDaysForecastDetails }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid
      item
      xs={12}
      lg={4}
      sx={{
        bgcolor: theme === THEME_MODES.light ? "" : "#333",
      }}
      mx="auto"
    >
      <CardActionArea
        sx={{
          borderRadius: 5,
          backdropFilter: "blur(10px)", // Blur effect
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Card
          sx={{
            p: 4,
            boxShadow: 3,
            bgcolor:
              theme === THEME_MODES.light
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(51, 51, 51, 0.2)",
            color: theme === THEME_MODES.light ? "#333" : "#fff",
            textAlign: "center",
            justifyContent: "center",
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.3)",
          }}
          className="space-y-4"
        >
          <Typography sx={{ fontWeight: 800 }} variant="h6">
            5 Days Forecast:
          </Typography>
          <Grid container spacing={2}>
            {fiveDaysForecastDetails?.map((eachDay, index) => (
              <Grid
                key={index}
                item
                xs={12}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {WEATHER_CONDITIONS[eachDay?.weatherType]?.icon}
                </Grid>

                <Typography variant="body2" align="center" ml={5}>
                  {eachDay?.maxTemperature}°C
                </Typography>

                <Typography variant="body2" align="center" ml={5}>
                  {eachDay?.date}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default NextFiveDaysForecast;
