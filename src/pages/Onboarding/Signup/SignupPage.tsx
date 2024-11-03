// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";

import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";


export interface Props {
    nextStep: () => void;
}

export const SignupPage = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => {
    // 다음 페이지로 이동
    if (step < 3) setStep(step + 1);
    // 회원가입 완료 후 메인 페이지로 이동
    else router.push("/");
  };


  switch(step) {
    case 1:
        return <SignupPage1 nextStep={nextStep}/>;
    case 2:
        return <SignupPage2 nextStep={nextStep}/>;
    case 3:
        return <SignupPage3 userName="서여니" nextStep={nextStep}/>;
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
