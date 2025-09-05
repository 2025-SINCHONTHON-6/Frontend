import "./index.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import Home from "./pages/home/home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* 페이지들 */}
      </Route>
    </Routes>
  );
}

export default App;
