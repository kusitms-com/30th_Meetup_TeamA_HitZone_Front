import React from "react";
import KakaoShareButton from "@/src/components/button/KakaoShareButton";

interface ResultHeaderProps {
  resultId: number | null;
  nickname: string | undefined;
  hashTags: string[];
}

const ResultHeader: React.FC<ResultHeaderProps> = ({
  resultId,
  nickname,
  hashTags,
}) => {
  return (
    <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
      <div className="flex justify-center items-center w-full">
        <p className="text-lg text-grayscale-90 font-semibold text-center">
          야구장 유형 테스트 결과
        </p>
      </div>
      <KakaoShareButton
        resultId={resultId}
        nickname={nickname}
        hashTags={hashTags}
      />
    </div>
  );
};

export default ResultHeader;
