import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query';
import { INewPost, createPost, createUserAccount, getRecentPosts, signInAccount, signOutAccount } from '../appwrite/api';
import { INewUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';


//user queries 
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user : INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user : {email:string, password:string}) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn:  signOutAccount
    })
}


////////post queries

//create post
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

//get posts
export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn : getRecentPosts,
    })
}

