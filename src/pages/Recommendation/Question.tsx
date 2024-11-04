import React, { useState } from "react";
import { useRouter } from "next/router";

import Image from 'next/image';
import logoIcon from '../../assets/svg/hitzone_logo.svg';

import HeaderBar from "./components/HeaderBar";
import HeaderBackBar from "./components/HeaderBackBar";
import Question1 from "./Question/Question1";
//import Question2 from "./Question/Question2";
//import Question3 from "./Question/Question3";


// zone 관리: KT or 잠실
// 부모로부터 인자로 받기
export interface ZoneProps {
    stadium: string;
}

export interface QuestionProps {
    previousStep: () => void;
    nextStep: () => void;
}

const Page = () => {
    
    // 선택한 좌석 관리
    const [selectedSeat, setSelectedSeat] = useState('');

    // 페이지 상태 관리
    const [step, setStep] = useState(1);
    const router = useRouter();

    const previousStep = () => {
        // 이전 step 페이지로 이동
        if (step > 1) setStep(step - 1);
        // 초기 step 페이지에선 이전 경로로 이동
        else window.history.back();
    };

    const nextStep = () => {
        // 다음 step 페이지로 이동
        if (step < 3) setStep(step + 1);
        // 질문 작성 완료 후 결과 페이지로 이동
        else router.push("/recommend/results");
    };

    const renderBar = () => {
        switch(step) {
            case 1:
                return <HeaderBar stadium={"잠실종합운동장"}/>
            default:
                return <HeaderBackBar stadium={"잠실종합운동장"}/>;
        }
    };

    const renderContents = () => {
        switch(step) {
            case 1:
                return <Question1 previousStep={previousStep} nextStep={nextStep} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>;
            /*
            case 2:
                return <Question2 previousStep={previousStep} nextStep={nextStep}/>;
            case 3:
                return <Question3 previousStep={previousStep} nextStep={nextStep} nickname={nickname}/>;
            */
            default:
                return null;
        }
    };
    
    return (
        <div className="flex justify-center items-start bg-main-10 w-full h-screen bg-fff">
            <div className="relative flex flex-col items-center w-full h-screen">
                
                {/** 헤더 */}
                {renderBar()}

                {/** 상태에 따라 다른 컴포넌트 렌더링 */}
                {renderContents()}

                {/** 버튼 
                 * 
      <button onClick={nextStep}>다음</button>
                */}

            </div>
        </div>
    )
}


export default Page