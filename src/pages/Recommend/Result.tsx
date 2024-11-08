import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import HeaderBar from "./Result/HeaderBar";

import Image from 'next/image';
import crownGoldIcon from '../../assets/webp/recommend_crown_gold.webp';
import crownSilverIcon from '../../assets/webp/recommend_crown_silver.webp';
import crownBronzeIcon from '../../assets/webp/recommend_crown_bronze.webp';
import tipPinkIcon from '../../assets/webp/recommend_tip_pink.webp';

// Enum으로 추천 구역 Data 관리
import { StadiumType} from "../../constants/ZoneData"

// 백엔드로부터 받은 추천 지역 관리
import { ZoneGetResponseType } from "../../api/ResultApiType";

import { handleSave, handleAllPrint } from "../../api/ResultApiHandler";
// zone 관리: KT or 잠실
// 부모로부터 인자로 받기
export interface Props {
    stadium: StadiumType;
    resultId: number | null;
    recommendedZoneList: ZoneGetResponseType[];
    setRecommendedZoneList: Dispatch<SetStateAction<ZoneGetResponseType[]>>;
}

const Page = ({stadium, resultId, recommendedZoneList, setRecommendedZoneList}: Props) => {
    
    const router = useRouter();
    useEffect(() => {
        // 쿼리 파라미터에서 추천 존 리스트를 가져오기
        if (router.query.recommendedZoneList) {
        const parsedZoneList = JSON.parse(router.query.recommendedZoneList as string);
        setRecommendedZoneList(parsedZoneList);
        }
    }, [router.query]); // 쿼리 파라미터가 변경될 때마다 실행

    
    return (
        <div className="flex justify-center items-start bg-main-0 w-full h-screen bg-fff">
            <div className="relative flex flex-col items-center w-full h-screen ">
            
            <ul>
                {recommendedZoneList !== null ? (
                    recommendedZoneList.map((zone, index) => (
                        <li key={index}>
                            {zone.name} {/* Assuming each item in the list has a 'name' property */}
                        </li>
                    ))
                ) : (
                    <li>No recommended zones available.</li>
                )}
            </ul>
                <div>
                </div>
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