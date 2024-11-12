import { Grid } from "@mui/joy";
import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import {
  convertTo12HoursFormat,
  THEME_MODES,
  WEATHER_CONDITIONS,
  WeatherDisplay,
} from "../utils/constants";
import { Card, CardActionArea, Typography } from "@mui/material";
import Upsunrise from "../svgs/Upsunrise";
import Downrise from "../svgs/Downrise";
import HumidityIc from "../svgs/HumidityIc";
import PressureIc from "../svgs/PressureIc";
import WindIc from "../svgs/WindIc";

const TodayForecast = ({ todayForecastDetails }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Grid
      item
      xs={12}
      lg={9}
      sx={{
        bgcolor: theme === THEME_MODES.light ? "" : "#333",
      }}
      mx="auto"
    >
      <CardActionArea
        sx={{
          borderRadius: 5,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))",
        }}
      >
        <Card
          sx={{
            boxShadow: 3,
            bgcolor:
              theme === THEME_MODES.light
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(51, 51, 51, 0.2)",
            color: theme === THEME_MODES.light ? "#333" : "#fff",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.3)",
          }}
          className="space-y-4"
        >
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "20px",
                    mxs: "24px",
                    sm: "28px",
                    md: "40px",
                  },
                }}
                variant="h2"
              >
                {Math.round(todayForecastDetails?.temperature)}°C
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              className="space-x-2"
            >
              <Upsunrise className="h-6 w-6 mxs:h-6 mxs:w-6" />
              <Grid className="flex flex-col space-x-2">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      vxs: 12,
                      xs: 14,
                    },
                  }}
                  variant="body1"
                >
                  Sunrise
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      vxs: 12,
                      xs: 14,
                    },
                  }}
                  variant="body1"
                >
                  {convertTo12HoursFormat(todayForecastDetails?.sunrise)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              className="space-x-2"
            >
              <Downrise className="h-6 w-6 mxs:h-6 mxs:w-6" />
              <Grid className="flex flex-col space-x-2">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      vxs: 12,
                      xs: 14,
                    },
                  }}
                  variant="body1"
                >
                  Sunset
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      vxs: 12,
                      xs: 14,
                    },
                  }}
                  variant="body1"
                >
                  {convertTo12HoursFormat(todayForecastDetails?.sunset)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {WeatherDisplay({
            type: WEATHER_CONDITIONS[todayForecastDetails?.weatherType],
          })}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" alignItems="center">
                <HumidityIc />
                <Typography>
                  {Math.round(todayForecastDetails?.humidity)}%
                </Typography>
                <Typography>Humidity</Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container direction="column" alignItems="center">
                <PressureIc />
                <Typography>
                  {Math.round(todayForecastDetails?.pressure)}ps
                </Typography>
                <Typography>Pressure</Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container direction="column" alignItems="center">
                <WindIc />
                <Typography>
                  {Math.round(todayForecastDetails?.windSpeed)}km/h
                </Typography>
                <Typography>Wind Speed</Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container direction="column" alignItems="center">
                <HumidityIc />
                <Typography>
                  {Math.round(todayForecastDetails?.uvIndex)}
                </Typography>
                <Typography>UV</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default TodayForecast;
