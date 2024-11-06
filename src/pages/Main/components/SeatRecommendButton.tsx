import React from "react";
import { useRouter } from "next/navigation";

interface FindSectionButtonProps {
  stadium: string;
}

const FindSectionButton: React.FC<FindSectionButtonProps> = ({ stadium }) => {
  const router = useRouter();

  // 추천 질문 페이지로 이동
  const handleClick = () => {
    router.push("/recommend/question");
  };

  return (
      <div className="absolute bottom-0 left-0 w-full px-[16px]">
        {/** 상대 위치로 배트 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 13% 위치에 배치 */}
        {/** 상대 위치로 공 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 85% 위치에 배치 */}
        <div className="relative">
            {/**z-10 relative:  맨 위에 배치 */}
            <div className="flex justify-center items-center border border-0 rounded-[8px] h-[48px] mb-[120px]
                            bg-main-50 text-grayscale-0 text-lg font-bold hadow-md hover:bg-main-60 z-0">
              <button
                onClick={handleClick}
              >
                나에게 맞는 구역 찾으러 가기
              </button>
            </div>
        </div>
      </div>
  );
};

export default FindSectionButton;
