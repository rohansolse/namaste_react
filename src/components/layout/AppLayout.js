import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="app-layout">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default AppLayout;
