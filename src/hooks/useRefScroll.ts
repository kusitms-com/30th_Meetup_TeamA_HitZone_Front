import { useState, useEffect, useRef } from "react";

// 특정 div 태그에 스크롤 발생 이벤트를 감지하는 훅
// div에 overflow-auto가 css로 설정된 경우 window.scrollY로는 감지가 불가하여
// 해당 div의 참조(ref)를 생성하고, 그 참조에 이벤트를 바인딩해야 한다
const useRefScroll = <T extends HTMLElement>() => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    let prevScrollPos = 0;
    let startY: number | null = null;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScrollPos = container.scrollTop;

      if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      } else if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
      }

      setScrollPosition(currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY === null) return;

      const currentY = e.touches[0].clientY;
      const container = containerRef.current;
      if (!container) return;

      if (currentY > startY) {
        setScrollDirection("up");
      } else if (currentY < startY) {
        setScrollDirection("down");
      }

      setScrollPosition(container.scrollTop);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return { scrollDirection, scrollPosition, containerRef };
};

export default useRefScroll;
