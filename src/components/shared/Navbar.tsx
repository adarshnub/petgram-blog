import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Navbar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();
    const {user} = useUserContext();

    useEffect(() => {
        if(isSuccess) navigate("/sign-in")
    },[isSuccess])

  return (
    <section className='sticky top-0 md:hidden bg-black w-full shadow-xl'>
        <div className="flex justify-between px-5 py-4">
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
            <div className="flex gap-4 items-center">
                <Button variant="ghost" className='shad-button_ghost'
                onClick={()=> signOut()}>
                    <IoIosLogOut className="font-extrabold" />
                </Button>
                <Link to={`/profile/${user.id}`}>
                    <img 
                    src={user.imageUrl} 
                    alt="profile"
                    className="h-8 w-8 rounded-full" />
                </Link>
                
            </div>
        </div>
    </section>
  )
}

export default Navbar