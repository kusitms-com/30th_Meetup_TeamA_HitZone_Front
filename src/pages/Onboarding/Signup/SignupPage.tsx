// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";

import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else router.push("/"); // 회원가입 완료 후 메인 페이지로 이동
  };


  switch(step) {
    case 1:
        return <SignupPage1/>;
    case 2:
        return <SignupPage2/>;
    default:
        return <SignupPage3 userName="서여니"/>;

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

export default SignupPage;
