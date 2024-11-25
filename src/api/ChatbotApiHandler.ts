
import { getGuide } from "./ChatbotApiService";
import { GuideGetParamsType } from "./ChatbotApiType";

import { getStadiumChatApiData } from "@/src/constants/ChatbotData";

export const handleGetGuideAnswer = async ({stadiumName, categoryName, orderNumber}: GuideGetParamsType) => {
    try {
        const stadiumApiData = getStadiumChatApiData(stadiumName);
        console.log(stadiumApiData);

        // API 요청
        const response = await getGuide(
            {
                stadiumName: stadiumApiData,
                categoryName: categoryName,
                orderNumber: orderNumber,
            }
        );
        
        console.log("챗봇 가이드 데이터 받았당 >> ", response);

        // 파싱: 답변 배열 빈환
        const data = response.payload.answers;
        return data;

    } catch (error) {
        console.error('챗봇 가이드 데이터 가져오는 중 오류 발생:', error);
    }
};