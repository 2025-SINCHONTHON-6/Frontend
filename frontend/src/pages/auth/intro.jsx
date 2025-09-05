import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const nav = useNavigate();

  useEffect(() => {
    
    const saved = localStorage.getItem("user:profile");
    if (saved) return nav("/", { replace: true });

    const t = setTimeout(() => nav("/signup", { replace: true }), 2000);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="h-screen max-w-[390px] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-6">
        <img src="/svg/logo.svg" alt="logo" />
        <img src="/svg/introLogo.svg" alt="introLogo" />
      </div>
    </div>
  );
}
