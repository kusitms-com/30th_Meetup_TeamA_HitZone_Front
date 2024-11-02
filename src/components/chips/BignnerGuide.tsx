import React from "react";
import Image from "next/image";
import beginnerGuideIcon from "../../assets/svg/beginner_guide.svg";

interface BignnerGuideProps {
  onClick: () => void;
}

function BignnerGuide({ onClick }: BignnerGuideProps) {
  return (
    <button onClick={onClick} className="w-[125px] h-[30px]">
      <Image src={beginnerGuideIcon} alt="초보자 가이드 버튼" width={125} height={30} />
    </button>
  );
}

export default BignnerGuide;
