import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import MonsterDetail from "@/pages/MonsterDetail";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/monster/:slug" element={<MonsterDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
