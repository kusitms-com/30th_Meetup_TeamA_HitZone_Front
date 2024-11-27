import React, { useState } from "react";
import Image from "next/image";
import chatbotClickIcon from "@/src/assets/svg/chatbot_click.svg";
import FAQCategoryBar from "./FAQCategoryBar";
import FAQCategoryButton from "./FAQCategoryButton";

// 외부 클릭시 닫히는 이벤트 훅
import { useOutsideClick } from "@/src/hooks/useOutsideClick";

interface Props {
  isStadiumSelected: boolean; // boolean 값을 props로 받음
  onSelect: (category: string) => void;
}

const ChatbotInputField = ({isStadiumSelected, onSelect}: Props) => {
  const [isFAQCategoryVisible, setIsFAQCategoryVisible] = useState(false);

  // 외부 클릭 시 실행될 함수
  const closeFAQCategory = () => {
    setIsFAQCategoryVisible(false);
  };
  // FAQCategory 컴포넌트 감지를 위한 ref
  const categoryRef = useOutsideClick(closeFAQCategory);

  const renderFAQCategory = () => {
    if(isFAQCategoryVisible) {
      return (
        <div ref={categoryRef}>
          <FAQCategoryBar setIsFAQCategoryVisible={setIsFAQCategoryVisible} onSelect={onSelect} />
        </div>
      );
    }else {
      return <FAQCategoryButton setIsFAQCategoryVisible={setIsFAQCategoryVisible} />
    }
  };

  return (
    <>
      {/* 플러스 버튼 리스트 */}
      {/* 야구장 구역을 선택한 경우에만 함수 호출 */}
      {isStadiumSelected && renderFAQCategory()}

      {/* 입력창 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[500px] w-full bg-white flex justify-center items-center px-2 pt-3 pb-4">
        <div className="flex items-center w-full bg-grayscale-5 rounded-full px-2 py-[10px]">
          <input
            type="text"
            placeholder="챗봇에게 메시지 보내기"
            className="border-none bg-transparent text-grayscale-60 text-xs font-medium outline-none px-2"
          />
        </div>
        <button className="ml-2 bg-main-50 rounded-full p-2 flex items-center justify-center text-xxs hover:bg-mainhover-50">
          <Image src={chatbotClickIcon} alt="메시지 보내기 아이콘" width={20} height={20} />
        </button>
      </div>
    </>
  );
};

export default ChatbotInputField;
