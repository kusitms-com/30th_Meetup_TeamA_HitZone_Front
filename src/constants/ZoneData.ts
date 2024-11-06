// Stadium 관리
// (1) 백엔드에 보내는 데이터
export enum StadiumType {
    NONE = '',
    JAMSIL = '잠실종합운동장',
    SUWON_KT = '수원KT위즈파크',

    GOCHEOK_SKY_DOME = '더미1',
    KIA_CHAMPIONS_FIELD = '더미2',
    SAMSUNG_LIONS_PARK = '더미3',
    HANWHA_EAGLES_PARK = '더미4'
}

export const frontStadiums = [
    "잠실종합운동장 (잠실)",
    "수원KT위즈파크",
    "고척스카이돔 (키움)",
    "기아 챔피언스 필드 (광주)",
    "삼성 라이온즈 파크 (대구)",
    "한화생명 이글스 파크 (대전)"
];

// (2) 프론트엔드에서 보여줄 데이터
// StadiumType을 frontStadiums 값으로 mapping
export const stadiumTypeToString: { [key in StadiumType]: string } = {
    [StadiumType.NONE]: "",
    [StadiumType.JAMSIL]: frontStadiums[0],
    [StadiumType.SUWON_KT]: frontStadiums[1],
    [StadiumType.GOCHEOK_SKY_DOME]: frontStadiums[2],
    [StadiumType.KIA_CHAMPIONS_FIELD]: frontStadiums[3],
    [StadiumType.SAMSUNG_LIONS_PARK]: frontStadiums[4],
    [StadiumType.HANWHA_EAGLES_PARK]: frontStadiums[5]
};

// frontStadiums을 StadiumType 값으로 mapping
export const stringToStadiumType: { [key: string]: StadiumType } = {
    "": StadiumType.NONE,
    [frontStadiums[0]]: StadiumType.JAMSIL,
    [frontStadiums[1]]: StadiumType.SUWON_KT,
    [frontStadiums[2]]: StadiumType.GOCHEOK_SKY_DOME,
    [frontStadiums[3]]: StadiumType.KIA_CHAMPIONS_FIELD,
    [frontStadiums[4]]: StadiumType.SAMSUNG_LIONS_PARK,
    [frontStadiums[5]]: StadiumType.HANWHA_EAGLES_PARK
};


// 잠실 Zone 관리

// KT Zone 관리

// Seat 관리
export enum SeatType {
    NONE = '',
    SEAT1 = '1루석',
    SEAT3 = '3루석'
}

// keyword 관리
export enum Keyword {
    NONE = '',
    PARTNER1 = '나 혼자',
    PARTNER2 = '같은 팀 팬과',
    PARTNER3 = '다른 팀 팬과',
    WISH1 = '열정적인 응원',
    WISH2 = '경기장 한눈에 보기',
    WISH3 = '편리한 화장실 이용',
    WISH4 = '음식 먹기 편한',
    WISH5 = '빠른 퇴장 가능',
    WISH6 = '선수들 가까이',
    WISH7 = '삼겹살 구워먹기',
    NOWISH1 = '햇빛 싫어요',
    NOWISH2 = '큰 소리 싫어요',
    NOWISH3 = '높은 곳 싫어요',
    NOWISH4 = '비 맞기 싫어요'
}