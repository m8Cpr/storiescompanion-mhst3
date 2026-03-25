import Header from "@/components/Header";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <main
        id="main"
        className="relative flex-1 mx-auto w-full max-w-4xl px-4 py-6 flex flex-col gap-6 lg:gap-12"
      >
        <Outlet />
      </main>
      <footer className="w-full border-t flex items-center text-center gap-2 flex-col py-2 border-(--border)">
        <p className="text-sm">{t(TRANSLATION_KEYS.COMMON.APP_FOOTER)}</p>
        <p className="text-xs">{t(TRANSLATION_KEYS.COMMON.DISCLAIMER)}</p>
        <p className="text-xs text-muted-foreground">
          v{__APP_VERSION__}
          {__GIT_BRANCH__ !== "main" && (
            <>
              <br />
              {`${__GIT_BRANCH__} · ${__GIT_COMMIT__} · ${__GIT_HASH__}`}
            </>
          )}
        </p>
      </footer>
    </>
  );
}
