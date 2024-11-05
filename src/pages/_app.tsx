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
////////////////////////////////////////////////////
// 소셜 로그인 관련
// npm install next-auth
////////////////////////////////////////////////////
// 시작
// npm run dev
////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import Onboarding from './Onboarding/Onboarding'; 
import SignupPage from './Onboarding/Signup/SignupPage'; 
import Main from './Main/Main';
import Question from './Recommendation/Question'; 
import Result from './Recommendation/Result'; 
import Guide from './Guide/Guide';
import Culture from './Culture/Culture';
import MyPage from './MyPage/MyPage';
import QA from "./Main/QA"
import Dialog1 from "../components/dialogs/AlarmQuestionDialog"
import Dialog3 from "../components/dialogs/ChooseBaseballTeamDialog"
import Dialog4 from "../components/dialogs/SeatTipDialog"

// 전역 소셜로그인 상태 관리
import { SessionProvider } from "next-auth/react";


const MyApp: React.FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  // 현재 URL 경로 가져오기
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    // 클라이언트 측에서 경로 설정
    setCurrentPath(window.location.pathname);
  }, []);


  // 현재 경로에 따라 컴포넌트 선택
  const renderComponent = () => {
    switch (currentPath) {
        case '/login':
            return <Onboarding />;
        case '/signup':
            return <SignupPage />;
        case '/':
            return <QA />;
        case '/main':
            return <Main />;
        case '/recommend/question':
            return <Question />;
        case '/recommend/results':
            return <Result />;
        case '/guide':
            return <Guide />;
        case '/culture':
            return <Culture />;
        case '/mypage':
            return <MyPage />;
        case '/dialog1':
            return <Dialog1/>;
        case '/dialog3':
            return <Dialog3/>;
        case '/dialog4':
            return <Dialog4/>;
    }
  };
  
  return (
    <SessionProvider session={session}>
      <div className="items-center p-4 w-full max-w-[500px] mx-auto">
          {renderComponent()}
      </div>
    </SessionProvider>
  );
};

export default MyApp;
