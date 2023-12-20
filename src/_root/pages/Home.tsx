import PostCard from "@/components/shared/PostCard";
import TailwindCard from "@/components/shared/TailwindCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";


const Home = () => {
  

  const { data:posts, isPending:isPostLoading, isError:isErrorPosts} = useGetRecentPosts();


  return (
    <TailwindCard>
    <div className='text-white flex flex-1 container w-full mx-auto'>
      <div className="flex flex-col  w-full">
        <h1 className="font-bold text-start">Latest Feeds</h1>
        {
          isPostLoading && !posts ? 
          "Loading..." :
          <ul className="flex flex-col gap-8 w-full justify-center items-center">
            {
              posts?.documents.map((post:Models.Document) => (
                <PostCard post={post} />
              ))
            }
          </ul>
        }
      </div>
    </div>
    </TailwindCard>
  )
}

export default Home;