import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/i18n/keys";

export default function MainLayout() {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-6 flex flex-col gap-6 lg:gap-12">
        <Outlet />
      </main>
      <footer className="w-full border-t flex items-center text-center gap-2 flex-col py-2 border-(--border)">
        <p className="text-sm">{t(TRANSLATION_KEYS.COMMON.APP_FOOTER)}</p>
        <p className="text-xs">{t(TRANSLATION_KEYS.COMMON.DISCLAIMER)}</p>
      </footer>
    </>
  );
}
