import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import Home from './pages/home/home';
import Record from './pages/record/record';
import RecordDetail from './pages/record/recordDetail';
import RecordWrite from './pages/record/recordWrite';
import MoodPick from './pages/recommend/moodPick';
import RecommendationResult from './pages/recommend/recommendResult';
import Mypage from './pages/mypage/mypage';

import Intro from './pages/auth/intro';
import Signup from './pages/auth/signup';

const STORAGE_KEY = 'user:profile';

function RootGate() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {}
  return user ? <Home /> : <Navigate to="/intro" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/intro" element={<Intro />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="/recommend/result" element={<RecommendationResult />} />
        {/* 페이지들 */}
        <Route index element={<RootGate />} />
        <Route path="record" element={<Record />} />
        <Route path="record/write" element={<RecordWrite />} />
        <Route path="record/detail" element={<RecordDetail />} />
        <Route path="recommend/moodpick" element={<MoodPick />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
    </Routes>
  );
}
export default App;
