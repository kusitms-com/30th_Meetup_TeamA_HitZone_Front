import React from "react";
import { questionCategories } from "@/src/constants/ChatbotData";

const FAQCategoryBar = () => {
  const { baseballCategories, questionCategories: categories } = questionCategories;
  
  return (
    <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 max-w-[500px] w-full bg-grayscale-5 rounded-t-2xl transition-transform pb-2">

          {/** 상태 바 */}
      <div className="flex justify-center text-center items-center pt-3 py-3 cursor-pointer hover:bg-grayscale-10">
        <div className="w-9 h-[2px] bg-main-40 rounded-full"/>
      </div>
      <div className="flex flex-col ">
        {Object.keys(categories).map((key) => {
            const category = categories[key as keyof typeof categories];
            return (
              <div className="cursor-pointer px-5 py-1.5 hover:bg-grayscale-10">
                <p
                  key={key}
                  className="text-sm flex text-grayscale-90 font-regular "
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
