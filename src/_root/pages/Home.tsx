import BannerCarousel from "@/components/shared/BannerCarousel";
import PostCard from "@/components/shared/PostCard";
import Lottie from "lottie-react";

import TailwindCard from "@/components/shared/TailwindCard";

import loadinghand from '../../animations/loadinghand.json'

import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  return (
    <TailwindCard className="container ">
      <div className="w-full container h-full">
        <BannerCarousel />
      </div>
      <div className="flex gap-4 mx-auto  pt-[2rem] container w-full">
        <div className="text-white flex flex-1 items-start  w-full ">
          <div className="flex flex-col  w-full">
            <h1 className="font-bold text-start">Latest Feeds</h1>
            {isPostLoading && !posts ? (
              <>
               <Lottie animationData={loadinghand}  />
              </>  
            ) : (
              <ul className="flex flex-col gap-8 w-full ">
                {posts?.documents.map((post: Models.Document) => (
                  <PostCard key={post.$id} post={post} />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* <div 
        className="hidden lg:flex w-1/3 mx-auto rounded-2xl mt-[5.5rem] max-h-[36rem] h-[22rem]">
        <SideCarouselWrapper>
          <SideCarousel />
          
        </SideCarouselWrapper>
        </div> */}
        
      </div>
    </TailwindCard>
  );
};

export default Home;
