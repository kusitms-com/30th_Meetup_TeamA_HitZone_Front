import React, { useState } from "react";
import Image from "next/image";
import chatbotClickIcon from "../../../assets/svg/chatbot_click.svg";
import FAQCategoryBar from "./category/FAQCategoryBar";
import FAQCategoryButton from "./category/FAQCategoryButton";


interface Props {
  isStadiumSelected: boolean; // boolean 값을 props로 받음
  onSelect: (category: string) => void;
}

const ChatbotInputField = ({isStadiumSelected, onSelect}: Props) => {
  const [isFAQCategoryVisible, setIsFAQCategoryVisible] = useState(false);

  const renderFAQCategory = () => {
    if(isFAQCategoryVisible) {
      return <FAQCategoryBar setIsFAQCategoryVisible={setIsFAQCategoryVisible} onSelect={onSelect}/>
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
