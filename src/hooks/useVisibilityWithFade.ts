import { useState, useEffect } from "react";

interface UseVisibilityWithFadeOptions {
  animationDuration: number; // 페이드아웃 지속 시간 (ms)
}


// 스크롤 내림을 감지했을 때 특정 컴포넌트가 사라지도록 하는 이벤트
const useVisibilityWithFade = (
  scrollDirection: "up" | "down" | null,
  options: UseVisibilityWithFadeOptions
) => {
  const [isVisible, setIsVisible] = useState(true); // Div의 가시성 상태
  const [isFadingOut, setIsFadingOut] = useState(false); // 페이드아웃 여부

  useEffect(() => {
    // 페이지 첫 로드 시 sessionStorage 확인
    const scrollDivHidden = sessionStorage.getItem("scrollDivHidden");

    if (scrollDivHidden === "true") {
      setIsVisible(false); // 숨김 상태로 설정
    }
  }, []);

  useEffect(() => {
    if (!isVisible || scrollDirection === null) return;

    if (scrollDirection === "down") {
      // 첫 스크롤 시 페이드아웃 트리거
      setIsFadingOut(true);

      // options.animationDuration 뒤에 완전히 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("scrollDivHidden", "true"); // 상태 저장
      }, options.animationDuration);

      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [scrollDirection, isVisible, options.animationDuration]);

  return { isVisible, isFadingOut };
};

export default useVisibilityWithFade;
