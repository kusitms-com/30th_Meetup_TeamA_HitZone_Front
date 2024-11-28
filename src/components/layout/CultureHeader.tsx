import React, { useState } from "react";
import Image from "next/image";
import GuideIcon from "../../assets/webp/guide_header.webp";
import NotificationIcon from "../../assets/webp/notification_gray.webp";
import CoachMark from "../../pages/Main/components/CoachMark";
import Dropdown from "../dropdown/BigDropdown";
import { StadiumType } from "@/src/constants/ZoneData";

interface CultureHeaderProps {
  onStadiumSelect: (stadium: StadiumType) => void;
}

const CultureHeader = ({ onStadiumSelect }: CultureHeaderProps) => {
  const [isCoachMarkVisible, setIsCoachMarkVisible] = useState(false);

  // 드롭다운 상태 관리
  const [selectedOption, setSelectedOption] = useState<StadiumType>(StadiumType.JAMSIL);

  // 드롭다운 선택 핸들러
  const handleDropdownSelect = (option: StadiumType) => {
    setSelectedOption(option);
    onStadiumSelect(option);
  };

  // 코치마크 아이콘 클릭 시 상태 변경
  const handleGuideClick = () => {
    setIsCoachMarkVisible(true);
  };

  // 코치마크 닫기
  const handleCloseCoachMark = () => {
    setIsCoachMarkVisible(false);
  };

  return (
    <>
      <div className={`${isCoachMarkVisible ? "hidden" : "block"}`}>
        <div className="flex justify-between items-center p-3 border-b border-grayscale-10 w-full z-20">
          <Dropdown
            options={[StadiumType.JAMSIL, StadiumType.SUWON_KT]}
            selectedOption={selectedOption}
            onSelect={handleDropdownSelect}
          />

          {/* 코치마크, 알림 아이콘 */}
          <div className="flex space-x-3">
            <Image
              src={GuideIcon}
              alt="Guide Icon"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleGuideClick}
            />
            <Image
              src={NotificationIcon}
              alt="Notification Icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 코치마크 렌더링 */}
      {isCoachMarkVisible && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-100 flex items-center justify-center">
          <CoachMark onClose={handleCloseCoachMark} />
        </div>
      )}
    </>
  );
};

export default CultureHeader;
