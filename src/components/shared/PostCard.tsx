
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { BiSolidEdit } from "react-icons/bi";

import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const {user} = useUserContext();

  if(!post.creator) return;

  return (
    <div className="bg-gray-800  shadow-2xl rounded-lg py-4 max-w-[30rem] md:h-[38rem]">
      <div className="flex flex-col gap-8">
        
            {/* <div className="absolute top-0 w-full  bg-red-400"></div> */}
            <div className="flex justify-between px-2">
          <Link
            to={`/profile/${post.creator.$id}`}
            className=" shadow-xl w-full flex gap-4 py-2 px-2 items-center "
          >
            <img
              className="rounded-full w-8 h-8 "
              src={post?.creator?.imageUrl}
            />
            <div className="flex flex-col text-start">
              <h3 className="text-gray-300 text-[12px]">{post?.creator?.name}</h3>
              {/* <p className="text-gray-400 text-[10px]">{post?.creator.username}</p> */}
              <p className="text-gray-400 text-[10px]">{post?.location}</p>
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
            <div className="flex w-full px-2 pt-2">
            <h3 className="text-gray-300 text-sm font-semibold">{post?.creator?.name}</h3> 
            <p className="text-start text-sm font-light px-2">{post?.caption}</p>
            </div>
          </div>
          <div className="flex justify-between md:px-7  text-sm">
        
        <PostStats post={post} userId={user.id} />
          </div>
      </div>
    </div>
  );
};

export default PostCard;
