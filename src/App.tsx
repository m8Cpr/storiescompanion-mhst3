import { BrowserRouter, Route, Routes } from "react-router-dom";

import useScrollOnNavigation from "@/hooks/useScrollOnNavigation";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import MonsterDetail from "@/pages/MonsterDetail";
import NotFound from "@/pages/NotFound";

function AppRoutes() {
  useScrollOnNavigation();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/monster/:slug" element={<MonsterDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
