// 화면 크기에 대한 이넘 정의
export enum ScreenSize {
    SMALL = 360,        // 작은 폰 기종 화면 (360px)
    MEDIUM = 390,       // 일반 폰 기종 화면 (390px)
    LARGE = 410,        // Pro 폰 기종 화면 (400~410px)
    EXTRA_LARGE = 500,  // Web, 패드 등 모바일 이외 전자기기에서 최대 너비 제한 (500px 이상)
}

// 화면 크기별 너비와 높이를 하나의 객체로 통합하여 관리
import { StadiumType } from "./ZoneData";
export interface ImageSize {
    width: number;
    height: number;
}


export const ImageDimensions: Record<StadiumType, Record<ScreenSize, ImageSize>> = {
    [StadiumType.JAMSIL]: {
        [ScreenSize.SMALL]: { width: 337, height: 319 },
        [ScreenSize.MEDIUM]: { width: 350, height: 331 },
        [ScreenSize.LARGE]: { width: 376, height: 356 },
        [ScreenSize.EXTRA_LARGE]: { width: 376, height: 356 },
    },
    [StadiumType.SUWON_KT]: {
        [ScreenSize.SMALL]: { width: 316, height: 345 },
        [ScreenSize.MEDIUM]: { width: 343, height: 374 },
        [ScreenSize.LARGE]: { width: 366, height: 400 },
        [ScreenSize.EXTRA_LARGE]: { width: 366, height: 400 },
    },


    ///// 제공하지 않는 이미지라서 임시적으로 width, height 모두 0으로 했음
    [StadiumType.GOCHEOK_SKY_DOME]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.KIA_CHAMPIONS_FIELD]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.SAMSUNG_LIONS_PARK]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.HANWHA_EAGLES_PARK]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.LOTTE_GIANTS_PARK]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.SSG_LENDERS_FIELD]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.CHANDWON_NC_PARK]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    // 이미 존재하는 stadium 타입들도 그대로 두고, 'NONE'에 대해서만 0 값을 지정
    [StadiumType.NONE]: {
        [ScreenSize.SMALL]: { width: 0, height: 0 },
        [ScreenSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenSize.LARGE]: { width: 0, height: 0 },
        [ScreenSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
};

// 이미지 크기를 각각의 width와 height로 반환하는 함수
export const getImageDimensions = (stadiumName: StadiumType, screenSize: ScreenSize): ImageSize => {
    const dimensions = ImageDimensions[stadiumName]?.[screenSize];
    if (dimensions) {
        return { width: dimensions.width, height: dimensions.height };
    } else {
        return { width: 0, height: 0 }; // 기본값
    }
};