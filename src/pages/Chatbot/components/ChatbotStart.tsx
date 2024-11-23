import React from "react";
import Image from "next/image";
import chatbotIcon from "@/src/assets/svg/chatbot_lookie.svg";

import RookieMessageTail from "./RookieMessageTail";

const ChatbotStart = () => {
  return (
    <div className="flex items-start mb-2 transition-opacity duration-1000">
      <div className="flex items-center justify-center bg-main-40 rounded-md w-11 h-11 mr-2">
        <Image 
          src={chatbotIcon} 
          alt="챗봇 아이콘" 
          width={42} 
          height={41}
        />
      </div>

      <div className="px-2">
        <p className="text-[14px] font-medium text-black mb-[6px]">챗봇 루키</p>
        <RookieMessageTail messageList={["안녕하세요! 챗봇 루키 입니다.", "궁금하신 정보를 실시간 채팅으로 확인하실 수 있습니다."]}/>
      </div>
    </div>
  );
};

export default ChatbotStart;
