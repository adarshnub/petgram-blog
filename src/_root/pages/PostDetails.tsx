import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { convertCreatedAtToRelativeTime } from "@/components/shared/PostCard";
import { FaLocationDot } from "react-icons/fa6";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { data: post, isPending: isLoading } = useGetPostById(id);
  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost({ postId: id || "", imageId: post?.imageId || "" });
    navigate(-1);
  };
  return (
    <div className=" w-full">
      {/* <div>
        <Button 
          onClick={() => navigate(-1)}
          className="items-center flex gap-1 md:gap-2 mt-3 ">
          <IoIosArrowBack  />
          <p className="mb-[1px] hidden md:flex">Back</p>
        </Button>
      </div> */}

      {isLoading || !post ? (
        <div className="text-center flex items-center justify-center mt-16 w-full">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="relative rounded-b-[12px] md:rounded-[12px] md:mt-4 md:ml-4 ">
            <div className="absolute left-2 md:left-3">
              <Button
                onClick={() => navigate(-1)}
                className="items-center flex gap-1 md:gap-2 mt-3 bg-gray-500"
              >
                <IoIosArrowBack />
                <p className="mb-[1px] hidden md:flex">Back</p>
              </Button>
            </div>
            <img
              src={post?.imageUrl}
              className="rounded-b-[12px] object-cover h-80 xl:h-[480px] w-full md:w-[1000px] "
            />
          </div>

          <div className="container">
            <Link
              to={`/profile/${post?.creator.$id}`}
              className="flex items-center gap-3"
            >
              <img
                src={post?.creator.imageUrl}
                alt="creator"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
              />
              <div className="flex gap-1 flex-col mt-4">
                <p className="">{post?.creator.name}</p>
                <div className="flex flex-col gap-2 ">
                 
                  <div className="flex  items-center gap-2">
                    <FaLocationDot />
                    <p className="text-xs">{post?.location}</p>
                  </div>
                  <p className=" text-xs md:text-sm font-light">
                  posted &nbsp;{convertCreatedAtToRelativeTime(post?.$createdAt)}
                  </p>
                </div>
              </div>
            </Link>

            <div>
              <Button onClick={handleDeletePost}
                className={` ${user.id !== post?.creator.$id && "hidden"} `}>
                Delete  
              </Button> 
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default PostDetails;
