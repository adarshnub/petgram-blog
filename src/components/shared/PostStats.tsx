import { useLikePost } from "@/lib/react-query/queriesAndMutations";
import {  Models } from "appwrite";
import { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsSaveFill, BsSave } from "react-icons/bs";
import Heart from "react-animated-heart";


type PostStatProps = {
    post: Models.Document,
    userId: string
}

export const checkIsLiked = (likeList:string[],userId:string) => {
    return likeList.includes(userId)
}

const PostStats = ({post,userId}:PostStatProps) => {

    const likesList = post.likes.map((user: Models.Document) => user.$id);
    const [likes,setLikes] = useState<string[]>(likesList);
    const [isliked, setIsLiked] = useState(false);

    const { mutate:likePost} = useLikePost();

    const handleLikePost = () => {
        let likesArray = [...likes];

        if(likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        }else {
            likesArray.push(userId);
        }

       if( checkIsLiked(likes,userId)){
        setIsLiked(false)
        
       }
        setLikes(likesArray);
        likePost({postId:post.$id,likesArray})
        console.log(likesArray,'like array')
    }

    return (
    
          <div className="relative flex justify-between px-7 w-full max-w-[30rem] text-sm">
             <div className=" absolute bottom-7 left-0">
               <Heart isClick={isliked} onClick={() => { setIsLiked(!isliked);handleLikePost(); }}  />
               </div>
            <div className=" flex gap-4 items-center pl-4">
          
              <button onClick={handleLikePost}>
                {
                   checkIsLiked(likes,userId) ?  <FcLike /> : <FcLikePlaceholder />
                }
           
              </button>
             {/* <div className=" absolute bottom-[] left-0">
               <Heart isClick={isliked} onClick={() => { setIsLiked(!isliked);handleLikePost(); }}  />
               </div> */}
              <p>{ likes.length > 1 && likes.length } likes </p>
            </div>
            
            
            <div><FaRegCommentAlt /> </div>
            <div>
             { <BsSaveFill /> ||  <BsSave />  }
            </div>
          </div>
    
  )
}

export default PostStats;