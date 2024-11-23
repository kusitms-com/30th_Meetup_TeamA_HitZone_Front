import React from "react";

import RookieProfile from "./RookieProfile";
import RookieMessageWithTail from "./RookieMessageWithTail";

const ChatbotStart = () => {
  return (
    <div className="flex items-start mb-2 transition-opacity duration-1000">
      <RookieProfile/>

      <div className="px-2">
        <p className="text-[14px] font-medium text-black mb-[6px]">챗봇 루키</p>
        <RookieMessageWithTail messageList={["안녕하세요! 챗봇 루키 입니다.", "궁금하신 정보를 실시간 채팅으로 확인하실 수 있습니다."]}/>
      </div>
    </div>
  );
};

export default ChatbotStart;
