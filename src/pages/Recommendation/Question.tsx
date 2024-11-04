import React, { useState } from "react";
import { useRouter } from "next/router";

import Image from 'next/image';
import logoIcon from '../../assets/svg/hitzone_logo.svg';

import HeaderBar from "./components/HeaderBar";
import HeaderBackBar from "./components/HeaderBackBar";
import Question1 from "./Question/Question1";
import Question2 from "./Question/Question2";
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


// Seat 관리
export enum SeatType {
    NONE = '',
    SEAT1 = '1루석',
    SEAT3 = '3루석'
}

// keyword 관리
export enum Keyword {
    NONE = '',
    PARTNER1 = '나 혼자',
    PARTNER2 = '같은 팀 팬과',
    PARTNER3 = '다른 팀 팬과',
    WISH1 = '열정적인 응원',
    WISH2 = '경기장 한눈에 보기',
    WISH3 = '편리한 화장실 이용',
    WISH4 = '음식 먹기 편한',
    WISH5 = '빠른 퇴장 가능',
    WISH6 = '선수들 가까이',
    WISH7 = '삼겹살 구워먹기'
}

const Page = () => {
    /** 선택한 좌석 관리 */
    const [selectedSeat, setSelectedSeat] = useState(SeatType.NONE);

    /** 선택한 파트너 관리 */
    const [selectedParter, setSelectedParter] = useState(Keyword.NONE);
    const handleParterKeywordItem = (keyword: Keyword) => {
        setSelectedParter(keyword);
        handleKeywordItem(keyword);
    }

    /** 선택한 키워드 배열 관리 */
    const [selectedKeywordItems, setSelectedKeywordItems] = useState<Keyword[]>([]);
    const handleKeywordItem = (newKeywordItem: Keyword) => {
        // 선택한 값이 파트너 값이면 중복 불가
        // 기존 파트너 값은 배열에서 제거하고 넣기
        const keywordGroup = [Keyword.PARTNER1, Keyword.PARTNER2, Keyword.PARTNER3];
        if(keywordGroup.includes(newKeywordItem)) {
            setSelectedKeywordItems((prevKeywordItems) => {
                return [
                    // 기존 파트너 값을 제외한 배열 값
                    ...prevKeywordItems.filter((prevKeywordItem) => !keywordGroup.includes(prevKeywordItem)),
                    // 새로운 파트너 값
                    newKeywordItem
                ];
            });
            return;
        }
        
        // 그 외는 중복 가능
        // 배열에 그냥 넣기
        setSelectedKeywordItems((prevKeywordItems) => {
            // 기존 배열에 존재하는 아이템이면
            if (prevKeywordItems.includes(newKeywordItem)) {
                // 배열에서 제거
                return prevKeywordItems.filter((item) => item !== newKeywordItem);
            } else {
                // 배열에 없으면 추가
                return [...prevKeywordItems, newKeywordItem];
            }
        });
    };


    /** 페이지 상태 관리 */
    const [step, setStep] = useState(1);
    const router = useRouter();

    // 이전 버튼 이벤트
    const previousStep = () => {
        // 이전 step 페이지로 이동
        if (step > 1) setStep(step - 1);
        // 초기 step 페이지에선 이전 경로로 이동
        else window.history.back();
    };

    // 다음 버튼 이벤트
    const nextStep = () => {
        // step1 페이지
        if (step == 1) {
            // 좌석을 선택했으면 다음 step 페이지로 이동
            if(selectedSeat != SeatType.NONE){
                setStep(step + 1);

            // 좌석을 선택하지 않았으면
            }else{
                // 이동 막음
            }
        
        // step2 페이지
        }else if(step == 2){
            // 파트너를 선택했으면 다음 step 페이지로 이동
            if(selectedParter != Keyword.NONE){
                setStep(step + 1);

            // 파느너를 선택하지 않았으면
            }else{
                // 이동 막음
            }
        
        // step3 ~ step4 페이지
        }else if(step < 4) {
            // 다음 step 페이지로 이동
            setStep(step + 1);
            ''
        // 질문 작성 완료 후 결과 페이지로 이동
        }else {
            router.push("/recommend/results");
        }
    };


    /** 렌더링 */
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
            
            case 2:
                return <Question2 previousStep={previousStep} nextStep={nextStep} selectedParter={selectedParter} handleParterKeywordItem={handleParterKeywordItem}/>;
            /*
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