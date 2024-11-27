import React from "react";
import Image from "next/image";
import chatbotIcon from "@/src/assets/svg/chatbot_profile.svg"; // 얘는 webp보다 svg가 더 좋음

/** 꼬랑지가 붙은 버젼 */
const RookieProfile = () => {
  return (
    <div className="flex items-center justify-center bg-main-40 rounded-lg max-w-11 max-h-11">
        <Image 
          src={chatbotIcon} 
          alt="챗봇 아이콘" 
          width={52} 
          height={52}
        />
    </div>
  );
};

export default RookieProfile;
