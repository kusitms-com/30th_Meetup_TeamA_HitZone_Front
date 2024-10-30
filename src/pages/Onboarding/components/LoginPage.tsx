import Image from 'next/image';

import logo_icon from '../../../assets/svg/hitzone_logo.svg';

import ball_white_icon from '../../../assets/svg/ball_white.svg';
import ball_pink_icon from '../../../assets/svg/ball_pink.svg';

import login_naver_icon from '../../../assets/svg/login_naver.svg';
import login_kakao_icon from '../../../assets/svg/login_kakao.svg';
import login_google_icon from '../../../assets/svg/login_google.svg';

const Page = () => {
    return (
        <div className="flex justify-center items-start w-full h-screen bg-fff">
            <div className="relative flex flex-col items-center h-screen">
                {/** 하얀 야구공 마크 */}
                <div className="relative flex justify-center items-center w-full h-[111px] mb-[85px]">
                    <div className="absolute left-[-15%] top-[30px]">
                        <Image src={ball_white_icon} alt="white baseball" width={111} height={111} />
                    </div>
                </div>

                {/** 로고 */}
                <div className="flex flex-col justify-center items-center mt-4">
                    <Image src={logo_icon} alt="Logo" width={258} height={45} />
                    <p className="text-md text-grayscale-90 font-medium mt-3">
                        나에게 가장 Fit한 Zone에서 야구를 즐겨보세요
                    </p>
                </div>

                {/** 핑크 야구공 마크 */}
                <div className="relative flex justify-center items-center w-full h-[187px] mt-[100px]">
                    <div className="absolute right-[-15%]">
                        <Image src={ball_pink_icon} alt="pink baseball" width={187} height={187} />
                    </div>
                </div>

                {/** 소셜 로그인 버튼 */}
                <div className="absolute bottom-[75px] ">
                    <Image src={login_naver_icon} alt="pink baseball" className="mb-3" width={370} height={48} />
                    <Image src={login_kakao_icon} alt="pink baseball" className="mb-3" width={370} height={48} />
                    <Image src={login_google_icon} alt="pink baseball" className="mb-3" width={370} height={48} />
                </div>
            </div>
        </div>

    )
}

export default Page