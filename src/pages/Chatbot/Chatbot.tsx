import React, { useState, useEffect, useRef } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import StadiumSelection from "./components/stadiumcategory/StadiumSelection";
import ChatbotInputField from "./components/input/ChatbotInputField";

import DateBanner from "./components/DateBanner";

import { questionCategories, GuideResponseData } from "@/src/constants/ChatbotData";
import { GuideGetResponseType } from "@/src/api/ChatbotApiType";

import RookieChat from "./components/RookieChat";
import UserChat from "./components/UserChat";
import CategoryChat from "./components/CategoryChat";

import RookieImageMessage from "./components/message/custom/RookieImageMessage";
import chatbotManualIcon from "@/src/assets/webp/chatbot_manual.webp";

const Chatbot = () => {
  // 스타디움 선택 관련
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);  // 선택한 스타디움 저장
  const isStadiumSelected = selectedStadium !== null && selectedStadium !== ""; // 스타디움 선택 여부
  const [showInitialMessages, setShowInitialMessages] = useState(false);        // 초기 메시지 출력 여부
  const [isLoading, setIsLoading] = useState(true);   // 로딩 상태 추가 // 초기에는 자동 스크롤 실행되지 않도록 하기 위함
  
  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
    setIsLoading(false); // 로딩이 끝나면 isLoading을 false로 설정
  };
  

  // 챗봇 첫 인사 렌더링 관련
  useEffect(() => {
    // 챗봇 페이지 들어온 후 초기 메시지 표시
    setShowInitialMessages(true);
  }, []);


  // 카테고리 선택 관련 (배열로 저장해야 프론트에서 관리 및 계속 대화 생성 가능)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const MAX_CATEGORIES = 15; // 카테고리 최대 개수 지정
  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category];

      // 배열이 최대 개수를 넘으면 가장 오래된 항목 제거 후 새로운 항목 추가
      if (updatedCategories.length > MAX_CATEGORIES) {
        updatedCategories.shift(); // 가장 오래된 항목 제거
      }
      return updatedCategories;
    });
  };

  // 가이드 챗봇 답변 관련
  const [responseGuideDataList, setResponseGuideDataList] = useState<GuideResponseData[]>([]); // 세부 카테고리 index와 매핑하여 API 응답 저장

  // API 응답을 category index에 매핑하여 저장
  const handleGuideResponseUpdate = (answer: string, imgUrl: string, linkName: string, link: string, categoryKey: number, categoryName: string, subCategoryKey: number, subCategoryName: string) => {
    setResponseGuideDataList((prev) => [
      ...prev,
      
      {
        answer: answer,
        imgUrl: imgUrl,
        linkName: linkName,
        link: link,
        categoryNumber: categoryKey,
        categoryName: categoryName,
        subcategoryNumber: subCategoryKey,
        subCategoryName: subCategoryName,
      },
    ]);
  };

  
  // 가이드 답변 렌더링
  const renderGuideAnswerData = (response: GuideGetResponseType) => {
    const answerImageUrl = response.imgUrl;
    const answerString = response.answer;
    const answerLinkName = response.linkName;
    const answerLink = response.link;

    console.log(answerLinkName);
    console.log(answerLink);

    const answerListWithImg = [
      { type: "imgUrl", content: answerImageUrl },
      { type: "preformattedText", content: answerString }
    ];
    const answerList = [
      { type: "preformattedTextWithTail", content: answerString },
    ];
    const answerListWithBtn = [
      { type: "preformattedTextButtonWithTail", content: answerString, buttonContent: answerLinkName, url: answerLink },
    ];

    return (
      <>
        {answerImageUrl  ?
          // 이미지, 답변 출력
          <RookieChat 
            contentList={answerListWithImg}
          />
        : answerLink  ?
          // 이미지, 답변, 링크로 이동하는 버튼 출력
          <RookieChat 
            contentList={answerListWithBtn}
          />
        : 
          // 답변 출력
          <RookieChat 
            contentList={answerList}
          />
        }
      </>
    );
  }


  // 스크롤을 조작할 영역(채팅창 div) 지정
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 기능
  // 채팅이 추가될 때 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    // 채팅 영역을 넘어서 전체 페이지를 맨 아래로 스크롤
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',  // 부드러운 스크롤
    });
    
    // 채팅 영역 맨 아래로 스크롤
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [selectedStadium, selectedCategories, responseGuideDataList]);



  // 처음에 보여줄 컨텐츠
  const renderInitialMessage = () => {
    return (
      <>
        {/* 루키 사용 설명서 */}
        <RookieImageMessage imgIcon={chatbotManualIcon} />
        
        {/* 스타디움 선택창 */}
        <StadiumSelection stadiums={stadiumList} onSelect={handleStadiumSelect} />
      </>
    );
  }


  return (
    <div>
      <div>
        {/* 1. 헤더바 */}
        <BackLogoBar />
      </div>

      <div className="flex justify-center items-center h-full min-h-screen bg-grayscale-10 mt-[55px] ">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          {/* 채팅 영역 */}
          <div
            ref={chatContainerRef}
            className="flex-1 px-3 py-4 h-full overflow-y-auto mb-10"
          >
      
            {/* 2. 오늘 날짜 */}
            <DateBanner date={new Date()} />

            {/* 3. 채팅 내역  */}
            <div className="px-1">
              
              {/* 채팅1: 구장 선택, 루키 시작 인사말, 필수 출력 */}
              {showInitialMessages && (
                <RookieChat 
                  contentList={[
                    {
                      type: "textListWithTail",
                      content: questionCategories.greetings
                    },
                    {
                      type: "component",
                      content: renderInitialMessage()
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
                  {/* 첫 번째 내용물은 꼬랑지 말풍선에 출력 */}
                  {/* 두 번째 내용물은 일반 말풍선에 출력 */}
                  <RookieChat 
                    contentList={[
                      {
                        type: "textListWithTail",
                        content: [`'${selectedStadium}'을(를) 선택하셨군요!😁`]
                      },

                      {
                        type: "textList",
                        content: questionCategories.baseballCategories.userMessage
                      }
                    ]}
                  />
                </>
              )}

              {/* 카테고리 선택시 배열에 저장 및 순차 출력 */}
              {selectedStadium && selectedCategories.map((categoryFrontName, index) => (
                <div key={index}>
                  <>
                    {/* 사용자 답변 출력 */}
                    <UserChat messageList={[categoryFrontName]}/>

                    {/* 선택된 카테고리에 대한 챗봇 응답 출력 */}
                    <RookieChat 
                      contentList={[
                        {
                          type: "component",
                          content: <CategoryChat stadiumName={selectedStadium} categoryKey={index} categoryFrontName={categoryFrontName} onResponseUpdate={handleGuideResponseUpdate} />
                        }
                      ]}
                    />


                    {/* 서브 카테고리 선택시 순차 출력 */}
                    {/* Guide API 답변 출력: 해당 카테고리에만 매핑되는 데이터를 필터링하여 출력 */}
                    {responseGuideDataList
                      .filter((responseGuideData) => responseGuideData.categoryNumber === index) // 현재 카테고리에 해당하는 데이터만 필터링
                      .map((responseGuideData, responseIndex) => (
                        <div key={responseIndex}>
                          <UserChat messageList={[responseGuideData.categoryName + " ▶︎ " + responseGuideData.subCategoryName]}/>

                          {/* Guide API 답변 출력: 해당 카테고리에만 매핑되는 데이터를 필터링하여 출력 */}
                          <div className="py-2">
                            {renderGuideAnswerData(responseGuideData)}
                          </div>
                        </div>
                    ))}
                  </>
                </div>
              ))}

            </div>
          </div>


          {/* 4. 채팅 입력창 */}
          <ChatbotInputField isStadiumSelected={isStadiumSelected} onSelect={handleCategorySelect} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
