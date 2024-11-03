import React from "react";
import { useRouter } from "next/navigation";

interface FindSectionButtonProps {
  stadium: string;
}

// 추후 Props로 각각 맞는 추천 질문으로 수정 예정
const stadiumRouteMap: { [key: string]: string } = {
  "잠실종합운동장 (잠실)": "/Recommend/Question",
  "수원KT위즈파크": "/Recommend/Question",
};

const FindSectionButton: React.FC<FindSectionButtonProps> = ({ stadium }) => {
  const router = useRouter();

  const handleClick = () => {
    const route = stadiumRouteMap[stadium] || "/Recommend/Question";
    router.push(route);
  };

  return (
    <div className="flex justify-center my-5">
      <button
        onClick={handleClick}
        className="px-6 py-3 w-full bg-main-50 text-grayscale-0 text-lg font-bold rounded-lg shadow-md hover:bg-main-60"
      >
        나에게 맞는 구역 찾으러 가기
      </button>
    </div>
  );
};

export default FindSectionButton;
