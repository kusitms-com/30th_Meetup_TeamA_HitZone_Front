import React, { useState } from "react";
import CultureHeader from "../../components/layout/CultureHeader";
import NavBar from "../../components/layout/NavBar";
import Tabs from "./components/Tabs";
import dummyData from "../../constants/CultureData";
import CategoryHeader from "./components/CategoryHeader";
import CategoryRow from "./components/CategoryRow";
import Modal from "./components/CultureModal";
import Detail from "./components/Detail";
import ServiceReady from "../../components/page/ServiceReady";
import { StadiumType } from "@/src/constants/ZoneData";

type CategoryRowData = {
  title: string;
  location?: string;
  menu?: string;
  price?: string;
  description?: string;
  image: string;
};

type InternalData = {
  식사류: CategoryRowData[];
  후식류: CategoryRowData[];
};

type CategoryType = "먹거리" | "즐길거리";
type CategoryKeyType = "내부" | "외부";

const Culture = () => {
  const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.JAMSIL); // 드롭다운 선택 상태
  const [selectedTab, setSelectedTab] = useState<CategoryType>("먹거리");
  const [modalData, setModalData] = useState<CategoryRowData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewAllType, setViewAllType] = useState<string | null>(null);

  const isInternalData = (data: unknown): data is InternalData => {
    return (
      typeof data === "object" &&
      data !== null &&
      "식사류" in data &&
      "후식류" in data
    );
  };

  const handleCardClick = (data: CategoryRowData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleShowAll = (distance: CategoryType, location: CategoryKeyType, food?: string) => {
    const title = food ? `${distance} - ${location} - ${food}` : `${distance} - ${location}`;
    setViewAllType(title);
  };

  const renderCategory = (category: CategoryKeyType) => {
    const data = dummyData[selectedTab][category];

    // 내부 데이터 (식사류, 후식류 포함)
    if (isInternalData(data) && selectedTab === "먹거리" && category === "내부") {
      return (
        <>
          <CategoryHeader title={`구장 ${category}`} level={1} />
          <CategoryHeader
            title="식사류"
            level={2}
            showButton
            onClick={() => handleShowAll("먹거리", "내부", "식사류")}
          />
          <CategoryRow
            data={data.식사류}
            isActivity={false}
            onCardClick={handleCardClick}
          />
          <CategoryHeader
            title="후식류"
            level={2}
            showButton
            onClick={() => handleShowAll("먹거리", "내부", "후식류")}
          />
          <CategoryRow
            data={data.후식류}
            isActivity={false}
            onCardClick={handleCardClick}
          />
        </>
      );
    }

    // 외부 데이터 또는 즐길거리
    if ((selectedTab === "먹거리" || selectedTab === "즐길거리") && Array.isArray(data)) {
      return (
        <>
          <CategoryHeader
            title={`구장 ${category}`}
            level={1}
            showButton
            onClick={() => handleShowAll(selectedTab, category)}
          />
          <CategoryRow
            data={data}
            isActivity={selectedTab === "즐길거리"}
            onCardClick={handleCardClick}
          />
        </>
      );
    }

    return null;
  };

  // 전체보기
  if (viewAllType) {
    const title = viewAllType;
    let dataToRender: CategoryRowData[] = [];

    if (title.includes("식사류") || title.includes("후식류")) {
      const internalData = dummyData["먹거리"]["내부"];
      if (isInternalData(internalData)) {
        dataToRender =
          title.includes("식사류") ? internalData.식사류 : internalData.후식류;
      }
    } else if (title.includes("외부")) {
      dataToRender = dummyData[selectedTab]["외부"] as CategoryRowData[];
    } else {
      dataToRender = dummyData[selectedTab]["내부"] as CategoryRowData[];
    }

    return <Detail data={dataToRender} title={`전체보기: ${viewAllType}`} />;
  }

  // 수원KT야구장 선택 시 준비 중인 서비스 표시
  if (selectedStadium === StadiumType.SUWON_KT) {
    return (
      <div className="flex flex-col h-screen bg-white -mt-2">
        <div className="sticky top-0 z-10">
          <CultureHeader onStadiumSelect={setSelectedStadium} />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <ServiceReady />
        </div>
        <NavBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-grayscale-5 h-screen pb-14">
      <div className="sticky top-0 z-10 bg-white">
        <CultureHeader onStadiumSelect={setSelectedStadium} />
      </div>
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        <Tabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        {renderCategory("내부")}
        {renderCategory("외부")}
      </div>
      <NavBar />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </div>
  );
};

export default Culture;
