import { createContext } from "react";
import { THEME_MODES } from "../utils/constants";

const ThemeContext = createContext({
  theme: THEME_MODES.light,
  toggleTheme: () => {},
  fontfamily: "Poppins",
});
export default ThemeContext;
