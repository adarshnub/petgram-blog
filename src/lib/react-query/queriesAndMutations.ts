import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  INewPost,
  IUpdatePost,
  createPost,
  createUserAccount,
  getPostById,
  getRecentPosts,
  likePost,
  signInAccount,
  signOutAccount,
  updatePost,
  
} from "../appwrite/api";
import { INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

//user queries
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

////////post queries

//create post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

//get posts
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

//get post by useer_id
export const useGetPostById = (postId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

//update post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

//like-post
export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            postId,
            likesArray
        }:{
            postId:string;
             likesArray:string[];
            }) => likePost(postId,likesArray),
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_POST_BY_ID,data?.$id]});
                queryClient.invalidateQueries({ queryKey:[QUERY_KEYS.GET_RECENT_POSTS]});
                queryClient.invalidateQueries({ queryKey:[QUERY_KEYS.GET_CURRENT_UER]});
                queryClient.invalidateQueries({ queryKey:[QUERY_KEYS.GET_POSTS]});

            }
    })
}
