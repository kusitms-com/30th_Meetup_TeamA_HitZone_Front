import React, { useState, useEffect, SetStateAction } from "react";
import Image from "next/image";
import Header from "../../components/layout/HeaderCenter";
import NavBar from "../../components/layout/NavBar";
import Dropdown from "../Main/components/Dropdown";
import GuideDetailContent from "./components/GuideDetailContent";
import guideJamsil from "../../assets/svg/guide_jamsil.svg";

import { StadiumType, stadiumList } from "@/src/constants/ZoneData";

import { handleGetStadiumInfo } from "@/src/api/StadiumApiHandler";
import { ZoneGetParamsType, ZoneGetResponseType, ZoneType } from "@/src/api/StadiumApiType";

interface StadiumInfoProps {
  selectedStadium: StadiumType;
  setSelectedStadium: (stadium: SetStateAction<StadiumType>) => void;
  selectedSection: string;
  setSelectedSection: (section: SetStateAction<string>) => void;
  selectedSectionColor: string;
  setSelectedSectionColor: (color: SetStateAction<string>) => void;
  zoneNameList: string[];
  setZoneNameList: (zoneNameList: SetStateAction<string[]>) => void;
  handleStadiumSelect: (stadium: StadiumType) => void;
  handleSectionClick: (zoneName: string) => void;
  stadiumInfo: ZoneGetResponseType | undefined;
  setStadiumInfo: (stadiumInfo: SetStateAction<ZoneGetResponseType | undefined>) => void;
}
import { useRouter } from 'next/router';  // useRouter를 임포트합니다.


const Guide: React.FC<StadiumInfoProps> = ({
  selectedStadium,
  setSelectedStadium,
  selectedSection,
  setSelectedSection,
  selectedSectionColor,
  setSelectedSectionColor,
  zoneNameList,
  setZoneNameList,
  handleStadiumSelect,
  handleSectionClick,
  stadiumInfo,
  setStadiumInfo
}) => {
  
  const router = useRouter();  // useRouter 훅을 사용하여 router 객체를 가져옵니다.
  /*
  useEffect(() => {
    if (selectedSection) {
      // selectedSection이 있을 경우, /guide로 리다이렉트
      router.push({
        pathname: '/guide/zone`', // 리다이렉트할 경로
        query: { 
          zoneName: selectedSection,   // selectedSection을 쿼리 파라미터로 전달
          zoneColor: selectedSectionColor,  // zoneColor를 쿼리 파라미터로 전달
        },
      });
    }
  }, [selectedSection, selectedSectionColor, router]);  // selectedSection이나 selectedSectionColor가 바뀔 때마다 실행
*/

  return (
    <div className="flex flex-col h-screen">
      <Header />
    
      <div className="flex-1 overflow-y-auto mt-[15px]">
        {(selectedSection?
          <div>
            <GuideDetailContent stadiumName={selectedStadium} zoneName={selectedSection} zoneColor={selectedSectionColor} zoneNameList={zoneNameList} onSelectZone={handleSectionClick}/>
          </div>
        : stadiumInfo ? (
          <>
            <Dropdown options={stadiumList} selectedOption={selectedStadium} onSelect={handleStadiumSelect} />
            <div className="mt-4">
              <Image
                src={stadiumInfo.imgUrl}
                alt={`${selectedStadium} 이미지`}
                className="w-full h-auto rounded-lg"
                width={370}
                height={198}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-2">{stadiumInfo.introduction}</p>
            </div>

            <h2 className="mt-6 text-lg font-bold text-left text-gray-700">궁금하신 구역을 선택해주세요!</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stadiumInfo.zones.map((zone, zoneIndex) => (
                <button
                  key={zone.zoneName}
                  className="flex items-center justify-start h-12 bg-gray-100 rounded-lg"
                  onClick={() => handleSectionClick(zone.zoneName)}
                  style={{ color: zone.zoneColor }}
                >
                  <div className="w-3 h-3 rounded-sm ml-3 mr-2" style={{ backgroundColor: zone.zoneColor }}/>
                  <span className="text-gray-700 text-sm font-medium">{zone.zoneName}</span>
                </button>
              ))}
            </div>
          </>
            ): null
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default Guide;
