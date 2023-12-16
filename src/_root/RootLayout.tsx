import Footer from "@/components/shared/Footer";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className=" md:flex w-full  text-white ">
      <Navbar />
      <div className="flex flex-1">

      <LeftSideBar />
      <section className="flex flex-1 h-screen w-full text-white md:pl-[270px]">
        <Outlet />
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
