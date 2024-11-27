"use client";

import React, { useEffect, useState } from "react";
import { createKakaoShareMessage } from "@/src/utils/kakaoMessage";
import Image from "next/image";
import shareButtonGrayIcon from "@/src/assets/webp/share_gray.webp";

interface KakaoShareButtonProps {
  resultId: number | null; // 결과 ID
  nickname: string | undefined; // 유형 닉네임
  hashTags: string[]; // 해시태그 배열
}

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({
  resultId,
  nickname,
  hashTags,
}) => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    // Kakao SDK 초기화
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("d4d5e84e53ce18afa1d4f5ecbc14a552");
        console.log("Kakao SDK 초기화 완료");
      }
      setIsKakaoInitialized(true);
    }
  }, []);

  const handleShare = () => {
    if (!isKakaoInitialized) {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }

    if (!resultId) {
      console.error("resultId가 없습니다.");
      return;
    }

    try {
      // Kakao 메시지 생성 및 공유
      const message = createKakaoShareMessage(resultId, nickname, hashTags);
      window.Kakao.Share.sendCustom(message);
    } catch (error) {
      console.error("Kakao 공유 중 오류 발생:", error);
    }
  };

  return (
    <div onClick={handleShare} style={{ cursor: "pointer" }} aria-disabled={!isKakaoInitialized}>
      <Image src={shareButtonGrayIcon} alt="공유 버튼" width={28} height={24} className="cursor-pointer" />
    </div>
  );
};

export default KakaoShareButton;
