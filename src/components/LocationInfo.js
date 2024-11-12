import { Grid } from "@mui/joy";
import { Card, CardActionArea, Typography, Box } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { fetchLocationName } from "../api/apiCalls";
import ThemeContext from "../context/ThemeContext";
import { AVAILABLE_MONTHS, THEME_MODES, WEEK_DAYS } from "../utils/constants";
import HourlyWeather from "./HourlyWeather";
import useWeatherData from "../hooks/useWeatherData";
import NextFiveDaysForecast from "./NextFiveDaysForecast";
import TodayForecast from "./TodayForecast";

const LocationInfo = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationName, setLocationName] = useState("Loading...");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const date = new Date();

  const formattedDate = `${
    WEEK_DAYS[date.getDay()]
  }, ${date.getDate()} ${AVAILABLE_MONTHS[date.getMonth()].slice(0, 3)}`;

  const { theme } = useContext(ThemeContext);
  const forecastDetails = useWeatherData({
    latitude: location?.latitude,
    longitude: location?.longitude,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchLocationName({
            latitude,
            longitude,
            setLocationName,
            setError,
            setIsError,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationName("Location not available");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationName("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    if (isError && error) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <Grid
      container
      xs={10}
      mx="auto"
      spacing={2}
      sx={{
        mt: 7,
      }}
    >
      {/* time and date + location name */}
      <Grid
        item
        xs={12}
        lg={3}
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
            background: "linear-gradient(to top left, #00c6ff, #0072ff)",
          }}
        >
          <Card
            sx={{
              py: 8.5,
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
              {locationName}
            </Typography>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {currentTime}
              </Typography>
              <Typography>{formattedDate}</Typography>
            </Box>
          </Card>
        </CardActionArea>
      </Grid>

      {/* today forecast */}
      <TodayForecast
        todayForecastDetails={{
          ...forecastDetails?.weatherData?.current,
          ...forecastDetails?.weatherData?.daily,
        }}
      />

      {/* five days forcast */}
      <NextFiveDaysForecast
        fiveDaysForecastDetails={forecastDetails?.weatherData?.dailyForecast}
      />

      {/* hourly forecast */}
      <Grid xs={12} lg={8}>
        <HourlyWeather
          hourlyForecastDetails={forecastDetails?.weatherData?.hourlyForecast}
        />
      </Grid>
    </Grid>
  );
};

export default LocationInfo;
