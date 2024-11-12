import { OutlinedInput } from "@mui/material";
import { Grid } from "@mui/joy";
import { useContext } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import ThemeContext from "../context/ThemeContext";
import { THEME_MODES } from "../utils/constants";
import SearchContext from "../context/SearchContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { searchText, storeSearchText } = useContext(SearchContext);

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-around"
      sx={{
        p: 1,
        position: "fixed",
        zIndex: 10,
        width: "100%",
        top: 0,
        transition: "background-color 0.3s ease",
        backgroundColor: theme === THEME_MODES.dark ? "#333" : "#f0f0f2",
      }}
    >
      {/* Dark/Light Mode Toggle */}
      <Grid item sx={{ gap: 0 }}>
        <button
          className="flex flex-col bg-gray-400 rounded-[40px] h-8 min-w-10 xs:min-w-12 sm:min-w-14 -mb-1"
          onClick={toggleTheme}
        >
          <span
            className={`h-5 w-5 mt-[6px] rounded-full ${
              theme === THEME_MODES.light
                ? "self-start ml-1 bg-[#333]"
                : "self-end mr-1 bg-white"
            }`}
          ></span>
        </button>
      </Grid>

      {/* Search Bar */}
      <Grid item xs={6} sm={4}>
        <form onSubmit={handleSubmitForm}>
          <OutlinedInput
            id="search"
            type="search"
            fullWidth
            sx={{
              borderRadius: "10px",
              height: 40,
            }}
            startAdornment={
              <SearchIcon
                sx={{
                  marginRight: 2,
                  fill: theme === THEME_MODES.light ? "" : "white",
                }}
              />
            }
            value={searchText}
            onChange={(e) => storeSearchText(e)}
          />
        </form>
      </Grid>

      {/* Auto Location Button */}
      <Grid item>
        <button
          className={`flex items-center hover:opacity-60 hover:bg-opacity-60 md:p-1 rounded-full px-5 ${
            theme === THEME_MODES.light
              ? "md:border md:border-black"
              : "text-white md:border md:border-white p-2"
          }`}
        >
          <MyLocationIcon fontSize="small" />
          <span className="hidden md:block ml-1">Current Location</span>
        </button>
      </Grid>
    </Grid>
  );
};

export default Header;
