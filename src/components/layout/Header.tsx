import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import HitzoneLogo from "../../assets/svg/hitzone_logo.svg";
import GuideIcon from "../../assets/webp/guide_header.webp";
import NotificationIcon from "../../assets/webp/notification.webp";

const Header = () => {
  const router = useRouter();

  // 로고 클릭 시 Main 페이지로 이동
  const handleLogoClick = () => {
    if (router.pathname !== "/main") {
      router.push("/main");
    }
  };

  return (
    <div className="flex gap-[156px] p-4 border-b border-grayscale-10 w-full">
      <div className="flex items-center">
        <Image 
          src={HitzoneLogo} 
          alt="Hitzone" 
          width={154} 
          height={27} 
          onClick={handleLogoClick}
          className="cursor-pointer"
        />
      </div>
      <div className="flex space-x-3 ml-auto">
        <Image src={GuideIcon} alt="Guide Icon" width={28} height={20} />
        <Image src={NotificationIcon} alt="Notification Icon" width={28} height={20} />
      </div>
    </div>
  );
};

export default Header;
