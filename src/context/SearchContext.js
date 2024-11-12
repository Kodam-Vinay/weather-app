import { createContext } from "react";

const SearchContext = createContext({
  searchText: "",
  storeSearchText: () => {},
});
export default SearchContext;
