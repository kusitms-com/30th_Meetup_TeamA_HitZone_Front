import Image from 'next/image';

import logoIcon from '../../assets/svg/hitzone_logo.svg';
import backLeftButtonGrayIcon from '../../assets/webp/back_left_button_gray.webp';

const BackBar = () => {
    return (
        <div className="flex px-[15px]">
            <div className="flex justify-start">
                <Image src={backLeftButtonGrayIcon} alt="뒤로가기 버튼" width={24} height={24} />
            </div>
            <div className="flex justify-center w-full">
                <Image src={logoIcon} alt="Logo" width={154} height={27} />
            </div>
        </div>
    )
}


export default BackBar