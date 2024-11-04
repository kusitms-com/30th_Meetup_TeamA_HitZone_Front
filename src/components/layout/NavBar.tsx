import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import homeGrayIcon from "../../assets/webp/home_gray.webp";
import homePinkIcon from "../../assets/webp/home_pink.webp";
import guideGrayIcon from "../../assets/webp/guide_gray.webp";
import guidePinkIcon from "../../assets/webp/guide_pink.webp";
import cultureGrayIcon from "../../assets/webp/culture_gray.webp";
import culturePinkIcon from "../../assets/webp/culture_pink.webp";
import mypageGrayIcon from "../../assets/webp/mypage_gray.webp";
import mypagePinkIcon from "../../assets/webp/mypage_pink.webp";

const NavBar = () => {
  const router = useRouter();

  // 현재 경로와 일치하면 핑크 아이콘, 아니면 그레이 아이콘 표시
  const menuItems = [
    { name: "홈", path: "/", icon: homeGrayIcon, activeIcon: homePinkIcon },
    { name: "구역 가이드", path: "/guide", icon: guideGrayIcon, activeIcon: guidePinkIcon },
    { name: "야구 문화", path: "/culture", icon: cultureGrayIcon, activeIcon: culturePinkIcon },
    { name: "마이 페이지", path: "/mypage", icon: mypageGrayIcon, activeIcon: mypagePinkIcon },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-[500px] bg-grayscale-0 border-t border-grayscale-10 flex justify-around p-2">
      {menuItems.map((item) => {
        const isActive = router.pathname === item.path;
        return (
          <div
            key={item.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              if (!isActive) {
                router.push(item.path);
              }
            }}
          >
            <Image
              src={isActive ? item.activeIcon : item.icon}
              alt={`${item.name} Icon`}
              width={52}
              height={45}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
