import React, { useContext } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import { Grid } from "@mui/joy";
import ThemeContext from "../context/ThemeContext";
import {
  convertTo12HoursFormat,
  THEME_MODES,
  WEATHER_CONDITIONS,
} from "../utils/constants";

const HourlyWeather = ({ hourlyForecastDetails }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid
      item
      xs={12}
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
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
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
        >
          <Typography sx={{ fontWeight: 800 }} variant="h6" my={1}>
            Hourly Forecast:
          </Typography>
          <Grid container spacing={2}>
            {hourlyForecastDetails?.map((eachHour, index) => (
              <Grid
                key={index}
                item
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                sx={{
                  backdropFilter: "blur(10px)",
                }}
              >
                <Card
                  className="m-2 w-32"
                  sx={{
                    borderRadius: "20px",
                    bgcolor:
                      theme === THEME_MODES.light
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(51, 51, 51, 0.2)",
                    color: theme === THEME_MODES.light ? "#333" : "#fff",
                  }}
                >
                  <CardContent className="text-center space-y-1">
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {convertTo12HoursFormat(eachHour?.time?.split(" ")[1])}°C
                    </Typography>
                    {WEATHER_CONDITIONS[eachHour?.weatherType?.[0]]?.icon}
                    <Typography>
                      {Math.round(eachHour?.temperature)}°C
                    </Typography>
                    <AirIcon />
                    <Typography>
                      {Math.round(eachHour?.windSpeed)}km/h
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default HourlyWeather;
