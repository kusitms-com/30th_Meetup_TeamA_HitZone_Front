// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";

import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";
import Cookies from "js-cookie";


export interface Props {
    previousStep: () => void;
    nextStep: () => void;
}

export const SignupPage = () => {
    // 닉네임 상태 관리
    const [nickname, setNickname] = useState('');

    // 페이지 상태 관리
    const [step, setStep] = useState(1);
    const router = useRouter();

    const previousStep = () => {
        // 이전 step 페이지로 이동
        if (step > 1) setStep(step - 1);
        // 초기 step 페이지에선 이전 경로로 이동
        else window.history.back();
    };

    const nextStep = async () => {
        // 다음 step 페이지로 이동
        if (step < 3) {
            setStep(step + 1);
        }else {
            // Promise<boolean>을 반환하는 비동기 함수
            const submit = await handleOnboardingSubmit();

            // 회원가입 성공 후 메인 페이지로 이동
            if(submit === true)
                router.push("/");
        }
    };


    // 회원가입 이벤트 (API로 정보 전송)
    // 신규 유저 온보딩 처리
    const handleOnboardingSubmit = async () => {
        // 쿠키에 저장된 토큰 가져오기
        const registerToken = Cookies.get("registerToken");
        if (!registerToken) return false;

        try {
            await fetch("https://localhost:5173/api/onboarding", {
            method: "POST",
            
            // 토큰
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${registerToken}`,
            },

            // 닉네임 전송
            body: JSON.stringify({ nickname }),
            });
            Cookies.remove("registerToken");
            router.push("/");

            return true;

        } catch (error) {
            console.error("Onboarding error:", error);
        }

        return false;
    };


    switch(step) {
        case 1:
            return <SignupPage1 previousStep={previousStep} nextStep={nextStep} nickname={nickname} setNickname={setNickname}/>;
        case 2:
            return <SignupPage2 previousStep={previousStep} nextStep={nextStep}/>;
        case 3:
            return <SignupPage3 previousStep={previousStep} nextStep={nextStep} nickname={nickname}/>;
        default:
            return null;
    }
    /*
    return (
        <div>
        {step === 1 && <div>Step 1: 기본 정보 입력</div>}
        {step === 2 && <div>Step 2: 추가 정보 입력</div>}
        {step === 3 && <div>Step 3: 약관 동의</div>}
        <button onClick={nextStep}>다음</button>
        </div>
    );
    */
};
