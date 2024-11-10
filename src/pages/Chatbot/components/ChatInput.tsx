import React, { useState } from "react";
import Image from "next/image";
import plusIcon from "../../../assets/webp/chatbot_plus.webp";
import chatbotClickIcon from "../../../assets/svg/chatbot_click.svg";
import OptionsList from "./OptionsList";

const ChatInput = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <>
      {/* 플러스 버튼 리스트 */}
      <OptionsList isOpen={isOptionsOpen} />

      {/* 입력창 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[500px] w-full p-2 bg-white flex justify-center items-center">
        <Image
          src={plusIcon}
          alt="첨부 아이콘"
          width={18}
          height={18}
          className="mr-3 cursor-pointer"
          onClick={toggleOptions}
        />
        <div className="flex items-center w-full max-w-[450px] bg-grayscale-5 rounded-full px-2 py-1">
          <input
            type="text"
            placeholder="챗봇에게 메시지 보내기"
            className="flex-1 border-none bg-transparent text-grayscale-60 text-xs font-medium outline-none"
          />
          <button className="ml-2 bg-main-50 rounded-full p-2 flex items-center justify-center text-xxs">
            <Image src={chatbotClickIcon} alt="메시지 보내기 아이콘" width={20} height={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
