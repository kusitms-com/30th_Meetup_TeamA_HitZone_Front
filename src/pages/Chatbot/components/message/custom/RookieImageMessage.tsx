import React from "react";
import Image from "next/image";

interface Props {
  imgUrl: string;
}

// 챗봇 커스텀 말풍선 컴포넌트
// 이미지를 출력하는 말풍선
const RookieImageMessage = ({imgUrl}: Props) => {
  return (
    <div className="mb-2">
        {/* 이미지 내용 */}
        <Image
            src={imgUrl}
            alt="Category Icon"
            className="max-w-full h-auto rounded-md"
        />
    </div>
  );
};

export default RookieImageMessage;
