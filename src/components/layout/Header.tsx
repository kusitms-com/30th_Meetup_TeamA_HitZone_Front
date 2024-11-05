import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import HitzoneLogo from "../../assets/svg/hitzone_logo.svg";
import GuideIcon from "../../assets/webp/guide_header.webp";
import NotificationIcon from "../../assets/webp/notification_gray.webp";

const Header = () => {
  const router = useRouter();

  // 로고 클릭 시 Main 페이지로 이동
  const handleLogoClick = () => {
    if (router.pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-between items-center pb-4 border-b border-grayscale-10 w-full">
      {/* 히트존 로고 */}
      <Image 
        src={HitzoneLogo} 
        alt="Hitzone Logo" 
        width={154} 
        height={27} 
        onClick={handleLogoClick}
        className="cursor-pointer"
      />

      {/* 코치마크, 알림 아이콘 */}
      <div className="flex space-x-3">
        <Image src={GuideIcon} alt="Guide Icon" width={24} height={24} />
        <Image src={NotificationIcon} alt="Notification Icon" width={24} height={24} />
      </div>
    </div>
  );
};

export default Header;
