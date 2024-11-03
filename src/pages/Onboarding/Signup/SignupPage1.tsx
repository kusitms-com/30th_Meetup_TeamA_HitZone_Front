import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackBar from "../components/BackBar"

import Image from 'next/image';
import checkButtonGreenIcon from '../../../assets/webp/check_button_green.webp';


const Page = () => {
    // 닉네임 상태 관리
    const [nickname, setNickname] = useState('');

    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        
        // 최대 20글자
        if (input.length <= 20) {
            setNickname(input);
        }
    };

    return (
        <div className="relative justify-center items-center w-full h-screen ">
            {/** 뒤로가기 바 */}
            <div className="w-full border-b border-grayscale-10 py-[15px]"
                 onClick={() => window.history.back()}>
                <BackBar />
            </div>
            
            {/** 컨텐츠 */}
            <div className="px-[16px]">
                {/** 상태 바 */}
                <div className="py-[24px]">
                    <div className="flex items-center justify-start bg-grayscale-5 rounded-r-full overflow-hidden w-full h-[7px] ">
                        <div className="bg-main-40 h-full w-1/2 rounded-full"></div>
                    </div>
                </div>

                {/** 회원가입 폼 */}
                <div>
                    <p className="text-xl text-grayscale-90 font-bold">
                        회원가입
                    </p>
                    <p className="text-sm text-grayscale-60 font-medium mt-[2px]">
                        회원가입을 위해 닉네임을 입력해주세요.
                    </p>

                    {/** 닉네임 입력 필드 
                    <p className="text-sm text-grayscale-50 font-medium border border-grayscale-10 rounded-[8px] p-[18px] mt-[20px]">
                        닉네임을 입력해주세요.
                    </p>
                    */}
                    <div className="relative">
                        <input
                        type="text"
                        value={nickname}
                        onChange={handleNickNameChange}
                        placeholder="닉네임을 입력해주세요."
                        className={`text-sm font-medium border rounded-[8px] p-[18px] mt-[20px] w-full outline-none
                            ${nickname.length === 0 ? 'text-grayscale-50' : 'text-grayscale-90'} 
                            ${nickname.length > 0 && nickname.length <= 20 ? 'border-success-50 focus:border-success-50' : 'border-grayscale-10 focus:border-grayscale-30'} 
                            `}
                        />

                        {/** 글자수가 1글자 이상일 때 이미지 표시 */}
                        {nickname.length > 0 && (
                            <div className="absolute right-4 top-[50px] transform -translate-y-1/2 w-5 h-5">
                                <Image src={checkButtonGreenIcon} alt="확인 완료 버튼" width={20} height={20} />
                            </div>
                        )}
                    </div>
                </div>

                {/** 글자수 제한 */}
                {/** 글자수가 0개일 때 */}
                {nickname.length == 0 ? (
                    <div className="flex justify-end items-center py-[7px]">
                        <p className="text-xs text-grayscale-50 font-medium ">
                            ({nickname.length}/20)
                        </p>
                    </div>
                ) : (
                    <div className="flex justify-between items-center py-[7px]">
                        <p className="text-xs text-success-50 font-medium ">
                            닉네임이 성공적으로 설정됐어요.
                        </p>
                        <p className="text-xs text-grayscale-50 font-medium ">
                            ({nickname.length}/20)
                        </p>
                    </div>
                )}
            </div>

            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                <div className="flex justify-center items-center bg-main-50 border rounded-[8px] h-[48px]  mb-[50px]">
                    <p className="text-md text-white font-semibold ">
                        다음
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Page