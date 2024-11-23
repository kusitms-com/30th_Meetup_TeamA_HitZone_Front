"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import shareButtonGrayIcon from "@/src/assets/webp/share_gray.webp";
import { createKakaoShareMessage } from "@/src/utils/kakaoMessage";

interface KakaoShareButtonProps {
  resultId: number | null; // 결과 페이지로 연결하기 위한 resultId
  nickname: string | undefined; // 유형 닉네임
  hashTags?: string[]; // 해시태그 리스트
}

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ resultId, nickname, hashTags = [] }) => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    // Kakao SDK가 클라이언트에서만 실행되도록 처리
    if (typeof window !== "undefined") {
      const checkKakaoLoaded = setInterval(() => {
        if (window.Kakao) {
          clearInterval(checkKakaoLoaded); // Kakao SDK 로드 완료 시 반복 중지
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init("d4d5e84e53ce18afa1d4f5ecbc14a552"); // 발급받은 JavaScript 키
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
        const message = createKakaoShareMessage(resultId, nickname, hashTags); // 메시지 생성
        window.Kakao.Share.sendDefault(message); // 메시지 전달
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
