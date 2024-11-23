import React from "react";

// 카카오톡 공유 기능
import KakaoShareButton from "../../components/button/KakaoShareButton";

// Props 타입 정의
interface ResultHeaderProps {
    resultId: number | null; // 결과 페이지로 연결하기 위한 resultId
    nickname: string | undefined; // 유형 닉네임
    hashTags?: string[]; // 해시태그 리스트
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ resultId, nickname, hashTags }) => {
  return (
    <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-lg text-grayscale-90 font-semibold text-center">
          야구장 유형 테스트 결과
        </p>
      </div>
      <KakaoShareButton resultId={resultId} nickname={nickname} hashTags={hashTags} />
    </div>
  );
};

export default ResultHeader;
