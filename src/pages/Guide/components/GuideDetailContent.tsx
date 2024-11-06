import React from "react";
import Image from "next/image";
import StadiumInfo from "../../Main/components/StadiumInfo";
import SeatDropdown from "./SeatDropdown";
import tipIcon from "../../../assets/svg/tip_button.svg";

interface GuideDetailContentProps {
  title: string;
  image: string;
  description: string;
  gateInfo: string;
  stepInfo: string;
  seatSpaceInfo: string;
}

export default function GuideDetailContent({
  title,
  image,
  description,
  gateInfo,
  stepInfo,
  seatSpaceInfo,
}: GuideDetailContentProps) {
  // 공통 클래스 정의
  const containerClass = "bg-grayscale-0 p-3 rounded-lg";
  const sectionTitleClass = "text-sm font-semibold text-grayscale-80 bg-gray-100 px-2 py-1 rounded inline-block";
  const sectionContentClass = "text-sm font-regular text-black mt-2";

  return (
    <div className="relative mb-[84px]">
      {/* 좌석 선택 드롭다운 및 Tip 버튼 */}
      <div className="flex items-center mb-4">
        <SeatDropdown
          options={["레드석", "블루석", "오렌지석", "네이비석", "프리미엄석", "테이블석", "익사이팅석", "외야그린석"]}
          selectedOption={title}
          onSelect={(option) => console.log(option)}
        />
        <button className="ml-auto w-[54px] h-[30px] flex items-center justify-center">
          <Image src={tipIcon} alt="Tip" width={54} height={30} />
        </button>
      </div>

      {/* 야구장 좌석 이미지 */}
      <div className="relative">
        <Image src={image} alt={`${title} 이미지`} className="w-full rounded-lg" width={370} height={198} />
      </div>

      {/* 구장 정보 */}
      <StadiumInfo stadium={title} />

      <div className="bg-grayscale-5 p-4 rounded-lg mt-4">
        {/* 상단 타이틀 섹션 */}
        <div className={containerClass}>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-gray-700 mt-2">{description}</p>
        </div>

        {/* 세부 정보 섹션 */}
        <div className={`${containerClass} mt-3 space-y-4`}>
          {[
            { title: "출입구 위치", content: gateInfo },
            { title: "단차 정보", content: stepInfo },
            { title: "좌석 간 간격 (무릎 간격) 정보", content: seatSpaceInfo },
          ].map((section, index) => (
            <div key={index}>
              <h3 className={sectionTitleClass}>{section.title}</h3>
              <p className={sectionContentClass}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
