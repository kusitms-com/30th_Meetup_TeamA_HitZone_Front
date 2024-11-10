import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import HeaderBar from "../../components/layout/ResultHeader";
import NavBar from "../../components/layout/NavBar";

import Image from 'next/image';
import crownGoldIcon from '../../assets/webp/recommend_crown_gold.webp';
import crownSilverIcon from '../../assets/webp/recommend_crown_silver.webp';
import crownBronzeIcon from '../../assets/webp/recommend_crown_bronze.webp';
import tipPinkIcon from '../../assets/webp/recommend_tip_pink.webp';

// Enum으로 추천 구역 Data 관리
import { StadiumType} from "../../constants/ZoneData"

// 백엔드로부터 받은 추천 지역 관리
import { ZoneGetResponseType } from "../../api/ResultApiType";

// 프로필 API 관련
import { handleProfile, handlePrint } from "../../api/ResultApiHandler";
import { ProfileGetResponseType } from "../../api/ResultApiType";

// TIP 모달창 관련
import useModal from '@/src/hooks/useModal';
import SeatTipDialog from "@/src/components/dialogs/SeatTipDialog";

// zone 관리: KT or 잠실
// 부모로부터 인자로 받기
export interface Props {
    stadium: StadiumType;
    resultId: number | null;
    recommendedZoneList: ZoneGetResponseType[];
    setResultId: Dispatch<SetStateAction<number | null>>;
    setRecommendedZoneList: Dispatch<SetStateAction<ZoneGetResponseType[]>>;
}

const Page = ({stadium, resultId, recommendedZoneList, setResultId, setRecommendedZoneList}: Props) => {
    // Question 페이지와 상태 동기화
    const router = useRouter();
    const [profileData, setProfileData] = useState<ProfileGetResponseType>();
    useEffect(() => {
        // 확인
        /*
        console.log("머임:")
        console.log(stadium);
        console.log(resultId);
        console.log(recommendedZoneList);
        */

        // 쿼리 파라미터에서 추천 존 리스트를 가져오기
        if (router.query.resultId) {
            const resultId = JSON.parse(router.query.resultId as string);
            console.log("추천 구역 결과 페이지로 리다이렉트 했슴다: ")
            console.log(resultId);
            setResultId(resultId);
        }

    }, [router.query]); // 쿼리 파라미터가 변경될 때마다 실행

    useEffect(() => {
        handleResultData();
    }, [resultId]);
    
    const handleResultData = async () => {

        // handlePrint (handleGetZoneList) 호출
        // 전체 추천 개수 가져오기
        const parsedZoneList = await handlePrint(3, resultId);

        if (parsedZoneList) {  // undefined가 아니면 처리
            setRecommendedZoneList(parsedZoneList);
        } 

        // handleProfile 호출!!!!!!!
        const parsedProfileData = await handleProfile(resultId);
        
        // 확인
        /*
        console.log(resultId);
        console.log(parsedZoneList);
        console.log(parsedProfileData);
        */
        
        if (parsedProfileData) {  // undefined가 아니면 처리
            setProfileData(parsedProfileData);
        }
    }

    /*
    const handleGetZoneList = async () => {
        // 추천 질문 데이터 전송 후 ResultId 받는 이벤트 호출
        // handleGetResultId를 호출하고 결과를 기다린 후, resultId를 사용
        const resultId = await handleGetResultId();
        console.log("🐻‍❄️ 선택한 스타디움에 대한 추천 좌석 받았댱2: ");
        console.log(zoneList);

        // 백엔드에 데이터 전송 후 반환 값(최대 3개) 가져오기 (API 통신)
        const zoneList: ZoneGetResponseType[] = (await handlePrint(3, resultId)) ?? [];

        // 확인
        console.log("🐻‍❄️ 선택한 스타디움에 대한 추천 좌석 받았댱: ");
        console.log(zoneList);

        // 데이터 업뎃 (비동기적으로 작동)
        setRecommendedZoneList(zoneList);

        return zoneList; // 다음 작업을 위해 zoneList 반환
    }
    */

    // index마다 다른 왕관 이미지 띄우기
    const crownIcons = [
        crownGoldIcon,
        crownSilverIcon,
        crownBronzeIcon
    ];


    // 추천 다시 받기 버튼 클릭 시 리다이렉트 이벤트
    const handleRedirectToRecommendation = () => {
        // 추천 다시 받기 페이지로 리다이렉트
        router.push('/recommend/question');  // '/recommend'는 추천 페이지의 URL입니다. 수정할 수 있습니다.
    };

    // 예매하러 가기 버튼 클릭 시 모달창 띄우기 이벤트
    const handleBooking = () => {
        // 예매 페이지로 리다이렉트
        //router.push('/booking');  // '/booking'은 예매 페이지의 URL입니다. 수정할 수 있습니다.
    };


    // 모달창 이벤트
    const { isOpen, openModal, closeModal } = useModal();


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
                    {/** 프로필 이미지 */}
                    <div className="w-[102px] h-[102px] relative">
                        {/** Profile API 연동 데이터 : 더미 데이터(그냥 동그라미) */}
                        {profileData ? (
                            <Image src={profileData.imgUrl} alt="프로필 이미지" layout="fill" objectFit="cover" />
                        ) : 
                        <div className="bg-main-5 border border-[0px] rounded-full w-full h-full" />
                        }
                    </div>

                    {/** Profile API 연동 데이터 */}
                    <div className="flex-grow ml-[16px]">
                        <p className="text-lg text-grayscale-90 font-semibold">
                            나의 야구장 유형은
                        </p>
                        <p className="text-3xl text-main-50 font-black relative top-[-5px]">
                            {profileData?.nickname}
                        </p>
                        <div className="relative text-start bg-main-5 text-sm text-main-90 font-medium px-[14px] py-[8px] mt-[2px] rounded-lg w-full text-center">
                            <div className="flex gap-[6px] mb-[6px]">
                                {/** 해시 태그 */}
                                {profileData?.hashTags !== null ? (profileData?.hashTags.map((hashTag, index) => (
                                    <p className="text-xs px-[6px] py-[2px] text-grayscale-90 font-medium bg-main-0 border border-0 rounded-md">
                                        {hashTag}
                                    </p>
                                ))
                                ) : (
                                    <>
                                    </>
                                )}
                            </div>
                            {profileData?.type}
                            <div className="absolute top-2 left-[-12px] w-0 h-0 border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-main-5"/>

                            {/** 문구
                            <p>
                                {profileData?.explanation}
                            </p>
                            */}
                        </div>
                    </div>
                </div>


                {/** 추천 구역 */}
                <div className="w-full px-[16px] mt-[32px]">
                    {/** 타이틀 */}
                    <p className="text-md text-grayscale-90 font-bold ">
                        나의 추천 구역
                    </p>
                    
                    {/** Zones API 연동 데이터 : 더미데이터 */}
                    {recommendedZoneList !== null ? (
                        recommendedZoneList.map((zone, index) => {
                            // 인덱스에 맞는 이미지 선택
                            const selectedCrownIcon = crownIcons[index % crownIcons.length];  // index가 배열 길이를 넘어갈 경우 반복
                    
                            return (
                                <div key={index} className="bg-grayscale-5 border border-[0px] rounded-[4px] h-[104px] mt-[12px] p-[12px]">
                                    <Image src={selectedCrownIcon} alt="왕관 이미지" className="w-[17px] h-[9px]"/>
                                    <div className="flex w-full justify-start items-center">
                                        <p className="text-md text-grayscale-90 font-semibold mr-[8px]">
                                            {index+1} {zone.name}
                                        </p>
                                        <Image src={tipPinkIcon} alt="핑크색 팁 이미지" className="w-[12px] h-[12px]" onClick={openModal}/>
                                        {isOpen && zone.referencesGroup && zone.referencesGroup.length > 0 && (
                                            <SeatTipDialog
                                                zoneName={zone.name}
                                                zoneColor={zone.color}
                                                tip={zone.tip}
                                                referencesGroup={zone.referencesGroup[0]} // 첫 번째 referencesGroup만 전달
                                                onClose={closeModal} // 모달 닫기 함수
                                            />
                                        )}
                                    </div>
                                    <div className="bg-main-0 border border-[0px] rounded-[4px] mt-[4px]">
                                        <p className="text-xs text-grayscale-90 font-regular px-[8px] py-[5px]">
                                            {zone.explanations}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="bg-grayscale-5 border border-[0px] rounded-[4px] h-[104px] mt-[12px] p-[12px]">
                            추천 구역이 없습니다!
                        </div>
                    )}
                </div>


                {/** 상태에 따라 다른 컴포넌트 렌더링 
                {renderContents()}
                */}

                {/** 다음 버튼, 맨 아래에 배치 */}
                <div className="relative flex justify-center items-center text-center border border-0 rounded-[8px] h-[48px] mb-[40px] w-full gap-[8px] z-10 mt-[20px] px-[16px]">
                    <div className="bg-main-10 border border-0 rounded-[8px] cursor-pointer" onClick={handleRedirectToRecommendation}>
                        <p className="text-md text-main-70 font-semibold min-w-[135px] px-[8px] py-[12px]">
                            추천 다시 받기
                        </p>
                    </div>
                    <div className="bg-main-50 border border-0 rounded-[8px] w-full cursor-pointer" onClick={handleBooking}>
                        <p className="text-md text-main-0 font-semibold px-[8px] py-[12px]">
                            예매하러 가기
                        </p>
                    </div>
                </div>

              <NavBar />
            </div>
        </div>
    )
}


export default Page