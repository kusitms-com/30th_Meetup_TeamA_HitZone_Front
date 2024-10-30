import Image from 'next/image';

import back_left_button_gray_icon from '../../../assets/webp/back_left_button_gray.webp';

const Main = () => {
    return (
        <div className="px-[15px]">
            <Image src={back_left_button_gray_icon} alt="뒤로가기 버튼" width={24} height={24} />
        </div>
    )
}


export default Main