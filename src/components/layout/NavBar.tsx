import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import homeIcon from "../../assets/webp/home_gray.webp";
import guideIcon from "../../assets/webp/guide_gray.webp";
import cultureIcon from "../../assets/webp/culture_gray.webp";
import mypageIcon from "../../assets/webp/mypage_gray.webp";

const NavBar = () => {
  const router = useRouter();

  // 경로와 해당 탭바 메뉴 선택시 분홍색으로 변경
  const menuItems = [
    { name: "홈", path: "/home", icon: homeIcon, activeIcon: "../assets/webp/home_pink.webp" },
    { name: "구역가이드", path: "/guide", icon: guideIcon, activeIcon: "../assets/webp/guide_pink.webp" },
    { name: "야구 문화", path: "/culture", icon: cultureIcon, activeIcon: "../assets/webp/culture_pink.webp" },
    { name: "마이페이지", path: "/mypage", icon: mypageIcon, activeIcon: "../assets/webp/mypage_pink.webp" },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-[500px] bg-grayscale-0 border-t border-grayscale-10 flex justify-around p-2">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => router.push(item.path)}
        >
          <Image
            src={router.pathname === item.path ? item.activeIcon : item.icon}
            alt={`${item.name} Icon`}
            width={52}
            height={45}
          />
        </div>
      ))}
    </div>
  );
};

export default NavBar;
