import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard"); 

  return (
    <div>
      {!isDashboard && <NavBar />} 
      <div className="min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-140px)]">
        <Outlet />
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default MainLayout;

