// src/pages/MyPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getMemberById } from "../../data/users";

export default function MyPage({ userId }) {
  const base = useMemo(() => getMemberById(userId), [userId]);

  const storageKey = `user:${base.id}`;
  const [profile, setProfile] = useState(base);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setProfile(JSON.parse(saved));
  }, [storageKey]);

  const [form, setForm] = useState({
    name: base.name,
    email: base.email,
    photo: base.photo,
  });

  useEffect(() => {
    setForm({ name: profile.name, email: profile.email, photo: profile.photo });
  }, [profile]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    const next = { ...profile, ...form };
    setProfile(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setEditing(false);
  };

  const cancel = () => {
    setForm({ name: profile.name, email: profile.email, photo: profile.photo });
    setEditing(false);
  };

  return (
    <div className="max-w-[420px] mx-auto px-4 pt-5 pb-16 font-sans">
    
      <div className="grid grid-cols-[1fr_96px] items-center gap-3 rounded-2xl p-4 shadow-md"
           style={{ backgroundColor: "#E5FCD6" }}>
        <div>
          <p className="font-bold text-[18px] mb-2">{profile.name}</p>
          <span className="inline-block px-3 py-1.5 bg-white border border-black/20 rounded-full text-xs">
            챌린지 {profile.achieved}개 달성
          </span>
        </div>
        <img
          className="w-24 h-24 rounded-2xl object-cover bg-neutral-300"
          src={profile.photo}
          alt={`${profile.name} 프로필`}
        />
      </div>

      {/* 회원정보 수정 섹션 */}
      <h3 className="mt-6 mb-2 ml-1 font-bold text-[18px]">회원정보수정</h3>

      {!editing ? (
        <>
          <div className="space-y-1 mb-4 ml-1 text-sm leading-relaxed">
            <span className="block text-neutral-600 text-xs">이름</span>
            <div>{profile.name}</div>
          </div>
          <div className="space-y-1 mb-2 ml-1 text-sm leading-relaxed">
            <span className="block text-neutral-600 text-xs">이메일</span>
            <div>{profile.email}</div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-neutral-900 text-white px-3 py-2 text-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/30"
              onClick={() => setEditing(true)}
            >
              정보 수정
            </button>
            <button
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              onClick={() => {
                localStorage.removeItem(storageKey);
                setProfile(base);
              }}
            >
              기본값으로 되돌리기
            </button>
          </div>
        </>
      ) : (
        <div className="grid gap-3 mt-2">
          <label>
            <div className="text-neutral-600 text-xs mb-1">이름</div>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-300"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="이름"
            />
          </label>

          <label>
            <div className="text-neutral-600 text-xs mb-1">이메일</div>
            <input
              type="email"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-300"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="email@example.com"
            />
          </label>

          <label>
            <div className="text-neutral-600 text-xs mb-1">프로필 사진</div>
            <input
              type="file"
              accept="image/*"
              onChange={onPickFile}
              className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:text-white file:px-3 file:py-2 file:hover:bg-neutral-800 file:transition"
            />
            <div className="text-xs text-neutral-500 mt-1">
              * 파일을 선택하거나 아래에 이미지 URL을 직접 넣을 수 있어요.
            </div>
            <input
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-300"
              name="photo"
              value={form.photo}
              onChange={onChange}
              placeholder="https://… 이미지 주소"
            />
          </label>

          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-neutral-900 text-white px-3 py-2 text-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/30"
              onClick={save}
            >
              저장
            </button>
            <button
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              onClick={cancel}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
