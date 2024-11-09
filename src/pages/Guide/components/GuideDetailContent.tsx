import React, { useState, useEffect } from "react";
import Image from "next/image";
import StadiumInfo from "../../Main/components/StadiumInfo";
import SeatDropdown from "./SeatDropdown";
import tipIcon from "../../../assets/svg/tip_button.svg";

import { handleGuide } from "@/src/api/StadiumApiHandler";
import { GuideGetParamsType, GuideGetResponseType, ReferenceGroup, Reference } from "@/src/api/StadiumApiType";

export default function GuideDetailContent({stadiumName, zoneName}: GuideGetParamsType) {
  // 공통 클래스 정의
  const containerClass = "bg-grayscale-0 p-3 rounded-lg";
  const sectionTitleClass = "text-sm font-semibold text-grayscale-80 bg-gray-100 px-2 py-1 rounded inline-block";
  const sectionContentClass = "text-sm font-regular text-black mt-2";
  
  // 가이드 데이터 관리
  const [guideData, setGuideData] = useState<GuideGetResponseType>();
  const handleGuideData = async () => {
    // API 호출
    const guideData = await handleGuide({stadiumName, zoneName});

    if (guideData) {  // undefined가 아니면 처리
      setGuideData(guideData);
    }
  }

  // 상태 변경될 때마다 호출
  useEffect(() => {
    handleGuideData();
  }, [stadiumName, zoneName]); // 쿼리 파라미터가 변경될 때마다 실행


  return (
    <div className="relative mb-[84px]">
    {/* 가이드 데이터가 null이 아닐 때 렌더링 */}
    {guideData ? (
      <>
        {/* 좌석 선택 드롭다운 및 Tip 버튼 */}
        <div className="flex items-center mb-4">
            <SeatDropdown
              options={["레드석", "블루석", "오렌지석", "네이비석", "프리미엄석", "테이블석", "익사이팅석", "외야그린석"]}
              selectedOption={guideData.zoneName}
              onSelect={(option) => console.log(option)}
            />
            <button className="ml-auto w-[54px] h-[30px] flex items-center justify-center">
              <Image src={tipIcon} alt="Tip" width={54} height={30} />
            </button>
        </div>

        {/* 야구장 좌석 이미지 */}
        <div className="relative">
          <Image src={guideData.imgUrl} alt={`${guideData.zoneName} 이미지`} className="w-full rounded-lg" width={370} height={198} />
        </div>

        {/* 구장 정보 */}
        <StadiumInfo stadium={guideData.zoneName} />

        <div className="bg-grayscale-5 p-4 rounded-lg mt-4">
          {/* 상단 타이틀 섹션 */}
          <div className={containerClass}>
            <h2 className="text-lg font-bold"  style={{ color: guideData.zoneColor }}>{guideData.zoneName}</h2>
            <p className="text-sm text-gray-700 mt-2">{guideData.explanation}</p>
          </div>

          {/* 세부 정보 섹션 */}
          <div className={`${containerClass} mt-3 space-y-4`}>
            {[
              { title: "출입구 위치", content: guideData.entrance },
              { title: "단차 정보", content: guideData.stepSpacing },
              { title: "좌석 간 간격 (무릎 간격) 정보", content: guideData.seatSpacing },
            ].map((section, index) => (
              <div key={index}>
                <h3 className={sectionTitleClass}>{section.title}</h3>
                <p className={sectionContentClass}>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
        </>
      ):
      null}
    </div>
  );
}
