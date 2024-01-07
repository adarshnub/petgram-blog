
import "./globals.css";

import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import Home from "./_root/pages/Home";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import {  Toaster } from "@/components/ui/toaster";
import CreatePost from "./_root/pages/CreatePost";
import AllUsers from "./_root/pages/AllUsers";
import Saved from "./_root/pages/Saved";
import Explore from "./_root/pages/Explore";
import Profile from "./components/shared/Profile";
import Blog from "./_root/pages/Blog";
import EditPost from "./_root/pages/EditPost";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public rouutes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/blog' element={<Blog />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;





      
     
      
   