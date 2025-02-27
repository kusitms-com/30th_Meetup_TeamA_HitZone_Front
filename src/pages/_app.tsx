////////////////////////////////////////////////////
// pull 받을 때마다 매번 해야하는 명령어
// npm install react react-dom
////////////////////////////////////////////////////
// 처음 한 번만 실행하는 명령어
// npm install --save-dev @types/react @types/react-dom
// npm install next
// npm install next@latest typescript@latest @types/react@latest @types/react-dom@latest
// npm install --save-dev @types/react @types/node
// npm install --save-dev typescript
// npm install axios
////////////////////////////////////////////////////
// 소셜 로그인 관련
// npm install next-auth
// npm install js-cookie
// npm install --save-dev @types/js-cookie
////////////////////////////////////////////////////
// 시작
// npm run dev
////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from "next/head";
import '../styles/globals.css';

import HomePage from "./Home/HomePage";
import Onboarding from './Onboarding/Onboarding'; 
import SignupPage from './Onboarding/Signup/SignupPage'; 
import Main from './Main/Main';
import Question from './Recommend/Question'; 
import Result from './Recommend/Result'; 
import Guide from './Guide/Guide';
import Culture from './Culture/Culture';
import MyPage from './MyPage/MyPage';
import Chatbot from './Chatbot/Chatbot';
import GuideDetailContent from './Guide/components/GuideDetailContent';
import Alarm from './Alarm/Alarm';

import Script from 'next/script';

// 전역 소셜로그인 상태 관리
import { SessionProvider } from "next-auth/react";

// Enum으로 추천 구역 Data 관리
import { StadiumType, SeatType, Keyword } from "../constants/ZoneData"

import { ZoneGetResponseType } from "../api/ResultApiType";

import { useStadiumSelector } from '@/src/hooks/useStadiumSelector';

export const metadata = {
  title: "도이 포트폴리오",
  description: "Generated by 도이",
  icons: {
    icon: "/tree.png",
  },
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  // 메인홈 스타디움 관리
  const {
    selectedStadium: selectedMainStadium,
    setSelectedStadium: setSelectedMainStadium
  } = useStadiumSelector();

  // 백엔드에 추천 질문 데이터 전송 후 반환받은 resultId 값 저장하는 변수/함수
  const [resultId, setResultId] = useState<number | null>(null);  //useState(0);  // 0 또는 -1로 초기화'
  
  // 선택된 스타디움의 추천된 존 관리
  const [recommendedZoneList, setRecommendedZoneList] = useState<ZoneGetResponseType[]>([]);

  // 현재 URL 경로 가져오기
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    // 클라이언트 측에서 경로 설정
    setCurrentPath(window.location.pathname);

    // Kakao SDK 초기화
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("d4d5e84e53ce18afa1d4f5ecbc14a552");
      console.log("Kakao SDK 초기화:", window.Kakao.isInitialized());
    }
  }, []);


  // 현재 경로에 따라 컴포넌트 선택
  const renderComponent = () => {
    switch (currentPath) {
        case '/login':
            return <Onboarding />;
        case '/onboarding':
            return <SignupPage />;
        case '/':
            return <HomePage />;
        case '/recommend/question':
            return <Question /*stadium={selectedMainStadium}*/ setResultId={setResultId} recommendedZoneList={recommendedZoneList} setRecommendedZoneList={setRecommendedZoneList}/>;
        case '/recommend/results':
            return <Result /*stadium={selectedMainStadium}*/ resultId={resultId} setResultId={setResultId} />;
        case '/guide':
            return <Guide/>
        case '/guide/zone':
            return <GuideDetailContent />
        case '/culture':
            return <Culture />;
        case '/mypage':
            return <MyPage />;
        case '/chatbot':
            return <Chatbot />;
        case '/alarm':
            return <Alarm />;
    }
  };
  
  return (
    <>
    <Head>
      <title>HitZone</title>
      <meta name="description" content="큐시즘 30th 밋업 A팀 히트존" />
      {/* 기본 Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* iOS 전용 홈 화면 아이콘 */}
      <link rel="apple-touch-icon" sizes="192x192" href="/android-icon-192x192.png" />

      {/* 메타 데이터 */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="A Progressive Web App" />
      
      {/* Microsoft Clarity 스크립트 */}
      <Script
        id="ms-clarity"
        strategy="afterInteractive" // 스크립트가 사용자 인터랙션 후 로드되도록 설정
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "p2zzif1xu0");`,
        }}
      />
    </Head>

      {/*<SessionProvider session={session}>*/}
      <div className="flex flex-col h-screen max-w-[500px] mx-auto ">
        {renderComponent()}
      </div>
      {/*</SessionProvider> */}

      <script src="https://developers.kakao.com/sdk/js/kakao.min.js" async></script>
    </>
  );
};

export default MyApp;
