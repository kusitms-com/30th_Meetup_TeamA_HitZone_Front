import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logoIcon from '../../assets/svg/hitzone_logo.svg';
import backLeftButtonGrayIcon from '../../assets/webp/back_left_button_gray.webp';

const BackBar = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between py-[14px] px-4 bg-white z-20">
            <div className="flex justify-start">
                <Image
                    src={backLeftButtonGrayIcon}
                    alt="뒤로가기 버튼"
                    width={24}
                    height={24}
                    onClick={() => router.back()}
                    className="cursor-pointer"
                />
            </div>
            <div className="flex justify-center flex-grow">
                <Image src={logoIcon} alt="Logo" width={154} height={27} />
            </div>
        </div>
    );
};

export default BackBar;
