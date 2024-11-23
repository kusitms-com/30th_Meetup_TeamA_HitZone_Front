import React, { useState, useEffect } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import StadiumSelection from "./components/chatcategory/StadiumSelection";
import ChatbotInputField from "./components/ChatbotInputField";

import DateBanner from "./components/DateBanner";

import { questionCategories } from "@/src/constants/ChatbotData";

import RookieChat from "./components/RookieChat";
import UserChat from "./components/UserChat";

const Chatbot = () => {
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const isStadiumSelected = selectedStadium !== null && selectedStadium !== "";
  const [showInitialMessages, setShowInitialMessages] = useState(false);
  
  useEffect(() => {
    // 챗봇 페이지 들어온 후 초기 메시지 표시
    const timer = setTimeout(() => {
      setShowInitialMessages(true);
    }, );

    return () => clearTimeout(timer);
  }, []);

  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };

  return (
    <>
      {/* 1. 헤더바 */}
      <div>
        <BackLogoBar />
      </div>

      <div className="flex justify-center items-center min-h-screen bg-grayscale-50 mt-[55px] mb-5">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          <div className="flex-1 p-4 overflow-y-auto mb-10">
      
            {/* 2. 오늘 날짜 */}
            <DateBanner date={new Date()} />

            {/* 3. 채팅 내역  */}
            <div className="px-1">
              
              {/* 채팅1: 구장 선택, 루키 시작 인사말, 필수 출력 */}
              {showInitialMessages && (
                <RookieChat 
                  initialMessage={questionCategories.greetings} 
                  contentList={[
                    {
                      type: "component",
                      content: <StadiumSelection stadiums={stadiumList} onSelect={handleStadiumSelect} />
                    }
                  ]}
                />
              )}


              
              {/* 채팅2: 구장 선택시, 사용자 답변, 필수 출력 */}
              {selectedStadium && (
                <UserChat messageList={[selectedStadium]}/>
              )}
            </div>
          </div>
          

          {/* 4. 채팅 입력창 */}
          <ChatbotInputField isStadiumSelected={isStadiumSelected}/>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
