import React, { useState, useEffect } from "react";
import Image from "next/image";
import StadiumInfo from "../../Main/components/StadiumInfo";
import SeatDropdown from "./SeatDropdown";
import tipIcon from "../../../assets/svg/tip_button.svg";

import { handleGuide } from "@/src/api/StadiumApiHandler";
import { GuideGetParamsType, GuideGetResponseType, ReferenceGroup, Reference, ZoneType } from "@/src/api/StadiumApiType";

import useModal from '@/src/hooks/useModal';
import SeatTipDialog from "@/src/components/dialogs/SeatTipDialog";


interface Props extends GuideGetParamsType {
  zoneNameList: string[];
}

export default function GuideDetailContent({stadiumName, zoneName, zoneNameList}: Props) {
  // 공통 클래스 정의
  const containerClass = "bg-grayscale-0 p-3 rounded-lg";
  const sectionTitleClass = "text-sm font-semibold text-grayscale-80 bg-gray-100 px-2 py-1 rounded inline-block";
  const sectionContentClass = "text-sm font-regular text-black mt-2";
  
  // 모달창 이벤트
  const { isOpen, openModal, closeModal } = useModal();

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
              options={zoneNameList}
              selectedOption={guideData.zoneName}
              onSelect={(option) => console.log(option)}
            />
            <button className="ml-auto w-[54px] h-[30px] flex items-center justify-center">
              <Image src={tipIcon} alt="Tip" width={54} height={30} onClick={openModal} />
            </button>
            {isOpen && guideData.referencesGroup && guideData.referencesGroup.length > 0 && (
              <SeatTipDialog
                zoneName={guideData.zoneName}
                zoneColor={guideData.zoneColor}
                tip={guideData.tip}
                referencesGroup={guideData.referencesGroup[0]} // 첫 번째 referencesGroup만 전달
                onClose={closeModal} // 모달 닫기 함수
              />
            )}
        </div>

        {/* 야구장 좌석 이미지 */}
        <div className="relative">
          <Image src={guideData.imgUrl} alt={`${guideData.zoneName} 이미지`} className="w-full rounded-lg" width={370} height={198} />
        </div>

        {/* 구장 정보 */}
        <StadiumInfo stadiumName={stadiumName} firstBase={guideData.firstBaseSide} thirdBase={guideData.thirdBaseSide} />

        <div className="bg-grayscale-5 p-4 rounded-lg mt-4">
          {/* 상단 타이틀 섹션 */}
          <div className={containerClass}>
            <h2 className="text-lg font-bold"  style={{ color: guideData.zoneColor }}>{guideData.zoneName}</h2>
            <p className="text-sm text-gray-700 mt-2">{guideData.explanation}</p>
          </div>

          {/* 세부 정보 섹션 */}
          <div className={`${containerClass} mt-3 space-y-4`}>
            {[
              { title: "출입구 위치", contents: guideData.entrance },
              { title: "단차 정보", contents: guideData.stepSpacing },
              { title: "좌석 간 간격 (무릎 간격) 정보", contents: guideData.seatSpacing },
              { title: "이용 정보", contents: guideData.usageInformation },
            ].map((section, index) => (
              // content가 빈 문자열(null, undefined, "")이 아닌 경우에만 출력
              section.contents && section.contents.some(content => content.trim() !== "") ? (
                <div key={index}>
                  <h3 className={sectionTitleClass}>{section.title}</h3>
                  {section.contents.map((content: string, contentIndex: number) => (
                    <p key={contentIndex} className={sectionContentClass}>{content}</p>
                  ))}
                </div>
              ) : null
            ))}
          </div>
        </div>
        </>
      ):
      null}
    </div>
  );
}
