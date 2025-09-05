감정 기반 차(Tea) 추천 및 기록 서비스 TeaBTI
Vite + React + Tailwind 기반으로, 감정을 바탕으로 차 추천 / 기록 / 마이페이지 기능을 제공합니다.

✨ 서비스 소개

온보딩 플로우: 로컬 저장소에 유저가 없으면 인트로(1.5초) → 홈 진입

홈: 추천 탭(RecommendTab), 기록 탭(RecordTab) 노출

기록: 작성/상세/목록 페이지

마이페이지: 이름/챌린지 달성율/내 정보/ 차 관련 가이드/기록 관리

추천: 기분 선택 등(MoodPick) 인터랙션

🧰 기술 스택

Framework: React 18, React Router v6

Build: Vite

UI: Tailwind CSS

Animation: Framer Motion

Lint/Format: ESLint, Prettier

State/Persist: React Hooks + localStorage

👥 팀원 소개
이름	역할	GitHub/연락처
문금미	기록페이지	rmaal520@gmail.com
문금미	FE	@your-id

팀원 표는 자유롭게 수정하세요.

🗂 폴더 구조
frontend/
├─ public/
│  ├─ img/
│  └─ svg/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ common/
│  │  ├─ home/
│  │  ├─ mypage/
│  │  │  └─ profile.jsx
│  │  └─ record/
│  ├─ constants/
│  ├─ data/
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ auth/        # Intro, Signup
│  │  ├─ home/
│  │  ├─ mypage/
│  │  ├─ recommend/   # MoodPick
│  │  └─ record/      # list/write/detail
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ eslint.config.js
├─ jsconfig.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ package.json
└─ README.md

🚀 실행 방법
요구 사항

Node.js 18+ (권장 18/20)

설치 & 로컬 실행
# 패키지 설치
npm install

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

🔑 라우팅 개요

/intro : 인트로(2초 후 /signup로 이동)

/signup : 이름/이메일 입력 → 제출 시 같은 페이지에서 “가입완료”(3초) → /

/ : 메인(Home). localStorage에 유저가 없으면 게이트에서 /intro로 리다이렉트

/record, /record/write, /record/detail

/recommend/moodpick, /mypage

게이트 키: user:profile

💾 데이터 모델(로컬)
// localStorage key: "user:profile"
{
  "id": "uuid",
  "name": "홍길동",
  "email": "hong@example.com",
  "photo": "data:... 또는 이미지 URL(없으면 null)",
  "achieved": 0
}

🧩 개발 메모

Tailwind 사용: index.css에 @tailwind base; @tailwind components; @tailwind utilities;

경로 별칭 @ 사용 시 vite.config.js / jsconfig.json의 alias 확인

선택적으로 framer-motion 사용 시 react 17+ 필요

📦 배포(옵션)

Vercel/Netlify 등 정적 호스팅에 npm run build 산출물(dist/) 업로드
