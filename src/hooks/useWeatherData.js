import { useState, useEffect, useCallback } from "react";
import { addHours, format, isValid, parseISO, addDays } from "date-fns";
import { WEATHER_API } from "../utils/constants";

// Helper function to format the hourly forecast for the next 5 hours
const formatHourlyForecast = (hourly, utcOffset, count = 5) => {
  const { temperature_2m, wind_speed_10m, weather_code } = hourly;

  const startTime = addHours(new Date(), utcOffset / 1 + 1);

  return Array.from({ length: count }, (_, i) => {
    const forecastTime = addHours(startTime, i);

    return {
      time: format(forecastTime, "yyyy-MM-dd HH:mm"),
      temperature: temperature_2m[i],
      windSpeed: wind_speed_10m[i],
      weatherType: weather_code,
    };
  });
};

// Helper function to format the daily forecast for the next 5 days
const formatDailyForecast = (daily, count = 5) => {
  const { temperature_2m_max, temperature_2m_min, weather_code } = daily;

  return Array.from({ length: count }, (_, i) => {
    const forecastDate = addDays(new Date(), i);
    return {
      date: isValid(forecastDate)
        ? format(forecastDate, "EEEE, d MMM")
        : "Invalid date",
      maxTemperature: temperature_2m_max[i] || "N/A",
      minTemperature: temperature_2m_min[i] || "N/A",
      weatherType: weather_code[i] || "N/A",
    };
  });
};

// Function to process API response and structure the data
const processWeatherData = (data) => {
  const { utc_offset_seconds: utcOffset, hourly, daily } = data;

  return {
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    },
    current: {
      temperature: hourly.temperature_2m[0],
      humidity: hourly.relative_humidity_2m[0],
      windSpeed: hourly.wind_speed_10m[0],
      pressure: hourly.pressure_msl[0],
      uvIndex: hourly.uv_index[0],
      weatherType: hourly.weather_code[0],
    },
    hourlyForecast: formatHourlyForecast(hourly, utcOffset),
    dailyForecast: formatDailyForecast(daily),
    daily: {
      sunrise: isValid(new Date(daily.sunrise[0]))
        ? format(
            addHours(parseISO(daily.sunrise[0]), utcOffset / 3600),
            "HH:mm"
          )
        : "Invalid time",
      sunset: isValid(new Date(daily.sunset[0]))
        ? format(addHours(parseISO(daily.sunset[0]), utcOffset / 3600), "HH:mm")
        : "Invalid time",
    },
  };
};

// Custom hook to fetch and manage weather data
const useWeatherData = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      if (!latitude || !longitude) {
        setError("Invalid coordinates.");
        return;
      }

      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        hourly: [
          "temperature_2m",
          "relative_humidity_2m",
          "wind_speed_10m",
          "pressure_msl",
          "uv_index",
          "weather_code",
        ],
        daily: [
          "sunrise",
          "sunset",
          "temperature_2m_max",
          "temperature_2m_min",
          "weather_code",
        ],
        timezone: "auto",
      });

      const response = await fetch(`${WEATHER_API}?${params}`);
      if (!response.ok) throw new Error("Failed to fetch weather data.");

      const data = await response.json();
      setWeatherData(processWeatherData(data));
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000); //refresh every five minutes

    return () => clearInterval(intervalId);
  }, [fetchWeatherData]);

  return { weatherData, loading, error };
};

export default useWeatherData;
