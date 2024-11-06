import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Header from "../../components/layout/HeaderCenter";
import NavBar from "../../components/layout/NavBar";
import Dropdown from "../Main/components/Dropdown";
import guideJamsil from "../../assets/svg/guide_jamsil.svg";
import guideKtwiz from "../../assets/svg/guide_ktwiz.svg";

type Section = {
  color: string;
  name: string;
};

type StadiumInfo = {
  image: StaticImageData;
  description: string;
  sections: Section[];
};

const stadiumData: { [key: string]: StadiumInfo } = {
  "잠실종합운동장 (잠실)": {
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
  },
  "수원KT위즈파크": {
    image: guideKtwiz,
    description: "한국 프로 야구의 10번째 심장 KT wiz",
    sections: [
      { color: "bg-kt-cheer", name: "응원지정석" },
      { color: "bg-kt-genie", name: "지니TV석" },
      { color: "bg-kt-central", name: "중앙지정석" },
      { color: "bg-kt-ybox", name: "Y박스석" },
      { color: "bg-kt-sky", name: "스카이박스(4층)" },
      { color: "bg-kt-skyzone", name: "스카이존(5층)" },
      { color: "bg-kt-exciting", name: "하이파이브/익사이팅석" },
      { color: "bg-kt-alphashopping", name: "KT알파쇼핑석" },
      { color: "bg-kt-geniezone", name: "지니존" },
      { color: "bg-kt-tving", name: "티빙 테이블석" },
      { color: "bg-kt-outfield", name: "외야 잔디 자유석" },
      { color: "bg-kt-kidsland", name: "키즈랜드 캠핑존" },
    ],
  },
};

const Guide = () => {
  const [selectedStadium, setSelectedStadium] = useState<string>("잠실종합운동장 (잠실)");

  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };

  const stadiumInfo = stadiumData[selectedStadium];

  return (
    <div className="flex flex-col">
      <Header/>

      <div className="flex-1 overflow-y-auto mt-[15px]">
        <Dropdown
          options={Object.keys(stadiumData)}
          selectedOption={selectedStadium}
          onSelect={handleStadiumSelect}
        />

        {/* 야구장 이미지 및 설명 */}
        {stadiumInfo && (
          <div className="mt-4">
            <Image
              src={stadiumInfo.image}
              alt={`${selectedStadium} 이미지`}
              className="w-full h-auto rounded-lg"
              width={370}
              height={198}
            />
            <p className="text-center text-sm font-medium text-grayscale-90 mt-2">{stadiumInfo.description}</p>
          </div>
        )}

        {/* 구역 선택 버튼 */}
        <h2 className="mt-6 text-lg font-bold text-left text-grayscale-90">궁금하신 구역을 선택해주세요!</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {stadiumInfo.sections.map((section: Section) => (
            <button
              key={section.name}
              className="flex items-center justify-start h-12 bg-grayscale-5 rounded-lg"
            >
              <div className={`w-3 h-3 rounded-sm ml-3 mr-2 ${section.color}`} />
              <span className="text-grayscale-90 text-sm font-medium">{section.name}</span>
            </button>
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default Guide;
