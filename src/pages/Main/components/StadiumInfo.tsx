import React from "react";
import { StadiumType } from "@/src/constants/ZoneData";

interface StadiumInfoProps {
  stadiumName: string; //StadiumType;
  firstBase: string;
  thirdBase: string;
}

function StadiumInfo({ stadiumName, firstBase, thirdBase }: StadiumInfoProps) {
  return (
    <div className="flex justify-center gap-5 mt-5 text-xs font-medium">
      <div className="text-center flex items-center gap-2">
        <span className="px-2 py-[2px] bg-grayscale-50 text-grayscale-0 rounded-md">1루</span>
        <span>{firstBase}</span>
      </div>
      <div className="text-center flex items-center gap-2">
        <span className="px-2 py-[2px] bg-grayscale-5 text-grayscale-80 rounded-md">3루</span>
        <span>{thirdBase}</span>
      </div>
    </div>
  );
}

export default StadiumInfo;
