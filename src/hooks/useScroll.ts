import { useState, useEffect } from "react";

const useScroll = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      } else if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
      }

      setScrollPosition(currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollDirection, scrollPosition };
};

export default useScroll;
