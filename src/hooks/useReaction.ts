import { useState, useEffect } from "react";

interface ScreenSizeState {
  isSmall: boolean; // <= 360px
  isMedium: boolean; // > 360px and <= 390px
  isLarge: boolean; // > 390px and <= 410px
  isExtraLarge: boolean; // > 410px
}

/**
 * Custom hook to detect screen width ranges.
 * @returns {ScreenSizeState} - An object representing screen size states.
 */
export const useScreenWidth = (): ScreenSizeState => {
  const [screenSize, setScreenSize] = useState<ScreenSizeState>({
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isExtraLarge: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isSmall: width <= 360,
        isMedium: width > 360 && width <= 390,
        isLarge: width > 390 && width <= 410,
        isExtraLarge: width > 410,
      });
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
