import {
    useQuery,
    useMutation,
    useMutation,
    useQueryClient,
    useInfinitQuery,
} from '@tanstack/react-query'
import {createUserAccount, signInAccount} from "@/lib/appwrite/api.ts";
import type {INewUser} from "@/types";

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