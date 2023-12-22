
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { BiSolidEdit } from "react-icons/bi";

import { Link } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const {user} = useUserContext();

  if(!post.creator) return;

  return (
    <div className="bg-gray-800  shadow-2xl rounded-lg py-4 max-w-[30rem] h-[38rem]">
      <div className="flex flex-col gap-8">
        
            {/* <div className="absolute top-0 w-full  bg-red-400"></div> */}
            <div className="flex justify-between px-2">
          <Link
            to={`/profile/${post.creator.$id}`}
            className=" shadow-xl w-full flex gap-4 py-2 px-2 items-center  h-[4rem]"
          >
            <img
              className="rounded-full w-12 h-12 "
              src={post?.creator?.imageUrl}
            />
            <div className="flex flex-col ">
              <h3 className="text-gray-300 text-[18px]">{post?.creator?.name}</h3>
              <p className="text-gray-400 text-[14px]">{post?.creator.username}</p>
            </div>
          </Link>
          <Link to={`/update-post/${post.$id}`}
          className={` ${user.id !== post.creator.$id && "hidden"}`}>

            <BiSolidEdit className="h-full mr-2" />
          </Link>
          </div>
          
          <div>
            <img src={post.imageUrl} 
            className="w-[40rem] max-h-[25rem]"/>
            <h2 className="text-start text-lg px-7">{post?.caption}</h2>
          </div>
          <div className="flex justify-between px-7 max-w-[30rem] text-sm">
            <h1>Like</h1>
            <p>Comment</p>
            <h1>Save</h1>
          </div>
        
      </div>
    </div>
  );
};

export default PostCard;
