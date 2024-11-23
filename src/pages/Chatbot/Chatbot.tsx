import React, { useState, useEffect } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import ChatbotStart from "./components/ChatbotStart";
import StadiumSelection from "./components/StadiumSelection";
import ChatInput from "./components/ChatInput";

import DateBanner from "./components/DateBanner";

import ChabotDataTestPage from "@/src/pages/Chatbot/components/ChabotDataTestPage";

const Chatbot = () => {
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const [showInitialMessages, setShowInitialMessages] = useState(false);
  
  useEffect(() => {
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
      <div>
        <BackLogoBar />
      </div>
      <div className="flex justify-center items-center h-screen bg-grayscale-50 mt-[55px] mb-10">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          <div className="flex-1 p-4 overflow-y-auto mb-10">
      
            {/* 오늘 날짜 */}
            <DateBanner date={new Date()} />
            <ChabotDataTestPage/>
          </div>

          {/* 채팅 입력창 */}
          <ChatInput />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
