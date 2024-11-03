import React from "react";

interface StadiumInfoProps {
  stadium: string;
}

const stadiumInfoData: { [key: string]: { firstBase: string; thirdBase: string } } = {
  "잠실종합운동장 (잠실)": {
    firstBase: "두산베어스, LG 트윈스",
    thirdBase: "상대팀",
  },
  "수원KT위즈파크": {
    firstBase: "KT WIZ",
    thirdBase: "상대팀",
  },
};

function StadiumInfo({ stadium }: StadiumInfoProps) {
  const info = stadiumInfoData[stadium] || { firstBase: "-", thirdBase: "-" };

  return (
    <div className="flex justify-center gap-5 mt-5 text-xs font-medium">
      <div className="text-center flex items-center gap-2">
        <span className="px-2 py-[2px] bg-grayscale-50 text-grayscale-0 rounded-md">1루</span>
        <span>{info.firstBase}</span>
      </div>
      <div className="text-center flex items-center gap-2">
        <span className="px-2 py-[2px] bg-grayscale-5 text-grayscale-80 rounded-md">3루</span>
        <span>{info.thirdBase}</span>
      </div>
    </div>
  );
}

export default StadiumInfo;
