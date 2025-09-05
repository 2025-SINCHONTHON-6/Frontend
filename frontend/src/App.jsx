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

function App() {
  return (
    <Routes>
    
      <Route path="/intro" element={<Intro />} />
      <Route path="/signup" element={<Signup />} />

     
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="record" element={<Record />} />
        <Route path="record/write" element={<RecordWrite />} />
        <Route path="record/detail" element={<RecordDetail />} />
        <Route path="recommend/moodpick" element={<MoodPick />} />
        <Route path="recommend/result" element={<RecommendationResult />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>

    
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
