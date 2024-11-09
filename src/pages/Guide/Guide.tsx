import React, { useState } from "react";
import Image from "next/image";
import Header from "../../components/layout/HeaderCenter";
import NavBar from "../../components/layout/NavBar";
import Dropdown from "../Main/components/Dropdown";
import GuideDetailContent from "./components/GuideDetailContent";
import guideJamsil from "../../assets/svg/guide_jamsil.svg";
import jamsilRed from "../../assets/svg/seat/jamsil_red.svg";

import { StadiumType } from "@/src/constants/ZoneData";

// 예시 데이터 (잠실종합운동장 - 레드석)
const dummyData = {
  title: "레드석",
  image: jamsilRed,
  description: "해당 구역은 다양한 것들을 모두 적절히 즐길 수 있는 구역이에요.",
  gateInfo: "[1루] 2-3 Gate [3루] 2-1 Gate",
  stepInfo: "[1루] 약 24~30cm(10열), 약 33~38cm(20열) / [3루] 약 24~30cm(1nn열), 약 33~38cm(22열)",
  seatSpaceInfo: "[1루] 약 25cm [3루] 약 25cm",
};

const Guide = () => {
  const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.JAMSIL);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleStadiumSelect = (stadium: StadiumType) => {
    setSelectedStadium(stadium);
    setSelectedSection(null);
  };

  const handleSectionClick = (sectionName: string) => {
    setSelectedSection(sectionName);
  };

  const stadiumInfo = {
    image: guideJamsil,
    description: "서울의 자존심, LG 트윈스 / 미라클 두산, 두산 베어스",
    sections: [
      { color: "bg-jamsil-red", name: "레드석" },
      { color: "bg-jamsil-blue", name: "블루석" },
      { color: "bg-jamsil-orange", name: "오렌지석" },
      { color: "bg-jamsil-navy", name: "네이비석" },
      { color: "bg-jamsil-premium", name: "프리미엄석" },
      { color: "bg-jamsil-table", name: "테이블석" },
      { color: "bg-jamsil-exciting", name: "익사이팅존" },
      { color: "bg-jamsil-green", name: "외야그린석" },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      <Header />

      <div className="flex-1 overflow-y-auto pb-20 mt-[15px] px-4">
        {selectedSection ? (
          <div>
            <GuideDetailContent {...dummyData} />
          </div>
        ) : (
          <>
            <Dropdown options={[StadiumType.JAMSIL]} selectedOption={selectedStadium} onSelect={handleStadiumSelect} />
            <div className="mt-4">
              <Image
                src={stadiumInfo.image}
                alt={`${selectedStadium} 이미지`}
                className="w-full h-auto rounded-lg"
                width={370}
                height={198}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-2">{stadiumInfo.description}</p>
            </div>

            <h2 className="mt-6 text-lg font-bold text-left text-gray-700">궁금하신 구역을 선택해주세요!</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stadiumInfo.sections.map((section) => (
                <button
                  key={section.name}
                  className="flex items-center justify-start h-12 bg-gray-100 rounded-lg"
                  onClick={() => handleSectionClick(section.name)}
                >
                  <div className={`w-3 h-3 rounded-sm ml-3 mr-2 ${section.color}`} />
                  <span className="text-gray-700 text-sm font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default Guide;
