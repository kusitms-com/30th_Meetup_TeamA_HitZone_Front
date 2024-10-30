import Image from 'next/image';
import logo from '../../../assets/svg/hitzone_logo.svg';

const Page = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-main-20">
            <Image src={logo} alt="logo" width={258} height={45} />
        </div>
    )
}

export default Page