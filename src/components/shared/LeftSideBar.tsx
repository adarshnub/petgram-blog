import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom'

const LeftSideBar = () => {
  const {mutate: signOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(() => {
      if(isSuccess) navigate("/sign-in")
  },[isSuccess])

  return (
    <nav className='leftsidebar  hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-gray-900'>
      <div className='flex flex-col gap-11'>
      <Link to="/" className="">
                <span 
                className="text-lg font-[900] text-violet-400"
                >PET VERSE</span>
                {/* <img 
                className="rounded-full w-20"
                src="/assets/cat3.png"
                alt="logo"
                
                 /> */}
            </Link>

            <Link to={`/profile/${user.id}`}
            className='flex items-center gap-4'>
              <img 
              src={user.imageUrl}
              className="h-10  rounded-full"
              alt='profile' />
              <div className='flex flex-col'>
                <p className='font-bold text-md'>{user.name}</p>
                <p className='font-[100] text-sm'>@{user.username}</p>
              </div>
            </Link>
      </div>
    </nav>
  )
}

export default LeftSideBar