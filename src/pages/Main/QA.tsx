import { useRouter } from "next/router";

import Image from 'next/image';

import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';


const Page = () => {
    const router = useRouter();

    const move1 = () => {
        router.push("/main");
    }
    const move2 = () => {
        router.push("/login");
    }
    const move3 = () => {
        router.push("/signup");
    }
    const move4 = () => {
        router.push("/recommend/question");
    }
    const move5 = () => {
        router.push("/recommend/results");
    }
    const move6 = () => {
        router.push("/dialog1");
    }
    const move8 = () => {
        router.push("/dialog4");
    }

    return (
        <div className="flex flex-col border border-0 rounded-[12px] w-[324px]">
            {/** 헤더 */}
            <div className="flex justify-between w-full p-[20px]">
                <div className="flex justify-start items-center w-full">
                    <p className="text-md text-grayscale-90 font-bold">
                        QA를 위한 임시 라우팅 페이지입니다.
                    </p>
                </div>
            </div>

            {/** 좌석 */}
            <div className="flex flex-col justify-start px-[20px] gap-[12px]">
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move1}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        메인홈
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move2}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        로그인 페이지
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move3}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        회원가입 페이지
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move4}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        추천 질문 페이지
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move5}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        추천 결과 페이지
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move6}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        알람창
                    </p>
                </div>
                <div className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]" onClick={move8}>
                    <p className="text-xs text-grayscale-90 font-regular">
                        구역 추천 다이얼로그
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Page