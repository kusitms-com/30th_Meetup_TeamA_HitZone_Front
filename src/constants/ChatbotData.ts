import prohibitedItemsIcon from "@/src/assets/webp/chatbot_prohibition.webp";

import { stadiumList } from "@/src/constants/ZoneData";

export const chatbotName = "루키";
export const questionCategories = {
  // 기본 데이터
  chatbotName,
  greetings: [`안녕하세요! 챗봇 ${chatbotName} 입니다.`, "궁금하신 정보를 실시간 채팅으로 확인하실 수 있습니다."],
  
  // 필수로 선택해야하는 데이터
  baseballCategories: {
    frontendValues: stadiumList,  // 챗봇 구단별 구장명 (프론트에서 보여주는 값)
    backendParameters: ["lg", "kt", "kiwoom", "kia", "samsung", "hanhwa", "lotte", "ssg", "nc"],  // 챗봇 구단별 구장명 (백엔드에 API 파라미터로 넘겨주는 값)
    userMessage: ["야구에 관련된 궁금한 점이 있으신가요?", "1. 궁금한 내용을 언제든 자유롭게 입력해주세요", "2. 아래 질문 카테고리 선택을 해주시면, ‘자주 물어보는 질문’을 물어볼 수 있어요!"]
  },
  
  // 챗봇 질문 카테고리 데이터
  questionCategoryOrder: ["chatbot", "stadium", "baseball", "manner", "facility", "prohibition", "parking"], // 카테고리 순서를 정의
  questionCategories: {
    chatbot: {
      frontendValue: `🔎 챗봇 ${chatbotName} 사용방법`,
      backendValue: "chatbot",
      icon: null,
      answer: [`반갑습니다! 저는 챗봇 ${chatbotName} 입니다.`,
        "저에게 궁금하신 점이 있으시면 무엇이든 언제나 물어보세요!",
        "저에게 질문하는 방법은 2가지입니다.",
        "1. 궁금한 내용을 언제든 자유롭게 입력해주세요!",
        "2. 아래 질문 카테고리 선택을 해주시면 ‘자주 물어보는 질문’을 물어볼 수 있어요!"]
    },
    stadium: {
      frontendValue: "👟 야구장 가이드",
      backendValue: "stadium",
      icon: "👟",
      subcategories: {
        frontendValues: ["야구장 입장시간",
          "좌석에 음식물 반입 여부",
          "응원도구 구매 방법",
          "경기 중 좌석 이탈 여부",
          "경기 중 사진 촬영, 영상 촬영 가능 여부",
          "경기 중 응원단 참여여부",
          "맥주, 음료 구매 방법",
          "특정 구역에서 판매하는 특별한 메뉴",
          "직관 시 준비해야 할 물품 안내"],
        backendParameters: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    baseball: {
      frontendValue: "⚾️ 야구 가이드",
      backendValue: "baseball",
      icon: "⚾️",
      subcategories: {
        frontendValues: ["우천취소", "경기 시간 및 일정"],
        backendParameters: [1, 2]
      }
    },
    manner: {
      frontendValue: "🫵 직관 매너",
      backendValue: "manner",
      icon: "🫵",
      subcategories: {
        frontendValues: ["야구장 관람 매너"],
        backendParameters: [1]
      }
    },
    facility: {
      frontendValue: "💬 야구장 편의시설",
      backendValue: "facility",
      icon: "💬",
      subcategories: {
        frontendValues: ["물품 보관소의 위치",
          "화장실 위치",
          "쓰레기 버릴 수 있는 위치",
          "수유실 위치",
          "장애인 화장실 위치",
          "엘리베이터 위치",
          "층별 음식점 위치"],
        backendParameters: [1, 2, 3, 4, 5, 6, 7]
      }
    },
    prohibition: {
      frontendValue: "🚫 반입 금지 물품",
      backendValue: "prohibition",
      icon: null,
      image: prohibitedItemsIcon,
      answer: [
        "• 모든 유리병 금지 (소주병X)",
        "• 1인당 1L 초과 페트병, 알루미늄 캔 금지 (IL이내 페트병 1개, 캔 2개까지 허용)",
        "• 과일은 잘라온 경우에만 가능",
        "• 유아용 젖병, 종이팩에 담긴 우유, 주스 가능",
        "• 의약품 반입가능",
        "• 가스버너 등 취사도구 금지",
        "• 아이스박스 반입금지",
        "• 반려동물, 킥보드, 돗자리, 휴대용의자 금지 (단, 구장 별로 잔디석 등 구단이 특별히 허용하는 특별구역에서는 이용 가능)"
      ]      
    },
    parking: {
      frontendValue: "🚘 교통 및 주차 정보",
      backendValue: "parking",
      icon: "🚘",
      subcategories: {
        frontendValues: [
          "경기장까지 가는 방법",
          "구장 부설주차장 주차료",
          "구장 주변 주차장 정보",
          "구장 주차장 이용 예약방법"
        ],
        backendParameters: [1, 2, 3, 4]
      }
    }
  }
};