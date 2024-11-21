import React from "react";
import Header from "../../components/layout/MainHeader";
import NavBar from "../../components/layout/NavBar";
import Image from "next/image";
import serviceReadyImage from "../../assets/webp/service_ready.webp";
import { useRouter } from "next/router";

const MyPage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("https://forms.gle/qnPQnwfMYiDWrCW86"); // 설문조사 URL
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center mt-[-20px]">
        <div className="mb-4">
          <Image
            src={serviceReadyImage}
            alt="서비스 준비 이미지"
            width={338}
            height={192}
            objectFit="contain"
          />
        </div>
        <button
          onClick={handleButtonClick}
          className="px-2 py-[6px] bg-grayscale-5 text-xs font-medium rounded-lg focus:outline-none"
        >
          + 서비스 제안하기
        </button>
      </div>
      <NavBar />
    </div>
  );
};

export default MyPage;
