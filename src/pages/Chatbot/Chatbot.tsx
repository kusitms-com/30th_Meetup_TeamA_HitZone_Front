import React, { useState, useEffect } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import ChatbotStart from "./components/ChatbotStart";
import StadiumSelection from "./components/StadiumSelection";
import ChatInput from "./components/ChatInput";

const Chatbot = () => {
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const [showInitialMessages, setShowInitialMessages] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  // 날짜 받아오기
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    setCurrentDate(formattedDate);

    // 챗봇 페이지 들어온 후 초기 메시지 표시
    const timer = setTimeout(() => {
      setShowInitialMessages(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };

  return (
    <>
      <BackLogoBar />
      <div className="flex justify-center items-center h-screen bg-grayscale-50">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          <div className="flex-1 p-4 overflow-y-auto mb-10">
      
            {/* 오늘 날짜 */}
            <div className="flex justify-center mt-1 mb-6">
              <span className="bg-grayscale-5 px-6 py-[3px] text-grayscale-90 text-xs font-regular rounded-full">
                {currentDate}
              </span>
            </div>

            {/* 시작 메시지 */}
            {showInitialMessages && <ChatbotStart />}

            {/* 구장 선택 */}
            {showInitialMessages && (
              <StadiumSelection 
                stadiums={stadiumList} 
                onSelect={handleStadiumSelect} 
              />
            )}

            {/* 선택한 구장 */}
            {selectedStadium && (
              <div className="flex justify-end mb-4">
                <div className="bg-main-5 px-3 py-2 rounded-lg text-grayscale-90 max-w-xs text-xs font-regular">
                  {selectedStadium}
                </div>
              </div>
            )}
          </div>

          {/* 채팅 입력창 */}
          <ChatInput />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
