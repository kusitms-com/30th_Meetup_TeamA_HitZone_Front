import { useEffect, useState } from 'react';
import InitPage from '@/src/pages/Onboarding/Login/InitPage'; // 온보딩 컴포넌트
import Main from '@/src/pages/Main/Main'; // 메인 컴포넌트

const HomePage = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  useEffect(() => {
    // localStorage에서 'hasCompletedOnboarding' 값을 확인
    const onboardingStatus = localStorage.getItem('hasCompletedOnboarding');
    
    // 온보딩을 완료한 상태라면 메인 컴포넌트만 보여줌
    if (onboardingStatus === 'true') {
      setHasCompletedOnboarding(true);
    }
  }, []);

  // 온보딩을 완료하면 localStorage에 상태 저장
  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setHasCompletedOnboarding(true); // 상태 업데이트
  };

  return (
    <div>
      {hasCompletedOnboarding ? (
        <Main /> // 온보딩을 완료했으면 메인 컴포넌트 표시
      ) : (
        <InitPage onComplete={handleOnboardingComplete} /> // 온보딩 컴포넌트 표시
      )}
    </div>
  );
};

export default HomePage;
