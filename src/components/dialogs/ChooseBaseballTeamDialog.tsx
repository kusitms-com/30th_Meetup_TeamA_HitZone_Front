
import Image from 'next/image';

import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';


interface Props {
    onClose: () => void;
}

const Dialog = ({onClose}: Props) => {
    return (
        <div className="flex flex-col border border-0 rounded-[12px] w-[324px]">
            {/** 헤더 */}
            <div className="flex justify-between w-full p-[20px]">
                <div className="flex justify-start items-center w-full">
                    <p className="text-md text-grayscale-90 font-bold">
                        어느 구단의 예매처를 원하시나요?
                    </p>
                </div>
                <Image src={closeButtonGrayIcon} alt="닫기 버튼" className="w-[24px] h-[24px]" onClick={onClose}/>
            </div>

            {/** 좌석 */}
            <div className="flex flex-col justify-start px-[20px] gap-[12px]">
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        두산베어스
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        롯데 자이언츠
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        삼성 라이온즈
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        키움히어로즈
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        한화이글스
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        KIA 타이거즈
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        KIA wiz
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        LG 트윈스
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        NC 다이노스
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                    <p className="text-xs text-grayscale-90 font-regular">
                        SSG 랜더스
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Dialog