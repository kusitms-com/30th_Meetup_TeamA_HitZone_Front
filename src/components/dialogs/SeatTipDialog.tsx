
import Image from 'next/image';

import recommendTipGrayIcon from '../../assets/webp/recommend_tip_gray.webp';
import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';

enum JamsilSeatType {
    NAVY,
    PREMIUM,
    TABLE,
    GREEN,
    RED,
    BLUE,
    ORANGE,
    EXCITING
}

const Dialog = () => {
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
                <Image src={closeButtonGrayIcon} alt="닫기 버튼" className="w-[24px] h-[24px]" />

            </div>

            {/** 좌석 */}
            <div className="flex flex-col justify-start px-[20px]">
                <p className="text-lg text-jamsil-red font-bold">
                    레드석
                </p>

                <p className="text-sm text-grayscale-80 font-medium">
                    해당 구역은 다양한 것들을 모두 적절히 즐길 수 있는 구역이예요.
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
                    <p className="text-sm text-grayscale-90 font-bold">
                        시야가 중요하신 분
                    </p>
                    <p className="text-sm text-grayscale-90 font-regular">
                        외야와 가까운 쪽의 레드석은 예매 시 시야 확인이 필요해요. 기둥이나 그물망이 앞에 있어 시야 방해를 받을 수 있어요!
                    </p>

                    <p className="text-sm text-grayscale-90 font-bold mt-[12px]">
                        시끄러운 것을 좋아하지 않는 분
                    </p>
                    <p className="text-sm text-grayscale-90 font-regular">
                        오렌지석 앞에 있는 레드석은 스피커 때문에 많이 시끄러워요. 조용한 관람을 원하시면 다른 구역을 추천해요!
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Dialog