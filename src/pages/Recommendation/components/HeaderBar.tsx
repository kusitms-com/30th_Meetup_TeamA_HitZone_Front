import Image from 'next/image';

import closeButtonGrayIcon from '../../../assets/webp/close_button_gray.webp';


interface Props {
    stadium: string;
}

const BackBar = ({stadium}: Props) => {
    return (
        <div className="flex justify-between w-full border-b p-[15px]">
            <div className="flex justify-center items-center w-full">
                <p className="text-lg text-grayscale-90 font-semibold text-center ">
                    내가 갈 곳은? {stadium}
                </p>
            </div>
            <Image src={closeButtonGrayIcon} alt="닫기 버튼" width={24} height={24} />
        </div>
    )
}


export default BackBar