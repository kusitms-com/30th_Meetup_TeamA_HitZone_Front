import React, { useState } from "react";
import { useRouter } from "next/router";

import HeaderBar from "../../components/layout/ResultHeader";
import Question1 from "./Question/Question1";
import Question2 from "./Question/Question2";
import Question3 from "./Question/Question3";
import Question4 from "./Question/Question4";

import Image from 'next/image';
import crownGoldIcon from '../../assets/webp/recommend_crown_gold.webp';
import crownSilverIcon from '../../assets/webp/recommend_crown_silver.webp';
import crownBronzeIcon from '../../assets/webp/recommend_crown_bronze.webp';
import tipPinkIcon from '../../assets/webp/recommend_tip_pink.webp';

import SeatTipDialog from "../../components/dialogs/SeatTipDialog"

import ChooseBaseballTeamDialog from "../../components/dialogs/ChooseBaseballTeamDialog"


// zone 관리: KT or 잠실
// 부모로부터 인자로 받기
export interface ZoneProps {
    stadium: ZoneType;
}
export enum ZoneType {
    NONE = '',
    JAMSIL = '잠실종합운동장',
    KT = '수원KT위즈파크'
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
    WISH7 = '삼겹살 구워먹기',
    NOWISH1 = '햇빛 싫어요',
    NOWISH2 = '큰 소리 싫어요',
    NOWISH3 = '높은 곳 싫어요',
    NOWISH4 = '비 맞기 싫어요'
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
        const keywordPartnerGroup = [Keyword.PARTNER1, Keyword.PARTNER2, Keyword.PARTNER3];
        if(keywordPartnerGroup.includes(newKeywordItem)) {
            setSelectedKeywordItems((prevKeywordItems) => {
                return [
                    // 기존 파트너 값을 제외한 배열 값
                    ...prevKeywordItems.filter((prevKeywordItem) => !keywordPartnerGroup.includes(prevKeywordItem)),
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


    /** 선택한 위시 관리 */
    const keywordWishGroup = [Keyword.WISH1, Keyword.WISH2, Keyword.WISH3,
        Keyword.WISH4, Keyword.WISH5, Keyword.WISH6, Keyword.WISH7
    ];
    // 배열에 wish 값이 하나 이상 포함되어 있는 지 확인하는 함수
    const hasWish = selectedKeywordItems.some((v) => keywordWishGroup.includes(v));


    /** 선택한 노위시 관리 */
    const keywordNowishGroup = [Keyword.NOWISH1, Keyword.NOWISH2, Keyword.NOWISH3, Keyword.NOWISH4];
    // 배열에 nowish 값이 하나 이상 포함되어 있는 지 확인하는 함수
    const hasNowish = selectedKeywordItems.some((v) => keywordNowishGroup.includes(v));



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
        
        // step3 페이지
        }else if(step < 4) {
            // 값을 선택했으면
            if(hasWish) {
                // 다음 step 페이지로 이동
                setStep(step + 1);
            }
        // step4 페이지
        }else {
            // 값을 선택했으면
            if(hasNowish) {
                // 질문 작성 완료 후 결과 페이지로 이동
                router.push("/recommend/results");
            }
        }
    };

    // 닫기 버튼 이벤트
    const close = () => {
        // main 홈으로 이동
        router.push("/");
    }


    /** 렌더링 */
    const renderContents = () => {
        switch(step) {
            case 1:
                return <Question1 previousStep={previousStep} nextStep={nextStep} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>;
            
            case 2:
                return <Question2 previousStep={previousStep} nextStep={nextStep} selectedParter={selectedParter} handleParterKeywordItem={handleParterKeywordItem}/>;
            
            case 3:
                return <Question3 previousStep={previousStep} nextStep={nextStep} selectedZone={ZoneType.KT} selectedKeywordItems={selectedKeywordItems} handleKeywordItem={handleKeywordItem} hasWish={hasWish}/>;
            
            case 4:
                return <Question4 previousStep={previousStep} nextStep={nextStep} selectedKeywordItems={selectedKeywordItems} handleKeywordItem={handleKeywordItem} hasNowish={hasNowish}/>;
            
            default:
                return null;
        }
    };
    
    return (
        <div className="flex justify-center items-start bg-main-0 w-full h-screen bg-fff">
            <div className="relative flex flex-col items-center w-full h-screen ">

                {/** 임시 확인
                <ChooseBaseballTeamDialog/>
                <SeatTipDialog/> */}

                {/** 헤더 */}
                <HeaderBar />

                {/** 야구장 유형 */}
                <div className="flex justify-start w-full mt-[20px] px-[16px]">
                    <div className="bg-main-50 border border-[0px] rounded-[8px] w-[102px] h-[102px]" />
                    <div className="ml-[16px]">
                        <p className="text-lg text-grayscale-90 font-semibold">
                            나의 야구장 유형은
                        </p>
                        <p className="text-3xl text-main-50 font-black relative top-[-5px]">
                            이러다 공까지 먹어버러
                        </p>
                        <div className="relative bg-main-5 text-sm text-main-90 font-medium px-[14px] py-[8px] mt-[2px] rounded-lg max-w-xs text-center">
                            야구가 참 맛있고 음식이 재밌어요
                            <div className="absolute top-2 left-[-12px] w-0 h-0 border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-main-5"></div>
                        </div>
                    </div>
                </div>


                {/** 야구장 태그 */}
                <div className="w-full px-[16px]">
                    {/** 회색 상자 */}
                    <div className="bg-grayscale-5 border border-[0px] rounded-[8px] w-full h-[116px] p-[16px] mt-[15px]">
                        {/** 해시 태그 */}
                        <div className="flex justify-center items-center gap-[12px]">
                            <div className="bg-main-0 border border-[0px] rounded-[8px] px-[10px] py-[6px]">
                                <p className="text-xs text-grayscale-90 font-medium">
                                    #먹으러왔는데야구도한다?
                                </p>
                            </div>
                            <div className="bg-main-0 border border-[0px] rounded-[8px] px-[10px] py-[6px]">
                                <p className="text-xs text-grayscale-90 font-medium">
                                    #그래서여기구장맛있는거뭐라고?
                                </p>
                            </div>
                        </div>

                        {/** 문구 */}
                        <div className="flex justify-center items-center text-center mt-[12px]">
                            <p className="text-xs text-grayscale-90 font-medium">
                                야구장에서 먹는 재미까지 놓치지 않는 당신! <br/>
                                야구장을 두 배로 재밌게 즐기는군요?
                            </p>
                        </div>
                    </div>
                </div>


                {/** 추천 구역 */}
                <div className="w-full px-[16px]">
                    {/** 타이틀 */}
                    <p className="text-md text-grayscale-90 font-bold mt-[12px]">
                        나의 추천 구역
                    </p>

                    {/** 추천 구역 블록 1 */}
                    <div className="bg-grayscale-5 border border-[0px] rounded-[4px] h-[104px] mt-[12px] p-[12px]">
                        <Image src={crownGoldIcon} alt="골드 왕관 이미지" className="w-[17px] h-[9px]"/>
                        <div className="flex w-full justify-start items-center">
                            <p className="text-md text-grayscale-90 font-semibold mr-[8px]">
                                1 레드석
                            </p>
                            <Image src={tipPinkIcon} alt="핑크색 팁 이미지" className="w-[12px] h-[12px]"/>
                        </div>
                        <div className="bg-main-0 border border-[0px] rounded-[4px] mt-[4px]">
                            <p className="text-xs text-grayscale-90 font-regular px-[8px] py-[5px]">
                                응원도 적당히 즐길 수 있지만, 야구나 함께 온 동행자와의 대화에도<br/>
                                집중할 수 있는 구역
                            </p>
                        </div>
                    </div>

                    {/** 추천 구역 블록 2 */}
                    <div className="bg-grayscale-5 border border-[0px] rounded-[4px] h-[104px] mt-[12px] p-[12px]">
                        <Image src={crownSilverIcon} alt="골드 왕관 이미지" className="w-[17px] h-[9px]"/>
                        <div className="flex w-full justify-start items-center">
                            <p className="text-md text-grayscale-90 font-semibold mr-[8px]">
                                2 블루석
                            </p>
                            <Image src={tipPinkIcon} alt="핑크색 팁 이미지" className="w-[12px] h-[12px]"/>
                        </div>
                        <div className="bg-main-0 border border-[0px] rounded-[4px] mt-[4px]">
                            <p className="text-xs text-grayscale-90 font-regular px-[8px] py-[5px]">
                                언제는 옆 오렌지석과 힘차게 응원하고, 언제는 야구에 집중하며 둘 다<br/>\
                                즐길 수 있는 구역이에요!
                            </p>
                        </div>
                    </div>


                    {/** 추천 구역 블록 3 */}
                    <div className="bg-grayscale-5 border border-[0px] rounded-[4px] mt-[12px] p-[12px]">
                        <Image src={crownBronzeIcon} alt="골드 왕관 이미지" className="w-[17px] h-[9px]"/>
                        <div className="flex w-full justify-start items-center">
                            <p className="text-md text-grayscale-90 font-semibold mr-[8px]">
                                3 네이비석
                            </p>
                            <Image src={tipPinkIcon} alt="핑크색 팁 이미지" className="w-[12px] h-[12px]"/>
                        </div>
                        <div className="bg-main-0 border border-[0px] rounded-[4px] mt-[4px]">
                            <p className="text-xs text-grayscale-90 font-regular px-[8px] py-[5px]">
                                높은 곳에서 야구를 전체적으로 볼 수 있는 구역이에요!
                            </p>
                        </div>
                    </div>
                </div>


                {/** 상태에 따라 다른 컴포넌트 렌더링 
                {renderContents()}
                */}

                <div className="relative flex justify-center items-center text-center border border-0 rounded-[8px] h-[48px] mb-[40px] w-full gap-[8px] z-10 mt-[20px] px-[16px]">
                    <div className="bg-main-10 border border-0 rounded-[8px] ">
                        <p className="text-md text-main-70 font-semibold min-w-[120px] px-[8px] py-[12px]">
                            추천 다시 받기
                        </p>
                    </div>
                    <div className="bg-main-50 border border-0 rounded-[8px] w-full">
                        <p className="text-md text-main-0 font-semibold px-[8px] py-[12px]">
                            예매하러 가기
                        </p>
                    </div>
                </div>
                {/** 다음 버튼, 맨 아래에 배치 */}
                <div>

                </div>
            </div>
        </div>
    )
}


export default Page