"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import shareButtonGrayIcon from "@/src/assets/webp/share_gray.webp";

const KakaoShareButton = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    // Kakao SDK가 클라이언트에서만 실행되도록 처리
    if (typeof window !== "undefined") {
      const checkKakaoLoaded = setInterval(() => {
        if (window.Kakao) {
          clearInterval(checkKakaoLoaded); // Kakao SDK 로드 완료 시 반복 중지
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init("d4d5e84e53ce18afa1d4f5ecbc14a552");
            console.log("Kakao SDK initialized");
          }
          setIsKakaoInitialized(true);
        }
      }, 100); // 100ms 간격으로 Kakao 로드 상태 확인
    }
  }, []);

  const handleShare = () => {
    if (isKakaoInitialized && window.Kakao) {
      try {
        // sendCustom을 사용하여 템플릿 ID와 함께 메시지를 전송
        window.Kakao.Share.sendCustom({
          templateId: 114573, // 템플릿 ID
        });
      } catch (error) {
        console.error("Kakao 공유 실행 중 오류 발생:", error);
      }
    } else {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
    }
  };

  return (
    <div onClick={handleShare} style={{ cursor: "pointer" }} aria-disabled={!isKakaoInitialized}>
      <Image src={shareButtonGrayIcon} alt="공유 버튼" width={28} height={24} className="cursor-pointer" />
    </div>
  );
};

export default KakaoShareButton;
