import React from "react";
import { questionCategories } from "@/src/constants/ChatbotData";

import Image from "next/image";
import tailIcon from "@/src/assets/webp/chatbot_message_left_tail_white_big.webp";  // 꼬랑지


// API 호출 함수 (예제)
const callApi = (parameter: number) => {
  console.log("API 호출:", parameter);
  // 실제 API 호출 로직 작성
};

interface Props {
    categoryFrontName: string
}


// 사용자가 카테고리 클릭시 나오는 커스텀 대화창
const CategoryChat = ({categoryFrontName}: Props) => {

    const categories = questionCategories.questionCategories;

    // prop으로 받은 카테고리와 일치하는 항목 필터링
    const filteredCategory = Object.values(categories).find(
        (category) => category.frontendValue === categoryFrontName
    ) || "";



    // 카테고리 클릭시 하위 값 존재 여부에 따른 렌더링 함수
    const renderCategoryDetails = (categoryData: typeof categories[keyof typeof categories]) => (
        <div>
            {/* 프론트에서 처리하는 데이터: 텍스트 출력 */}
            {/* answer 값이 있는 경우: answer 렌더링 */}
            {"answer" in categoryData && categoryData.answer && (
                <ul className="space-y-1.5">
                    {categoryData.answer.map((answer, index) => (
                        <li
                        key={index}
                        className="py-1 px-2 text-xs w-full text-center font-regular text-grayscale-90 bg-grayscale-5 hover:bg-grayscale-10 rounded-md"
                        >
                        {answer}
                        </li>
                    ))}
                </ul>
            )}

            
            {/* 프론트에서 처리하는 데이터: 이미지 출력 */}
            {/* image 값이 있는 경우: image 렌더링 */}
            {"image" in categoryData && categoryData.image && (
                <div className="mt-4">
                    <img
                        src={categoryData.image.src || categoryData.image}
                        alt="Category Icon"
                        className="max-w-full h-auto rounded-md"
                    />
                </div>
            )}

            
            {/* 백엔드에서 받아오기 전 세부 카테고리 데이터: 리스트 출력 */}
            {/* subcategories 값이 있는 경우: subcategories 렌더링 */}
            {"subcategories" in categoryData && categoryData.subcategories && (
                <ul className="space-y-1.5">
                    {categoryData.subcategories.frontendValues.map((value, index) => (
                        <li
                        key={index}
                        className="py-1 px-2 text-xs w-full text-center font-regular text-grayscale-90 bg-grayscale-5 hover:bg-grayscale-10 rounded-md cursor-pointer"
                        onClick={() =>
                            callApi(categoryData.subcategories.backendParameters[index])
                        }
                        >
                        {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
    
    // 필터링된 카테고리가 없을 경우 아무것도 렌더링X
    if (!filteredCategory) {
        return null;
    }

    return (
        <div className="relative min-w-[200px] max-w-[300px]">
            {/* 말풍선 꼬랑지 */}
            <Image src={tailIcon} alt="꼬랑지" className="absolute left-[-12px] top-2 w-5 h-5"/>

            <ul>
            {Object.entries(categories).map(([key, category]) => {
                return filteredCategory === category ? (
                <li key={key} className="p-4 bg-main-0 rounded-lg shadow">
                    {/* 선택한 카테고리에 따른 컴포 제목 */}
                    <h3 className="text-xs font-regular text-grayscale-90 mb-2">
                        {category.frontendValue}
                    </h3>

                    {/* 선택한 카테고리에 따른 세부 내용 렌더링 함수 호출 */}
                    {renderCategoryDetails(category)}
                </li>
                ) : null;
            })}
            </ul>
        </div>
    );
};
  
export default CategoryChat;
