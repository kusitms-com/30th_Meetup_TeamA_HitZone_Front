import React from "react";
import Image from "next/image";
import LocationIcon from "../../../assets/svg/culture_location.svg";
import MenuIcon from "../../../assets/svg/culture_menu.svg";

interface CategoryRowProps {
  data: {
    title: string;
    location?: string; // 먹거리만 해당
    menu?: string; // 먹거리만 해당
    description?: string; // 즐길거리 전용
    image: string;
  }[];
  isActivity: boolean; // true면 즐길거리, false면 먹거리
  onCardClick: (data: any) => void;
}

const CategoryRow = ({ data, isActivity, onCardClick }: CategoryRowProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[173px] bg-white rounded-lg cursor-pointer"
          onClick={() => onCardClick(item)}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={173}
            height={150}
            className="w-full h-[150px] object-cover rounded-t-lg"
          />
          <div className="p-3">
            <h4 className="text-md font-bold text-grayscale-90 mb-[6px]">
              {item.title}
            </h4>
            {item.location && (
              <div className="flex items-start gap-1 mb-[4px]">
                <Image
                  src={LocationIcon}
                  alt="location icon"
                  width={14}
                  height={14}
                  className="mt-[2px]"
                />
                <p className="text-xs font-medium text-grayscale-90">{item.location}</p>
              </div>
            )}
            {item.menu && (
              <div className="flex items-start gap-1">
                <Image
                  src={MenuIcon}
                  alt="menu icon"
                  width={14}
                  height={14}
                  className="mt-[2px]"
                />
                <p className="text-xs font-medium text-grayscale-90">{item.menu}</p>
              </div>
            )}
            {/* description은 즐길거리(isActivity === true)일 때만 렌더링 */}
            {isActivity && item.description && (
              <p className="text-xs font-medium text-grayscale-90">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryRow;
