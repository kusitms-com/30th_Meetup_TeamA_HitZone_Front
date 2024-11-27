import Image from "next/image";
import chatbotLoadingAnimation from "@/src/assets/gif/chatbot_loading_baseball_pink.gif";

const ChatbotClovaLoading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin">
            <Image src={chatbotLoadingAnimation} alt="Loading" className="w-24 h-24" />
        </div>
    </div>
  );
};

export default ChatbotClovaLoading;
