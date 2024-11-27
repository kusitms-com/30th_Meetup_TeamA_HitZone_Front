import React from "react";
import Image from "next/image";
import tailIcon from "@/src/assets/webp/chatbot_message_left_tail_white_big.webp";  // 꼬랑지

interface Props {
    messageList: string[]
}

// 챗봇 커스텀 말풍선 컴포넌트
// /n(new line) 등이 반영되도록 whitespace-pre-wrap 스타일 적용한 말풍선
const RookiePreformattedMessage = ({messageList}: Props) => {
  return (
    <div className="whitespace-pre-wrap bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 max-w-xs">
        {/* 말풍선 꼬랑지 */}
        <Image src={tailIcon} alt="꼬랑지" className="absolute left-[-12px] top-2 w-5 h-5"/>
        
        {/** 메시지 1줄 이상 배열로 받아서 여러 p태그로 메시지 출력하기 */}
        {messageList.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
    </div>
  );
};

export default RookiePreformattedMessage;
