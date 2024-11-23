import React from "react";
import { questionCategories } from "@/src/constants/ChatbotData";

interface FAQCategoryBarProps {
  isVisible: boolean;
}

const FAQCategoryBar = ({ isVisible }: FAQCategoryBarProps) => {
  const { baseballCategories, questionCategories: categories } = questionCategories;
  
  return (
    <div
      className={`fixed bottom-[60px] left-1/2 transform -translate-x-1/2 max-w-[500px] w-full py-4 bg-grayscale-5 rounded-t-2xl transition-transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex flex-col ">
        {Object.keys(categories).map((key) => {
            const category = categories[key as keyof typeof categories];
            return (
              <div className="cursor-pointer hover:bg-grayscale-10 px-5 py-1">
                <p
                  key={key}
                  className="text-sm flex items-center text-grayscale-90 font-regular "
                >
                  {category.frontendValue}
                </p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default FAQCategoryBar;
