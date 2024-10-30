import React, { useState } from 'react';
import BackBar from "./BackBar"


const Page = () => {

    return (
        <div className="relative justify-center items-center w-full h-screen ">
            {/** 뒤로가기 바 */}
            <div className="w-full border-b border-grayscale-10 py-[15px]"
                 onClick={() => window.history.back()}>
                <BackBar />
            </div>
            
            {/** 상태 바 */}
            <div className="px-[16px]">
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

                    {/** 닉네임 입력 필드 */}
                    <p className="text-sm text-grayscale-50 font-medium border border-grayscale-10 rounded-[8px] p-[18px] mt-[20px]">
                        닉네임을 입력해주세요.
                    </p>
                </div>
            </div>

            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                <div className="flex justify-center items-center bg-main-50 border rounded-[8px] h-[48px]">
                    <p className="text-md text-white font-semibold ">
                        다음
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Page