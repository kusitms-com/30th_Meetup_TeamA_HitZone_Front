import React, { useState } from "react";
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

      <div
        className={`absolute left-0 w-full mt-2 font-medium bg-white shadow-lg text-sm z-10 transition-all duration-300 ease-in-out rounded-lg ${
          isDropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 scale-95"
        } overflow-hidden`}
      >
        <div className="max-h-60 overflow-y-auto">
          <ul className="list-none">
            {options.map((option, index) => {
              const isSelected = option === selectedOption;
              const isGrayBackground = index > 1;

              return (
                <li
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-[10px] cursor-pointer
                    ${isSelected ? "bg-main-5 text-main-30 font-semibold" : 
                      isGrayBackground ? "bg-[#000000] bg-opacity-50 text-grayscale-80" : ""}
                    ${index === 0 ? "rounded-t-lg" : ""}
                    ${index === options.length - 1 ? "rounded-b-lg" : ""}
                    ${!isSelected && "hover:bg-gray-100"}
                  `}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
