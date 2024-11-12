import { createTheme, Typography } from "@mui/material";
import SunnyIcon from "@mui/icons-material/WbSunny";
import CloudyIcon from "@mui/icons-material/CloudQueue";
import RainyIcon from "@mui/icons-material/Grain";
import SnowIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/FlashOn";
import WindyIcon from "@mui/icons-material/Air";
import NightClearIcon from "@mui/icons-material/Brightness2";
import { Grid } from "@mui/joy";

export const THEME_MODES = {
  light: "LIGHT",
  dark: "DARK",
};

export const LOCATION_NAME_API =
  "https://nominatim.openstreetmap.org/reverse?format=json&lat=lat&lon=lon";

export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const AVAILABLE_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const customTheme = createTheme({
  breakpoints: {
    values: {
      vxs: 0,
      xs: 300,
      mxs: 475,
      sm: 640,
      md: 768,
      mdl: 850,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  zIndex: {
    drawer: 1200,
  },
});

export const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export const convertTo12HoursFormat = (time) => {
  if (!time) return "12:00 AM";

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12;

  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const WEATHER_TYPES = {
  sunny: {
    icon: (
      <SunnyIcon
        sx={{
          color: "orange",
          fontSize: 50,
        }}
      />
    ),
    label: "Sunny",
  },
  cloudy: {
    icon: (
      <CloudyIcon
        sx={{
          color: "yellow",
        }}
      />
    ),
    label: "Cloudy",
  },
  rainy: {
    icon: (
      <RainyIcon
        sx={{
          color: "lightblue",
        }}
      />
    ),
    label: "Rainy",
  },
  snowy: {
    icon: (
      <SnowIcon
        sx={{
          color: "lightblue",
        }}
      />
    ),
    label: "Snowy",
  },
  thunderstorm: {
    icon: (
      <ThunderstormIcon
        sx={{
          color: "yellow",
        }}
      />
    ),
    label: "Thunderstorm",
  },
  foggy: {
    icon: (
      <SnowIcon
        sx={{
          opacity: 0.5,
        }}
      />
    ),
    label: "Foggy",
  },
  windy: {
    icon: (
      <WindyIcon
        sx={{
          color: "lightyellow",
        }}
      />
    ),
    label: "Windy",
  },
  clearNight: {
    icon: (
      <NightClearIcon
        sx={{
          color: "gray",
        }}
      />
    ),
    label: "Clear Night",
  },
};

export const WeatherDisplay = ({ type }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {type?.icon}
      <Typography variant="h5">{type?.label}</Typography>
    </Grid>
  );
};

export const WEATHER_CONDITIONS = {
  0: { label: "Clear", icon: WEATHER_TYPES.sunny.icon },
  1: { label: "Mainly Clear", icon: WEATHER_TYPES.sunny.icon },
  2: { label: "Partly Cloudy", icon: WEATHER_TYPES.cloudy.icon },
  3: { label: "Overcast", icon: WEATHER_TYPES.cloudy.icon },
  45: { label: "Foggy", icon: WEATHER_TYPES.foggy.icon },
  48: { label: "Foggy", icon: WEATHER_TYPES.foggy.icon },
  51: { label: "Light Drizzle", icon: WEATHER_TYPES.rainy.icon },
  61: { label: "Rain Showers", icon: WEATHER_TYPES.rainy.icon },
  63: { label: "Moderate Rain", icon: WEATHER_TYPES.rainy.icon },
  71: { label: "Light Snow", icon: WEATHER_TYPES.snowy.icon },
  95: { label: "Thunderstorm", icon: WEATHER_TYPES.thunderstorm.icon },
};
