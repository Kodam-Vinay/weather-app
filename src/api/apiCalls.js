export const fetchLocationName = async ({
  latitude,
  longitude,
  setLocationName,
  setError,
  setIsError,
}) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    if (response.ok) {
      setLocationName(
        data.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown location"
      );
    } else {
      setIsError(true);
      setError("Error fetching location name");
    }
  } catch (error) {
    setLocationName("Location not available");
  }
};

export const fetchLocationWeather = ({
  latitude,
  longitude,
  setError,
  setIsError,
}) => {
  try {
  } catch (error) {}
};
