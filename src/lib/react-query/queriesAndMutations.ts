import {
    useMutation, useQueryClient
} from '@tanstack/react-query'
import {createPost, createUserAccount, signInAccount, signOutAccount} from "@/lib/appwrite/api.ts";
import type {INewPost, INewUser} from "@/types";
import { QUERY_KEYS } from "@/lib/react-query/query-keys.ts";

export const useCreateUserAccountMutation = () => {
    return  useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSignInAccountMutation = () => {
    return  useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user)
    })
}

export const useSignOutAccountMutation = () => {
    return  useMutation({
        mutationFn:  signOutAccount
    })
}

export const useCreatePostAccountMutation = () => {
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}