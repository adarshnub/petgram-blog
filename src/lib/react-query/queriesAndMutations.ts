import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query';
import { creeateUserAccount, signInAccount } from '../appwrite/api';
import { INewUser } from '@/types';


export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user : INewUser) => creeateUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user : {email:string, password:string}) => signInAccount(user)
    })
}