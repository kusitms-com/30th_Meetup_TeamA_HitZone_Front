// npm install react react-dom
// npm install --save-dev @types/react @types/react-dom
// npm install next
// npm install next@latest typescript@latest @types/react@latest @types/react-dom@latest
// npm install --save-dev @types/react @types/node
// npm install --save-dev typescript
// 시작: npm run dev
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // global.css를 임포트합니다.

import Main from './Main/Main';
import Onboarding from './Onboarding/Onboarding'; 

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // 현재 URL 경로 가져오기
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    // 클라이언트 측에서 경로 설정
    setCurrentPath(window.location.pathname);
  }, []);


  // 현재 경로에 따라 컴포넌트 선택
  const renderComponent = () => {
    switch (currentPath) {
        case '/':
            return <Onboarding />;
        case '/main':
            return <Main />;
    }
  };
  
  return (
    <div className="items-center w-full max-w-[500px] mx-auto">
        {renderComponent()}
    </div>
  );
};

export default MyApp;
