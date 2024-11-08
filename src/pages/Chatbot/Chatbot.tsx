import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackLogoBar from "../../components/layout/BackLogoBar";
import stadiumIcon from "../../assets/svg/chatbot_select_stadium.svg";
import plusIcon from "../../assets/webp/chatbot_plus.webp";

const Chatbot = () => {
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const [showInitialMessages, setShowInitialMessages] = useState(false);

  const stadiums = [
    "고척 스카이돔 (키움)",
    "광주 기아 챔피언스 필드",
    "대구 삼성 라이온즈 파크",
    "대전 한화생명 이글스 파크",
    "사직 야구장 (부산)",
    "서울종합운동장야구장 (잠실)",
    "수원 KT 위즈 파크",
    "인천 SSG 랜더스필드",
    "창원 NC 파크",
  ];

  useEffect(() => {
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* 중앙 정렬과 최대 너비 제한 */}
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">

          {/* 챗봇 대화 내용 */}
          <div className="flex-1 p-4 overflow-y-auto mb-10">
            
            {/* 날짜 */}
            <div className="flex justify-center mt-1 mb-6">
              <span className="bg-white px-6 py-[3px] text-grayscale-90 text-xs font-regular rounded-full shadow-sm">
                2024년 11월 9일 토요일
              </span>
            </div>

            {/* 챗봇 인사 메시지 (2초 지연 후 표시) */}
            {showInitialMessages && (
              <>
                <div className="flex items-start mb-2 transition-opacity duration-1000">
                  <div className="w-8 h-8 bg-main-50 rounded-xl mr-2"></div>
                  <div className="bg-white p-3 rounded-lg text-xs font-regular text-grayscale-90 shadow-md max-w-xs">
                    <p>안녕하세요! 챗봇 루키 입니다.</p>
                    <p>궁금하신 정보를 실시간 채팅으로 확인하실 수 있습니다.</p>
                  </div>
                </div>

                {/* 방문 예정 구장 선택 말풍선 */}
                <div className="flex items-start mb-4 ml-10 transition-opacity duration-500">
                  <div className="bg-white rounded-lg shadow-md max-w-[245px] w-full">
                    <Image src={stadiumIcon} alt="구장 선택" width={245} height={99} />
                    <div className="grid grid-cols-1 gap-2 p-3 text-xs font-regular">
                      {stadiums.map((stadium) => (
                        <button
                          key={stadium}
                          onClick={() => handleStadiumSelect(stadium)}
                          className="bg-grayscale-5 text-grayscale-90 py-2 rounded-md shadow-md hover:bg-grayscale-10"
                        >
                          {stadium}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 선택한 구장 */}
            {selectedStadium && (
              <div className="flex justify-end mb-4">
                <div className="bg-main-5 px-3 py-2 rounded-lg text-grayscale-90 shadow-md max-w-xs text-xs font-regular">
                  {selectedStadium}
                </div>
              </div>
            )}
          </div>

          {/* 입력창 고정 */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[500px] w-full p-4 bg-white flex items-center">
            <Image src={plusIcon} alt="첨부 아이콘" width={18} height={18} className="mr-3" />
            <input
              type="text"
              placeholder="챗봇에게 메시지 보내기"
              className="flex-1 border-none rounded-full px-4 py-2 bg-grayscale-5 text-grayscale-60 text-xs font-medium outline-none"
            />
            <button className="ml-2 bg-main-50 rounded-full p-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
