import { createContext } from "react";

const LocationContext = createContext({
  locationName: "",
  locationPoints: {
    latitude: null,
    longitude: null,
  },
  storeLocationName: () => {},
  storeLocationPoints: () => {},
});
export default LocationContext;
