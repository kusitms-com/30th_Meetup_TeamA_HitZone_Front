import React, { useState } from "react";
import Image from "next/image";
import { maxChatWidth } from "@/src/constants/ChatbotData";
import ImageModal from "@/src/components/dialogs/ImageModal";
import useImageModal from "@/src/hooks/useImageModal";

interface Props {
  imgUrl: string;
}

// 챗봇 커스텀 말풍선 컴포넌트
// 이미지를 출력하는 말풍선
const RookieImageMessage = ({imgUrl}: Props) => {
  // 이미지 모달 훅
  const { isModalOpen, selectedImage, openModal, closeModal } = useImageModal();  // 훅 사용


  return (
    <div className="mb-2">
        {/* 이미지 내용 */}
        <Image
            src={imgUrl}
            alt="Category Icon"
            className={`${maxChatWidth} h-auto rounded-md cursor-pointer`}
            onClick={() => openModal(imgUrl)}
        />

        {/* 이미지를 모달창으로 띄우기 */}
        {isModalOpen && <ImageModal imageSrc={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default RookieImageMessage;
