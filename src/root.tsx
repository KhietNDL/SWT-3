import { Outlet, ScrollRestoration } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
export default RootLayout;