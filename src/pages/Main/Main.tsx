import React, { useState, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Header from "../../components/layout/Header";
import NavBar from "../../components/layout/NavBar";
import BignnerGuide from "../../components/chips/BignnerGuide";
import BignnerGuideDialog from "../../components/dialogs/BignnerGuideDialog";
import Dropdown from "./components/Dropdown";
import JamsilSeat from "./components/JamsilSeat";
import KtwizSeat from "./components/KtwizSeat";
import StadiumInfo from "./components/StadiumInfo";
import SeatRecommendButton from "./components/SeatRecommendButton";
import ChatBot from "../../components/button/FloatingChatbotButton";

// Enum으로 추천 구역 Data 관리
import { StadiumType, SeatType, Keyword, stadiumTypeToString, stringToStadiumType, frontStadiums } from "../../constants/ZoneData"

export interface Props {
  selectedStadium: StadiumType;
  setSelectedStadium: Dispatch<SetStateAction<StadiumType>>;
}


const Main = ({ selectedStadium, setSelectedStadium }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stringToStadiumType[stadium]);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  ///////////////////////////////////////////////////////////
  // 🐻 INAE 추가 코드
  // 로그인, 회원가입 상태 관리
  /*
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // 로그인 페이지로 리디렉션 (이동)
      router.push("/login");

    } else if (status === "authenticated") {
      const isFirstTimeUser = true; // 예시로 설정, 실제 사용자 DB 정보로 확인 필요

      // 회원 가입 페이지로 리디렉션 (이동)
      if (isFirstTimeUser) {
        router.push("/onboarding");
      }
    }
  }, [status, router]);
  */
  ///////////////////////////////////////////////////////////

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col w-full h-screen">
      <Header />

      <div className="flex-1">
        <p className="text-xl font-bold text-grayscale-90 pt-5 text-left w-full">
          오늘은 어느 야구장에 방문하시나요?
        </p>

        {/* 야구장 드롭다운 */}
        <div className="flex items-center gap-4 justify-between mt-4">
          <Dropdown
            options={frontStadiums}
            selectedOption={stadiumTypeToString[selectedStadium]}
            onSelect={handleStadiumSelect}
          />
          {/* 초보자 구역 가이드 버튼 */}
          <BignnerGuide onClick={toggleModal} />
        </div>

        {/* 초보자 구역 가이드 모달 */}
        <BignnerGuideDialog isOpen={isModalOpen} onClose={toggleModal} />

        {/* 야구장 좌석 이미지 선택 */}
        <div className="mt-4 flex justify-center">
          {selectedStadium === StadiumType.JAMSIL ? (
            <JamsilSeat />
          ) : selectedStadium === StadiumType.SUWON_KT ? (
            <KtwizSeat />
          ) : (
            <p className="text-grayscale-90">해당 구장은 추후 업데이트 예정입니다 :)</p>
          )}
        </div>

        {/* 구장 정보 */}
        <StadiumInfo stadium={selectedStadium} />

        {/* 나에게 맞는 구역 찾으러 가기 버튼 */}
        <SeatRecommendButton stadium={selectedStadium} />
      </div>
      
      <NavBar />

      {/* 플로팅 챗봇 버튼 */}
      <ChatBot />
    </div>
  );
}

export default Main;
