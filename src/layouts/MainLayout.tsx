import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header>Header</header>
      <main className="mx-auto w-full min-h-dvh max-w-4xl px-4 py-6 space-y-4">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
