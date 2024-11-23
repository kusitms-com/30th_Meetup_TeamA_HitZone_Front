"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import shareButtonGrayIcon from "@/src/assets/webp/share_gray.webp";

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
        if (!resultId) {
          console.error("resultId가 없습니다. 공유 메시지를 생성할 수 없습니다.");
          return;
        }

        const resultPageUrl = `https://www.hitzone.site/recommend/results?resultId=${resultId}`;
        const formattedHashTags = hashTags?.length
          ? hashTags.map((tag) => `#${tag}`).join(" ")
          : "#HitZone"; // 해시태그가 없을 경우 기본값

        // 메시지 커스터마이징
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: `${nickname}`,
            description: `${formattedHashTags}`, // 해시태그
            imageUrl: "https://www.hitzone.site/assets/webp/kakao_share.webp", // 공유 이미지
            link: {
              mobileWebUrl: resultPageUrl, // "결과 자세히 보기" 버튼 링크
              webUrl: resultPageUrl,
            },
          },
          buttons: [
            {
              title: "결과 자세히 보기",
              link: {
                mobileWebUrl: resultPageUrl,
                webUrl: resultPageUrl,
              },
            },
            {
              title: "나도 나만의 HitZone 찾아보기",
              link: {
                mobileWebUrl: "https://www.hitzone.site/",
                webUrl: "https://www.hitzone.site/",
              },
            },
          ],
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
