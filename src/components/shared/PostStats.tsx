import { useLikePost } from "@/lib/react-query/queriesAndMutations";
import {  Models } from "appwrite";
import { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";


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

    const { mutate:likePost} = useLikePost();

    const handleLikePost = () => {
        let likesArray = [...likes];

        if(likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        }else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
        likePost({postId:post.$id,likesArray})
        console.log(likesArray,'like array')
    }

    return (
    <>
          <div className="flex justify-between px-7 max-w-[30rem] text-sm">
            
            <div className="flex gap-4 w-full">
              <button onClick={handleLikePost}>
                {
                   checkIsLiked(likes,userId) ?  <FcLike /> : <FcLikePlaceholder />
                }
              </button>
              <p>{likes.length}</p>
            </div>
            
            
            <p>Comment</p>
            <h1>Save</h1>
          </div>
    </>
  )
}

export default PostStats;