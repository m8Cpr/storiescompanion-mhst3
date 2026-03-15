import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/i18n/keys";

export default function MainLayout() {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <main className="mx-auto w-full min-h-dvh max-w-4xl px-4 py-6 space-y-4">
        <Outlet />
      </main>
      <footer className="w-full border-t text-center py-2 border-(--border)">
        {t(TRANSLATION_KEYS.COMMON.APP_FOOTER)}
      </footer>
    </>
  );
}
