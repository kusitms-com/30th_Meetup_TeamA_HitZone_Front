import { useEffect, useState } from 'react';
import InitPage from '@/src/pages/Onboarding/Login/InitPage'; // 온보딩 컴포넌트
import SignupPage3 from "@/src/pages/Onboarding/Signup/SignupPage3";
import Main from '@/src/pages/Main/Main'; // 메인 컴포넌트

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState<'init' | 'signup' | 'main'>('init'); // 현재 페이지 상태
  
    useEffect(() => {
        // 1.5초 후 InitPage에서 SignupPage3로 전환
        if (currentPage === 'init') {
          const initTimer = setTimeout(() => {
            setCurrentPage('signup'); // InitPage 후 SignupPage3로 전환
          }, 1500); // 1.5초 대기
    
          return () => clearTimeout(initTimer); // 타이머 정리
        }

        if (currentPage === 'signup') {
          return () => clearTimeout(signupTimer); // 타이머 정리
        }
        
    }, [currentPage]); // currentPage가 변경될 때마다 useEffect 실행
    

    return (
        <div>
            {/* InitPage 표시 */}
            {currentPage === 'init' && <InitPage onComplete={() => setCurrentPage('signup')} />} 

            {/* SignupPage3 표시 */}
            {currentPage === 'signup' && <SignupPage3 />} 

            {/* Main 표시 */}
            {currentPage === 'main' && <Main />}
        </div>
    );
};

export default HomePage;
