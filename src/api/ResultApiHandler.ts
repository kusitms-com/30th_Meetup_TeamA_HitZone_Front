// API 연동 함수
import { getProfile, postZone, getZones } from './ResultApiService'; // API 함수들 가져오기
import { SavePostRequestType, SavePostResponseType, ZoneGetResponseType } from "./ResultApiType";

import { StadiumType, SeatType, Keyword } from "../constants/ZoneData";

import { useRouter } from "next/router";


////////////////////////////////////////////////////////
// 사용자가 고른 추천 구역 데이터 전달 이벤트
interface RecommendQuestionProps {
  stadium: StadiumType;
  seat: SeatType;
  keywords: Keyword[];
}


// SavePostRequestType을 생성하는 함수 예제
function createSavePostRequest(
  stadium: StadiumType,
  preference: SeatType,
  keywords: Keyword[]
): SavePostRequestType {
  return {
      stadium: stadium,  // Enum 타입을 문자열로 매핑
      preference: preference,  // Enum 타입을 문자열로 매핑
      clientKeywords: keywords  // Enum 배열을 문자열 배열로 매핑
  };
}

interface RecommendQuestionProps {
  stadium: StadiumType;
  seat: SeatType;
  keywords: Keyword[];
}

// 데이터 전송 함수
export const handleSave = async ({stadium, seat, keywords}: RecommendQuestionProps) => {
  try {
    
    const requestData: SavePostRequestType = createSavePostRequest(stadium, seat, keywords);
    const s = requestData.stadium;
    const p = requestData.preference;
    const c = requestData.clientKeywords;

    // API 통신
    // 유저에게 닉네임을 받은 후, 바디에 닉네임 넣어서 API를 요청
    await postZone(
        {  },
        { stadium:s, preference:p, clientKeywords:c }
    );

  } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
  }
};


////////////////////////////////////////////////////////