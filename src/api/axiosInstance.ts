// Axios 라이브러리 가져오기
import axios from "axios";

// 배포 서버 주소 (swagger에 작성되어 있음)
// 보안을 위해 .env.local 파일에 아래와 같은 string 형식의 주소를 작성해서 가져오기 (github에 올리지 않기)
// "https://~~"
export const BASE_URL = process.env.NEXTJS_REACT_APP_BASE_URL;      // Next.js
//export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL   // Vite

/// Axios 인스턴스 생성
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초
  headers: {
    "Content-Type": "application/json", // JSON 형식
  },
});