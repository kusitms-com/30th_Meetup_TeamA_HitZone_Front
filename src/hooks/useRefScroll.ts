import { useState, useEffect, useRef } from "react";

// 특정 div 태그에 스크롤 발생 이벤트를 감지하는 훅
// div에 overflow-auto가 css로 설정된 경우 window.scrollY로는 감지가 불가하여
// 해당 div의 참조(ref)를 생성하고, 그 참조에 이벤트를 바인딩해야 한다
const useScroll = <T extends HTMLElement>() => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<T | null>(null); // 컨테이너 참조 생성

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let prevScrollPos = container.scrollTop;

    const handleScroll = () => {
      const currentScrollPos = container.scrollTop;

      if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      } else if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
      }

      setScrollPosition(currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    // 스크롤 이벤트 바인딩
    container.addEventListener("scroll", handleScroll);

    return () => {
      // 이벤트 정리
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollDirection, scrollPosition, containerRef };
};

export default useScroll;
