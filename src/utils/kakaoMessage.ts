export const createKakaoShareMessage = (
    resultId: number | null,
    nickname: string | undefined,
    hashTags: string[] = []
  ) => {
    if (!resultId) {
      throw new Error("resultId가 없습니다. 메시지를 생성할 수 없습니다.");
    }
  
    const resultPageUrl = `https://www.hitzone.site/recommend/results?resultId=${resultId}`;
    const formattedHashTags = hashTags?.length
      ? hashTags.map((tag) => `#${tag}`).join(" ")
      : "#HitZone"; // 기본 해시태그 설정
  
    return {
      objectType: "feed",
      content: {
        title: `${nickname || "익명의 사용자"}`,
        description: `${formattedHashTags}`,
        imageUrl: `${window.location.origin}/assets/webp/kakao_share.webp`,
        link: {
          mobileWebUrl: resultPageUrl,
          webUrl: resultPageUrl,
        },
      },
      buttons: [
        {
          title: "결과 자세히 보기",
          link: {
            mobileWebUrl: resultPageUrl,
            webUrl: resultPageUrl,
          },
        },
        {
          title: "나도 나만의 HitZone 찾아보기",
          link: {
            mobileWebUrl: "https://www.hitzone.site/",
            webUrl: "https://www.hitzone.site/",
          },
        },
      ],
    };
  };
  