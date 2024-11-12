import { useEffect, useState, useCallback } from "react";

const useDeviceResize = () => {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const changeDisplayHeightAndWidth = useCallback(() => {
    const handleResize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    // Debounce the resize event
    const debounceResize = (func, delay) => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
      };
    };

    return debounceResize(handleResize, 300);
  }, []);

  useEffect(() => {
    const debouncedResize = changeDisplayHeightAndWidth();
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [changeDisplayHeightAndWidth]);

  return size;
};

export default useDeviceResize;
