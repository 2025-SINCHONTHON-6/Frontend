import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    nav("/", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <input type="email" required className="w-full border rounded px-3 py-2" placeholder="이메일" />
      <input type="password" required minLength={8} className="w-full border rounded px-3 py-2" placeholder="비밀번호(8자 이상)" />
      <button type="submit" className="w-full h-11 rounded-xl bg-main-300 text-white font-semibold">
        가입하기
      </button>
    </form>
  );
}
