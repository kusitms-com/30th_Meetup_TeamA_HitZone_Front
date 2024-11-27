import React, { useState } from "react";

const ImgUrlModal = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-4 rounded-lg">
          {/* imageUrl이 외부 url(https://) 이면 Image 컴포넌트로 띄우면 오류가 발생해서 img tag로 출력 */}
          <img 
            src={imageUrl} 
            alt="Enlarged" 
            className="max-w-full max-h-full" />
          <button 
            onClick={onClose} 
            className="absolute top-0 right-0 w-5 h-5 text-xl mr-3 text-grayscale-50 p-2 rounded-full">
            X
          </button>
        </div>
      </div>
    );
  };
  
  export default ImgUrlModal;