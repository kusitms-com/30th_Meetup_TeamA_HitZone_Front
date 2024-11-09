
import React from "react";
import Image from 'next/image';

import recommendTipGrayIcon from '../../assets/webp/recommend_tip_gray.webp';
import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';

import { GuideDetail } from "@/src/api/StadiumApiType";


const Dialog = ({zoneName, zoneColor, tip, referencesGroup}: GuideDetail,
                { onClose }: { onClose: () => void }) => {
    
    return (
        <div className="flex flex-col border border-0 rounded-[12px] w-[324px] h-[426px]">
            {/** 헤더 */}
            <div className="flex justify-between w-full p-[20px]">
                <div className="flex justify-start items-center w-full">
                    <Image src={recommendTipGrayIcon} alt="그레이 팁 버튼" className="w-[24px] h-[24px]" />
                    <p className="text-lg text-grayscale-90 font-bold">
                        TIP
                    </p>
                </div>
                <Image src={closeButtonGrayIcon} alt="닫기 버튼" className="w-[24px] h-[24px]" onClick={onClose}/>

            </div>

            {/** 좌석 */}
            <div className="flex flex-col justify-start px-[20px]">
                <p className="text-lg text-jamsil-red font-bold" style={{ color: zoneColor }}>
                    {zoneName}
                </p>

                <p className="text-sm text-grayscale-80 font-medium">
                    {tip}
                </p>

                {/** 구분선 */}
                <div className="flex justify-between w-full border-b border-grayscale-10 mt-[12px] mb-[12px]"/>
                
                <p className="text-lg text-jamsil-red font-bold">
                    ❗️참고하세요❗️
                </p>
            </div>

            <div className="px-[20px] mt-[8px] mb-[8px]">
                {/** 회색 상자 */}
                <div className="bg-grayscale-5 border border-0 rounded-[8px] w-full p-[12px]">
                    {referencesGroup ? (
                        <>
                            {referencesGroup.references.map((reference, referenceIndex) => (
                                <div key={referenceIndex}>
                                    <p className="text-sm text-grayscale-90 font-bold">
                                        {reference.title}
                                    </p>
                                    <p className="text-sm text-grayscale-90 font-regular mb-[12px]">
                                        {reference.content}
                                    </p>
                                </div>
                            ))}
                        </>
                    ): null }
                </div>
            </div>
        </div>
    )
}


export default Dialog