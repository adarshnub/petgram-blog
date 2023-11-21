import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
    {
      isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
        <section
        className='flex flex-1 justify-center items-center flex-col'
        >
          <Outlet />
        </section>

        <img 
        src='/assets/cc2.png'
        alt='logo'
        className='hidden xl:block h-screen w-2/3 object-cover bg-no-repeat'
        />
        </>
      )
    }
    </>
  )
}

export default AuthLayout;