import GridPostList from "@/components/shared/GridPostList";
import { Input } from "@/components/ui/input";
import {
  useGetInfinitePost,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const Saved = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data: posts, fetchNextPage, hasNextPage } = useGetInfinitePost();
  const { data: searchedPosts, isFetching } = useSearchPosts(searchValue);

  if (!posts) {
    return (
      <div className="flex items-center text-center justify-center w-full">
        <p>Loading...</p>
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="w-full max-w-5xl">
      <div className="w-full container">
        <h2 className="w-full font-bold text-md mb-4 pl-8">Search Posts</h2>
        <div className="w-full flex items-center justify-center mx-auto gap-4">
          <FaSearch />
          <Input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
            className="text-black"
          />
        </div>
      </div>

      <div className="flex justify-between w-full max-w-5xl mt-16 mb-7 px-4">
        <h3 className="font-bold ">Popular Today</h3>
        <div className="flex items-center justify-center gap-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-sm">All</p>
          <IoFilter />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 max-w-5xl mt-12">
        {shouldShowSearchResults ? (
          <p>search results</p>
        ) : shouldShowPosts ? (
          <p className="mt-10 text-center w-full">End of post results</p>
        ) : (
          posts.pages.map((item, index) => 
          <div key={index} 
          className=" w-full items-center flex justify-center"
          >
            <GridPostList key={`page-${index}`} posts={item.documents}  />
          </div>
          )
        )}
      </div>
    </div>
  );
};

export default Saved;
