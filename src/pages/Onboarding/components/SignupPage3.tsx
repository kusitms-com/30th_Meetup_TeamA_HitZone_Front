import React, { useState } from 'react';
import BackLogoBar from "./BackLogoBar"

import Image from 'next/image';
import signupConfettiIcon from '../../../assets/svg/signup_confetti.svg';
import signupRookieIcon from '../../../assets/svg/signup_rookie.svg';
import signupZonePinkIcon from '../../../assets/svg/signup_zone_pink.svg';

interface Props {
    userName: string;
}

const Page = ({userName}: Props) => {
    return (
        <div className="relative justify-center items-center w-full h-screen ">
            {/** 뒤로가기 바 */}
            <div className="w-full border-b border-grayscale-10 py-[15px]"
                 onClick={() => window.history.back()}>
                <BackLogoBar />
            </div>
            
            {/** 배경 이미지, 맨 뒤에, 중앙에 배치 */}
            <Image src={signupConfettiIcon} alt="배경 이미지" className="absolute left-1/2 -translate-x-1/2 justify-center z-[-1]" />

            {/** 컨텐츠 */}
            <div className="px-[18px] mt-[88px]">
                {/** 알람 설정 폼 */}
                <div>
                    <p className="text-xl text-grayscale-90 font-bold">
                        환영해요!
                    </p>
                    <p className="text-lg text-grayscale-90 font-semibold mt-[2px]">
                        {userName}님의 즐거운 야구 관람을 도와주는<br/>HitZone입니다
                    </p>
                </div>
            </div>
            
                <Image 
                    src={signupZonePinkIcon} 
                    alt="핑크 야구장" 
                    className="absolute bottom-0 left-0 w-full z-[-1]" 
                />


            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                {/** 상대 위치로 루키 이미지를 시작하기 버튼으로부터 220px 위에 배치 */}
                <div className="relative">
                    <Image 
                        src={signupRookieIcon} 
                        alt="루키" 
                        className="absolute bottom-[220px] left-1/2 transform -translate-x-1/2"
                    />
                    <div className="flex justify-center items-center bg-main-50 border rounded-[8px] h-[48px] mb-[50px]">
                        <p className="text-md text-white font-semibold ">
                            Hitzone 시작하기
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Page