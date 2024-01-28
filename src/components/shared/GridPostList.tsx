import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite"
import { Link } from "react-router-dom";




type GridPostListProps = {
    posts: Models.Document[];
    showUser?:boolean;
    showStats?:boolean;
}
const GridPostList = ({posts ,showUser=true}:GridPostListProps) => {

    const { user } = useUserContext();

    console.log(posts.map((item) => item.creator.imageUrl),"user image")

  return (
    <ul className="flex flex-wrap gap-8 px-4 items-center justify-center md:justify-start">
        {
            posts.map((post) => (
                <li key={post.$id} className="relative min-w-80 h-80 rounded-[12px] border-4">
                    <Link to={`/posts/${post.$id}`}>
                        <img 
                          src={post.imageUrl}
                          alt="post"
                          className="w-full h-full  object-cover" />
                    </Link>

                    <div className="absolute bottom-0 left-0">
                        {
                            showUser && (
                                <div className="  w-full">
                                <div className="flex gap-2 md:gap-4 py-4 px-4 w-full ">
                                    <img 
                                    src={post.creator.imageUrl}
                                    alt="user image"
                                    className="w-8 h-8 rounded-full" />
                                    <p className="text-sm w-full">{post.creator.name}</p>
                                </div>
                                <div>
                                    <p className="px-4 pb-4 w-full font-bold">{post.caption}</p>
                                </div>
                                </div> 
                            )
                        }
                    </div>
                </li>
            ))
        }
    </ul>
  )
}

export default GridPostList