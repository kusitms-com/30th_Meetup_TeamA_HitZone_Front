import React from "react";
import Image from "next/image";
import stadiumIcon from "@/src/assets/svg/chatbot_select_stadium.svg";

import { StadiumType } from "@/src/constants/ZoneData";

interface StadiumSelectionProps {
  stadiums: string[];
  onSelect: (stadium: string) => void;
}

const StadiumSelection = ({ stadiums, onSelect }: StadiumSelectionProps) => {
  
  // 카테고리에서 스타디움 리스트를 렌더링하는 함수
  const renderStadium = (stadium: string) => {
    const selectable = stadium === StadiumType.JAMSIL || stadium === StadiumType.SUWON_KT;

    return (
      <div
        key={stadium}
        onClick={selectable ? () => onSelect(stadium) : undefined}
        className={`bg-grayscale-5 py-2 rounded-md text-center
          ${
            stadium !== StadiumType.JAMSIL && stadium !== StadiumType.SUWON_KT ? "text-grayscale-30" : "text-grayscale-90 cursor-pointer hover:bg-grayscale-10"
          }`
        }>
        {stadium}
      </div>
    )
  }
  
  return (
    <div className="flex">
      <div className="bg-white rounded-lg max-w-[245px] w-full">
        <Image src={stadiumIcon} alt="구장 선택" width={245} height={99} />
        <div className="grid grid-cols-1 gap-2 p-3 text-xs font-regular">
          {stadiums.map((stadium) => (
            renderStadium(stadium)
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StadiumSelection;
