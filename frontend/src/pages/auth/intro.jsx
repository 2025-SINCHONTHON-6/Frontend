import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const nav = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('intro:seen', '1');

    const t = setTimeout(() => nav('/', { replace: true }), 1500);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="flex h-[100dvh] w-screen justify-center items-center bg-black">
      <div className="relative flex h-full w-full max-w-[390px] flex-col justify-center items-center bg-white overflow-hidden">
        <p className="text-[20px] text-[#686868] text-center">
          오늘, 내 기분을 닮은 차 한 모금
        </p>
        <img src="/svg/logo.svg" alt="logo" className="w-[279px] mb-5" />
        <img src="/svg/introLogo.svg" alt="introLogo" />
      </div>
    </div>
  );
}
