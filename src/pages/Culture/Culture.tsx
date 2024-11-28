import React, { useState } from "react";
import CultureHeader from "../../components/layout/CultureHeader";
import NavBar from "../../components/layout/NavBar";
import Tabs from "./components/Tabs";
import dummyData from "../../constants/CultureData";
import CategoryHeader from "./components/CategoryHeader";
import CategoryRow from "./components/CategoryRow";
import Modal from "./components/CultureModal";
import Detail from "./components/Detail";

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

  const handleShowAll = (type: string) => {
    setViewAllType(type);
  };


  const renderCategory = (category: CategoryKeyType) => {
    const data = dummyData[selectedTab][category];

    if (isInternalData(data) && selectedTab === "먹거리" && category === "내부") {
      return (
        <>
          <CategoryHeader title={`구장 ${category}`} level={1} />
          <CategoryHeader
            title="식사류"
            level={2}
            showButton
            onClick={() => handleShowAll("식사류")}
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
            onClick={() => handleShowAll("후식류")}
          />
          <CategoryRow
            data={data.후식류}
            isActivity={false}
            onCardClick={handleCardClick}
          />
        </>
      );
    }

    if ((selectedTab === "먹거리" || selectedTab === "즐길거리") && Array.isArray(data)) {
      return (
        <>
          <CategoryHeader title={`구장 ${category}`} level={1} />
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
    const internalData = dummyData["먹거리"]["내부"];
    const dataToRender =
      viewAllType === "식사류"
        ? (internalData as InternalData).식사류
        : viewAllType === "후식류"
        ? (internalData as InternalData).후식류
        : [];
    return (
      <Detail
        data={dataToRender}
        title={`전체보기: ${viewAllType}`}
      />
    );
  }

  return (
    <div className="flex flex-col bg-grayscale-5 h-screen pb-14">
      <div className="sticky top-0 z-10 bg-white">
        <CultureHeader />
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
