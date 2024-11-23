import React from "react";
import Image from "next/image";
import stadiumIcon from "../../../assets/svg/chatbot_select_stadium.svg";

interface StadiumSelectionProps {
  stadiums: string[];
  onSelect: (stadium: string) => void;
}

const StadiumSelection = ({ stadiums, onSelect }: StadiumSelectionProps) => {
  return (
    <div className="flex">
      <div className="bg-white rounded-lg max-w-[245px] w-full">
        <Image src={stadiumIcon} alt="구장 선택" width={245} height={99} />
        <div className="grid grid-cols-1 gap-2 p-3 text-xs font-regular">
          {stadiums.map((stadium) => (
            <button
              key={stadium}
              onClick={() => onSelect(stadium)}
              className="bg-grayscale-5 text-grayscale-90 py-2 rounded-md hover:bg-grayscale-10"
            >
              {stadium}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StadiumSelection;
