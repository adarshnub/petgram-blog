import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { IoIosLogOut } from "react-icons/io";
import { HiMiniHome } from "react-icons/hi2";
import { MdExplore,MdCreateNewFolder } from "react-icons/md";

import { BsPeopleFill,BsSaveFill } from "react-icons/bs";

const LeftSideBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const {pathname} = useLocation()
  // const [isActive,setIsActive] =useState(false)

  useEffect(() => {
    if (isSuccess) navigate("/sign-in");
  }, [isSuccess]);

  return (
    <nav className="fixed  hidden md:flex   px-6 py-10 flex-col  min-w-[270px] bg-gray-900 h-screen">
      <div className=" flex flex-col gap-11 h-full w-full">
        <Link to="/" className="">
          <span className="text-lg font-[900] text-violet-400">PET VERSE</span>
          {/* <img 
                className="rounded-full w-20"
                src="/assets/cat3.png"
                alt="logo"
                
                 /> */}
        </Link>

         
                 
        <Link to={`/profile/${user.id}`} className="flex items-center gap-6 justify-center">
          <img
            src={user.imageUrl}
            className="h-10  rounded-full"
            alt="profile"
          />
          <div className="flex flex-col">
            <p className="font-bold text-md">{user.name}</p>
            <p className="font-[100] text-sm">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-8 h-full">
          <li className={`flex gap-8 pl-8 w-full items-center  hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-md py-2 text-center ${pathname === '/' && 'bg-violet-300 text-gray-800'} `}>
          <HiMiniHome />
            <NavLink className='' to="/">Home</NavLink>
          </li>
          <li className={`pl-8 flex gap-8 w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-md py-2 text-center ${pathname === '/create-post' && 'bg-violet-300 text-gray-800'} `}>
          <MdCreateNewFolder />
            <NavLink className='' to="/create-post">Create Post</NavLink>
          </li>
          <li className={`pl-8 flex gap-8 w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-md py-2 text-center ${pathname === '/explore' && 'bg-violet-300 text-gray-800'} `}>
          <MdExplore />
            <NavLink className='' to="/explore">Explore</NavLink>
          </li>
          <li className={`pl-8 flex gap-8 w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-md py-2 text-center ${pathname === '/all-users' && 'bg-violet-300 text-gray-800'} `}>
          <BsPeopleFill />
            <NavLink className='' to="/all-users">People</NavLink>
          </li>
          <li className={`pl-8 flex gap-8 w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-md py-2 text-center ${pathname === '/saved' && 'bg-violet-300 text-gray-800'} `}>
          <BsSaveFill />
            <NavLink className='' to="/saved">Saved</NavLink>
          </li>
          <li className={`pl-8 flex gap-8 w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-md py-2 text-center ${pathname === '/create-post' && 'bg-violet-300 text-gray-800'} `}>
          <MdCreateNewFolder />
            <NavLink className='' to="/blog">Blog</NavLink>
          </li>
        </ul>

        <Button
          variant="ghost"
          className="flex gap-4 items-center  bottom-0 w-full"
          onClick={() => signOut()}>
          <IoIosLogOut className="font-extrabold" />
          <span>Logout</span>
        </Button>
        
      </div>
    </nav>
  );
};

export default LeftSideBar;
