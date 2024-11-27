const imagePath = "/culture_example.png";

const cultureData = {
  먹거리: {
    내부: {
      식사류: [
        {
          title: "통밥",
          location: "2층 B06 / 2.5층 C05 (1,3루 내야지정석)",
          menu: "김치말이국수",
          price: "7,000원 (세트 26,000원)",
          description: "잠실야구장의 최고 인기 메뉴, 김치말이국수! 전석 매진일 기준 경기 1시간 전 주문 필요해요.",
          image: imagePath,
        },
        {
          title: "원샷 치킨",
          location: "1층 A03 / 2층 B27",
          menu: "크림새우원샷",
          price: "14,000원~",
          description: "맥주 위에 크림새우와 치킨이 올라간 원샷 치킨! 더운 날 먹기 좋아요.",
          image: imagePath,
        },
        {
            title: "명인만두",
            location: "1층 A19 (1루 내야지정석) / 2층 B30 (외야 쪽 경기장 외부)",
            menu: "만떡 세트 (만두+떡볶이)",
            price: "13,000원~~",
            description: "간단하게 하나씩 집어먹기 편한 명인만두! 분식도 함께 팔아서 먹기 좋아요.",
            image: imagePath,
          },
      ],
      후식류: [
        {
          title: "와팡",
          location: "2층 B08 / 2.5층 C03 / 3층 D06",
          menu: "한라봉샤벳와팡",
          price: "5,500원~",
          description: "잠실야구장의 대표 디저트 와팡! 더운 날, 달달한 디저트로 먹기 좋아요.",
          image: imagePath,
        },
        {
          title: "백미당",
          location: "2층 B31 (1루 내야 지정석)",
          menu: "유기농 우유 아이스크림",
          price: "4,900원~",
          description: "우유맛이 나는 아이스크림, 백미당! 더운 날에는 컵으로 받아 먹기를 추천해요.",
          image: imagePath,
        },
        {
            title: "달콤커피",
            location: "22층 B07, B29",
            menu: "레몬에이드, 청포도에이드, 말차라떼",
            price: "에이드 6,500원",
            description: "가성비 좋은 달콤커피! 가볍게 먹을 커피나 에이드를 찾는 분들에게 추천해요.",
            image: imagePath,
          },
      ],
    },
    외부: [
      {
        title: "파오파오",
        location: "잠실 새마을시장 (잠실새내역 3번 출구)",
        menu: "고기만두, 김치만두",
        price: "3인분 15,000원 / 1인분 6,000원",
        description: "새마을시장의 대표 먹거리 파오파오! 평일 웨이팅은 약 30분이니 참고하세요.",
        image: imagePath,
      },
      {
        title: "깻잎닭강정",
        location: "잠실 새마을시장 (잠실새내역 3번 출구)",
        menu: "양념닭강정, 후라이드",
        price: "소 7,000원 / 중 9,500원 / 대 10,000원",
        description: "깻잎향이 나는 깻잎닭강정! 야구 시간대에는 대(大) 사이즈만 주문이 가능해요.",
        image: imagePath,
      },
    ],
  },
  즐길거리: {
    내부: [
      {
        title: "포토카드",
        description: "선수들의 사진을 뽑을 수 있는 포토카드!",
        image: imagePath,
      },
      {
        title: "브랜드데이",
        description: "스폰서 브랜드 하나가 구장 매표소 근처에서 이벤트 하는 날!",
        image: imagePath,
      },
    ],
    외부: [
      {
        title: "팬 사인회",
        description: "선수들과 팬들이 만나는 특별 이벤트",
        image: imagePath,
      },
    ],
  },
};

export default cultureData;
