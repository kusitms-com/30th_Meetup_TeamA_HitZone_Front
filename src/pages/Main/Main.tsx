import React, { useState } from "react";
import Header from "../../components/layout/Header";
import NavBar from "../../components/layout/NavBar";
import BignnerGuide from "../../components/chips/BignnerGuide";
import BignnerGuideDialog from "../../components/dialogs/BignnerGuideDialog";
import Dropdown from "./components/Dropdown";
import JamsilSeat from "./components/JamsilSeat";
import KtwizSeat from "./components/KtwizSeat";
import StadiumInfo from "./components/StadiumInfo";
import SeatRecommendButton from "./components/SeatRecommendButton";
import ChatBot from "../../components/button/ChatBot";

function Main() {
  const [selectedStadium, setSelectedStadium] = useState("잠실종합운동장 (잠실)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stadiums = [
    "잠실종합운동장 (잠실)",
    "수원KT위즈파크",
    "고척스카이돔 (키움)",
    "기아 챔피언스 필드 (광주)",
    "삼성 라이온즈 파크 (대구)",
    "한화생명 이글스 파크 (대전)"
  ];

  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <Header />
      <div className="w-full max-w-[500px] mx-auto">
        <p className="text-xl font-bold text-grayscale-90 pt-5">
          오늘은 어떤 야구장에 방문하시나요?
        </p>

        {/* 야구장 드롭다운 */}
        <div className="flex items-center gap-4 justify-between mt-4">
          <Dropdown
            options={stadiums}
            selectedOption={selectedStadium}
            onSelect={handleStadiumSelect}
          />

          {/* 초보자 구역 가이드 버튼 */}
          <BignnerGuide onClick={toggleModal} />
        </div>

        {/* 초보자 구역 가이드 모달 */}
        <BignnerGuideDialog isOpen={isModalOpen} onClose={toggleModal} />

        {/* 야구장 좌석 이미지 선택 */}
        <div className="mt-6 flex justify-center">
          {selectedStadium === "잠실종합운동장 (잠실)" ? (
            <JamsilSeat />
          ) : selectedStadium === "수원KT위즈파크" ? (
            <KtwizSeat />
          ) : (
            <p className="text-grayscale-90">해당 구장은 추후 업데이트 예정입니다 :)</p>
          )}
        </div>
        {/* 구장 정보 */}
        <StadiumInfo stadium={selectedStadium} />

        {/* 나에게 맞는 구역 찾으러 가기 버튼 */}
        <SeatRecommendButton stadium={selectedStadium} />
      
         {/* 플로팅 챗봇 버튼 */}
         <ChatBot />
      </div>
      <NavBar />
    </div>
  );
}

export default Main;
