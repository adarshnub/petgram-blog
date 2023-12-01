import Footer from '@/components/shared/Footer';
import LeftSideBar from '@/components/shared/LeftSideBar';
import Navbar from '@/components/shared/Navbar';

import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='w-full md:flex bg-black text-white'>
      <Navbar />
      <LeftSideBar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

      <Footer />
    </div>
  )
}

export default RootLayout;