import React from "react";
import { useState } from "react";
import Image from "next/image";
import stadiumDropdownIcon from "../../../assets/webp/stadium_dropdown.webp";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export default function Dropdown({ options, selectedOption, onSelect }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative w-[220px]">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between py-[6px] px-3 border rounded-lg w-[220px] h-[36px] text-md font-semibold text-grayscale-80"
      >
        <span>{selectedOption || "야구장을 선택하세요"}</span>
        <Image src={stadiumDropdownIcon} alt="dropdown icon" width={16} height={16} />
      </button>

      {isDropdownOpen && (
        <ul className="absolute left-0 w-full mt-2 font-medium bg-white border shadow-lg rounded-lg text-sm">
          {options.map((option, index, array) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsDropdownOpen(false);
              }}
              className={`px-4 py-[10px] cursor-pointer ${
                option === selectedOption
                  ? "bg-main-5 text-main-30"
                  : option === "고척스카이돔 (키움)" || option === "기아 챔피언스 필드 (광주)" || option === "삼성 라이온즈 파크 (대구)" || option === "한화생명 이글스 파크 (대전)"
                  ? "bg-[#000000] bg-opacity-50 text-grayscale-80"
                  : "hover:bg-gray-100"
              } ${index === 0 ? "rounded-t-lg" : ""} ${index === array.length - 1 ? "rounded-b-lg" : ""}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
