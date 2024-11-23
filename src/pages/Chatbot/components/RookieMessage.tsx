import React from "react";

interface Props {
    messageList: string[]
}

const ChatbotStart = ({messageList}: Props) => {
  return (
    <div className="bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 max-w-xs">
        {/** 메시지 1줄 이상 배열로 받아서 여러 p태그로 메시지 출력하기 */}
        {messageList.map((message, index) => (
            <p key={index}>{message}</p>
        ))}
    </div>
  );
};

export default ChatbotStart;
