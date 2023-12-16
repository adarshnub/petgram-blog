import Footer from "@/components/shared/Footer";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex flex-1  text-white h-screen">
      <Navbar />
      <LeftSideBar />
      <section className="flex flex-1 h-screen ">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default RootLayout;
