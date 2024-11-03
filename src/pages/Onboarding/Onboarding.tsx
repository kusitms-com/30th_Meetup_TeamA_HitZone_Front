import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import InitPage from "./components/InitPage"
import LoginPage from "./components/LoginPage"
import SignupPage1 from "./components/SignupPage1"
import SignupPage2 from "./components/SignupPage2"
import SignupPage3 from "./components/SignupPage3"

const Onboarding = () => {
    // 로딩 상태 관리
    const [loading, setLoading] = useState(true);
    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 처음/기존 사용자 상태 관리
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
    // useRouter 훅 사용
    const router = useRouter();

    // 회원가입 단계 상태 관리
    


    // 로딩 상태 시뮬레이션
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // 여기서 백엔드랑 API 통신하면서 로그인 상태와 최초 사용자 여부를 설정하기
            // 예를 들어:
            // setIsLoggedIn(true); // 로그인 상태 업데이트
            // setIsFirstTimeUser(false); // 기존 사용자로 업데이트

        }, 2000); // 2초 후 로딩 종료

        return () => clearTimeout(timer);
    }, []);

    // 로딩 상태시 렌더링
    if (loading) {
        return <InitPage />;
    }

    // 로그아웃 상태시 렌더링
    if (!isLoggedIn) {
        return <LoginPage />;
        //return <SignupPage3 userName={"서여니"} />
    }

    // 로그인 및 처음 사용자 상태시 렌더링
    if (isFirstTimeUser) {
        //return <SignupPage1 />
        // 경로가 다른 페이지이므로, 렌더링이 아닌 /signup 경로로 리디렉션
        router.push('/signup'); // 회원가입페이지로 이동
    }
    
    // 로그인 및 기존 사용자 상태시 렌더링하지 않고 / 경로로 리디렉션
    router.push('/'); // Main으로 이동
    return null; // 리디렉션 중일 때 아무것도 렌더링하지 않음
}

export default Onboarding