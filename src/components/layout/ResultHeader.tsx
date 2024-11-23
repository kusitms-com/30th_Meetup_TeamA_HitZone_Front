import React from 'react';

// 카카오톡 공유 기능
import KakaoShareButton from "../../components/button/KakaoShareButton";

const ResultHeader = () => {
    return (
        <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
            <div className="flex justify-center items-center w-full">
                <p className="text-lg text-grayscale-90 font-semibold text-center ">
                    야구장 유형 테스트 결과
                </p>
            </div>
            <KakaoShareButton />
        </div>
    )
}


export default ResultHeader