import React from "react";
import { useRouter } from "next/navigation";

export default function FindSectionButton() {
  const router = useRouter();

  // 추천 질문 페이지로 이동
  const handleClick = () => {
    router.push("/recommend/question");
  };

  return (
    <div className="flex w-full mt-[42px]">
      {/** 상대 위치로 배트 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 13% 위치에 배치 */}
      {/** 상대 위치로 공 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 85% 위치에 배치 */}
      <div className="relative w-full">
        {/** z-10 relative: 맨 위에 배치 */}
        <button
          onClick={handleClick}
          className="flex justify-center items-center w-full rounded-[8px] h-[60px] bg-main-50 text-grayscale-0 text-lg font-bold hover:bg-main-60 z-0"
        >
          나에게 맞는 구역 찾으러 가기
        </button>
      </div>
    </div>
  );
}
