<p align="center"> </p> 
<h1 align="center"> 🍵 TeaBTI – 오늘, 내 기분을 닮은 차 한 모금 <br /> <sub>Frontend</sub> </h1> 
<h3 align="center">React (JSX) + TailwindCSS 기반 감정 맞춤 차 추천 · 기록 서비스</h3>
<p align="center"> 
 
<p align="center"> <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000&style=for-the-badge"/> <img src="https://img.shields.io/badge/Vite-^5-646CFF?logo=vite&logoColor=fff&style=for-the-badge"/> <img src="https://img.shields.io/badge/TailwindCSS-^3-06B6D4?logo=tailwindcss&logoColor=fff&style=for-the-badge"/> <img src="https://img.shields.io/badge/React%20Router-v6-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge"/> <img src="https://img.shields.io/badge/Framer%20Motion-Animation-000?logo=framer&logoColor=fff&style=for-the-badge"/> </p>


## 📖 프로젝트 개요

**TeaBTI**는 차에 입문하는 사람들이 ‘오늘의 기분’에 맞춰 차를 탐색하고 즐길 수 있도록 설계된 모바일 웹 서비스입니다. 감정 기반 추천, 간편 기록, 단계별 챌린지를 통해 취향을 발견하고 일상을 지속 가능한 티 루틴을 만들어드립니다.

### 🎯 프로젝트 목표

- 감정 기반 맞춤 추천으로 자연스러운 차 입문을 돕습니다.
- 간편한 기록·리뷰 기능으로 사용 경험을 꾸준히 이어갑니다.
- 챌린지·루틴을 통해 참여를 유지하고 습관 형성을 유도합니다.

---


## 🌟 주요 기능

### 🏠 메인 페이지

- **감정 기반 차 추천탭**: 오늘의 감정 맞춤 차 추천 페이지 이동 버튼 구현
- **이전 기록 요약 UI**: 감정 맞춤 차 추천 기록을 날짜와 함께 요약한 탭

### 🧾기록 페이지

- **감정과 날짜 요약 UI**: 이전에 추천받았던 기록을 감정의 색과 날짜로 요약
- **기록 상세 페이지**: 기록 요약 UI 클릭 시 그날에 추천받았던 차와 감정 및 기록 열람 가능, 추천 받은 차에 대한 기록 설정 가능
- **나의 차 챌린지**: 챌린지 달성 여부 파악

### 👍추천 페이지

- **감정 선택 UI**: 감정을 6가지로 구분하여 그날의 감정 선택 유도
- **개인 맞춤 차 선호도 조사**: 차 관련 카테고리 선택을 통한 선호도 조사
- **감정 맞춤 차 추천 탭**: 차 이미지와 이름, 향, 설명 제공 -> 마셔볼래요 선택시 기록 연결



## 🛠️ 기술 스택

### Frontend

- **React 18(jsx)**: React 기능 활용
- **TailwindCSS**: 유틸리티 퍼스트 CSS 프레임워크
- **react-router-dom v6**:동적 라우팅 & 가드

### UI/UX

- **Framer Motion**: 애니메이션 라이브러리

### 개발 도구

- **Prettier**: 코드 품질 관리

## 🚀 시작하기
요구 사항

Node.js 18+ / 20+

npm / yarn / pnpm 중 택 1

설치 & 실행
### 의존성 설치
npm install

### 개발 서버
npm run dev

### 프로덕션 빌드
npm run build

### 빌드 미리보기
npm run preview

## 🏗️ 프로젝트 구조

```
src/
├─ layouts/
│  └─ mainLayout.jsx
├─ pages/
│  ├─ auth/
│  │  └─ intro.jsx
│  ├─ home/
│  │  └─ home.jsx
│  ├─ record/
│  │  ├─ record.jsx
│  │  ├─ recordWrite.jsx
│  │  └─ recordDetail.jsx
│  ├─ recommend/
│  │  ├─ moodPick.jsx
│  │  └─ recommendResult.jsx
│  └─ mypage/
│     └─ mypage.jsx
├─ components/
│  └─ home/
│     ├─ recommendTab.jsx
│     └─ recordTab.jsx
├─ assets/ (svg, images)
└─ index.css
```

---



🎨 UI 가이드 (Tailwind)

모바일 기준 레이아웃: max-w-[390px] 컨테이너, 세로 스크롤

재사용 패턴: 카드(rounded-[30px]), 버튼(rounded-[20px], 고대비 텍스트)

접근성: 링크를 버튼처럼 보일 때는 Link/NavLink에 클래스 부여 (버튼 요소 안에 링크 중첩 지양)

---

## 👥 개발 팀

### 📋 PM & 디자인

- **강채원** (홍익대학교)

### 💻 프론트엔드

- **문금미** (서강대학교)
- **안준석** (홍익대학교)
- **이지호** (연세대학교)

### 🔧 백엔드

- **고선태** (연세대학교)
- **설영은** (이화여자대학교)
- **황규리** (이화여자대학교)

---
## 🚀 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```


