import React from "react";

interface OptionsListProps {
  isOpen: boolean;
}

const options = [
  { label: "챗봇 루키 사용방법", icon: "🔍", ariaLabel: "search" },
  { label: "야구장 가이드", icon: "📝", ariaLabel: "guide" },
  { label: "야구 가이드", icon: "⚾️", ariaLabel: "baseball" },
  { label: "직관 매너", icon: "🍺", ariaLabel: "manners" },
  { label: "야구장 편의시설", icon: "💬", ariaLabel: "facilities" },
  { label: "반입 금지 물품", icon: "🚫", ariaLabel: "restricted" },
  { label: "교통 및 주차 정보", icon: "🚗", ariaLabel: "transport" },
];

const OptionsList = ({ isOpen }: OptionsListProps) => {
  return (
    <div
      className={`fixed bottom-[60px] left-1/2 transform -translate-x-1/2 max-w-[500px] w-full py-3 px-5 bg-grayscale-5 rounded-t-lg transition-transform duration-300 ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex flex-col space-y-3">
        {options.map((option, index) => (
          <p key={index} className="text-sm flex items-center text-grayscale-90 font-regular">
            <span role="img" aria-label={option.ariaLabel} className="mr-2">
              {option.icon}
            </span>
            {option.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OptionsList;
