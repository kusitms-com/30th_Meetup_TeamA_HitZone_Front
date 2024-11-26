import React from "react";

interface Props {
    messageList: string[]
}

// 챗봇 말풍선 컴포넌트 타입3. /n(new line) 등이 반영되도록 <pre> 태그로 감싼 말풍선
const RookieMessage = ({messageList}: Props) => {
  return (
    <div className="bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 max-w-xs">
        {/** 메시지 1줄 이상 배열로 받아서 여러 p태그로 메시지 출력하기 */}
        {messageList.map((message, index) => (
          <pre>
            <p key={index}>{message}</p>
          </pre>
        ))}
    </div>
  );
};

export default RookieMessage;
