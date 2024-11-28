import { useEffect, useState } from 'react';
import InitPage from '@/src/pages/Onboarding/Login/InitPage'; // 온보딩 컴포넌트
import SignupPage3 from "@/src/pages/Onboarding/Signup/SignupPage3";
import CoachMark from "@/src/pages/Main/components/CoachMark";
import Main from '@/src/pages/Main/Main'; // 메인 컴포넌트

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState<'init' | 'signup' | 'onboarding' | 'coachmark' | 'main'>('init'); // 페이지 상태
    
    useEffect(() => {
        // 초기 페이지
        if (currentPage === 'init') {
            // 1.5초 후 InitPage에서 SignupPage3로 전환
            const initTimer = setTimeout(() => {
                setCurrentPage('onboarding');
            }, 1500);
            
            // 타이머 초기화
            return () => clearTimeout(initTimer);
        }

    }, [currentPage]); // currentPage가 변경될 때마다 useEffect 실행
    

    return (
        <div>
            {/* 초기 페이지 */}
            {currentPage === 'init' && <InitPage onComplete={() => setCurrentPage('signup')} />} 

            {/* 온보딩 페이지 */}
            {currentPage === 'onboarding' && <SignupPage3 />} 

            {/* 코치마크 페이지 */}
            {currentPage === 'main' && <CoachMark />}

            {/* 메인 페이지 */}
            {currentPage === 'main' && <Main />}
        </div>
    );
};

export default HomePage;
