import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { BiSolidEdit } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import PostStats from "./PostStats";

import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";

//shadcn -comment
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  // console.log(user, 'user Data')

  if (!post.creator) return;

  return (
    <div className="bg-gray-800  shadow-2xl rounded-lg py-4 max-w-[30rem] container ">
      <div className="flex flex-col gap-2">
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
              <h3 className="text-gray-300 text-[12px]">
                {post?.creator?.name}
              </h3>
              {/* <p className="text-gray-400 text-[10px]">{post?.creator.username}</p> */}
              <p className="text-gray-400 text-[10px]">{post?.location}</p>
            </div>
          </Link>
          <Link
            to={`/update-post/${post.$id}`}
            className={` ${user.id !== post.creator.$id && "hidden"}`}
          >
            <BiSolidEdit className="h-full mr-2" />
          </Link>
        </div>

        <div>
          <img src={post.imageUrl} className="w-[40rem] max-h-[25rem]" />
        </div>
        <div className="flex justify-between md:px-7 pt-2 text-sm">
          <PostStats post={post} userId={user.id} />
        </div>
        <div className="flex w-full px-2 ">
          <h3 className="text-gray-300 text-sm font-semibold">
            {post?.creator?.username}
          </h3>
          <p className="text-start text-sm font-light px-2">{post?.caption}</p>
        </div>
        <div className="text-gray-400 text-sm text-start pl-2 ">
          {/* <p className="text-[13px] font-normal">View all comments</p> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>View all comments</AccordionTrigger>
              <AccordionContent>
                Nice bike
              </AccordionContent>
              <AccordionContent>
                Nice car
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-4 pt-1">
            <img
              src={user.imageUrl}
              alt="current user"
              className="rounded-full w-8"
            />
            <input
              placeholder="Add a comment..."
              className="bg-gray-800 text-[13px] border rounded-full px-4 w-full"
            />
            <button>
              <BsFillSendFill />
            </button>
          </div>
          <p className="pt-2">
            {convertCreatedAtToRelativeTime(post?.$createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

export const convertCreatedAtToRelativeTime = (createdAt: string): string => {
  const parsedDate = parseISO(createdAt);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

// const createdAt = '2023-12-22T11:03:49.768+00:00';
// const relativeTime = convertCreatedAtToRelativeTime(createdAt);

// console.log(relativeTime,'time');
