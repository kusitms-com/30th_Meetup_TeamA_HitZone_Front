import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import chatbotIcon from "../../assets/svg/chatbot_button.svg";

const FloatingChatbotButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/chatbot"); 
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-[78px] right-4 md:right-[calc(50%-250px)] flex items-center justify-center transition ease-in-out"
      aria-label="히트존 챗봇"
    >
      <Image src={chatbotIcon} alt="히트존 챗봇" width={48} height={48} />
    </button>
  );
};

export default FloatingChatbotButton;
