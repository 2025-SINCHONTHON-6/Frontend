import "./index.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import Test from "@/pages/test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Test />} />
        {/* 페이지들 */}
      </Route>
    </Routes>
  );
}

export default App;
