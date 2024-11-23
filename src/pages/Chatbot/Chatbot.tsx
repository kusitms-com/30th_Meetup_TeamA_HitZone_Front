import React, { useState, useEffect, useRef } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import StadiumSelection from "./components/chatcategory/StadiumSelection";
import ChatbotInputField from "./components/ChatbotInputField";

import DateBanner from "./components/DateBanner";

import { questionCategories } from "@/src/constants/ChatbotData";

import RookieChat from "./components/RookieChat";
import UserChat from "./components/UserChat";

const Chatbot = () => {
  // 스타디움 선택 관련
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);  // 선택한 스타디움 저장
  const isStadiumSelected = selectedStadium !== null && selectedStadium !== ""; // 스타디움 선택 여부
  const [showInitialMessages, setShowInitialMessages] = useState(false);        // 초기 메시지 출력 여부
  
  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };
  

  // 챗봇 첫 인사 렌더링 관련
  useEffect(() => {
    // 챗봇 페이지 들어온 후 초기 메시지 표시
    const timer = setTimeout(() => {
      setShowInitialMessages(true);
    }, );

    return () => clearTimeout(timer);
  }, []);


  // 카테고리 선택 관련
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };


  // 자동 스크롤 기능
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // 채팅이 추가될 때 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [selectedStadium, selectedCategory]);


  return (
    <>
      {/* 1. 헤더바 */}
      <div>
        <BackLogoBar />
      </div>

      <div className="flex justify-center items-center min-h-screen bg-grayscale-50 mt-[55px] pb-[60px]">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          {/* 채팅 영역 */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto mb-10"
          >
      
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


              
              {/* 야구장 선택시 */}
              {selectedStadium && (
                <>
                  {/* 채팅2: 사용자 답변, 필수 출력 */}
                  <UserChat messageList={[selectedStadium]}/>

                  {/* 채팅3: */}
                  <RookieChat 
                    initialMessage={[`'${selectedStadium}'을(를) 선택하셨군요!😁`]} 
                    contentList={[
                      {
                        type: "textList",
                        content: questionCategories.baseballCategories.userMessage
                      }
                    ]}
                />
                </>
              )}
            </div>
          </div>
          

          {/* 4. 채팅 입력창 */}
          <ChatbotInputField isStadiumSelected={isStadiumSelected} onSelect={handleCategorySelect} />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
