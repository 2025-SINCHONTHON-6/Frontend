import "./index.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/home/home";
import Record from "./pages/record/record";
import RecordDetail from "./pages/record/recordDetail";
import RecordWrite from "./pages/record/recordWrite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/record/write" element={<RecordWrite/>} />
        <Route path="/record/detail" element={<RecordDetail/>} />
        {/* 페이지들 */}
      </Route>
    </Routes>
  );
}

export default App;
