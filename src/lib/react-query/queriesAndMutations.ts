import {
    useInfiniteQuery,
    useMutation, useQuery, useQueryClient
} from '@tanstack/react-query'
import {createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getUserPosts, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost} from "@/lib/appwrite/api.ts";
import type {INewPost, INewUser, IUpdatePost} from "@/types";
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

export const useGetRecentPostsMutation = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useLikePostMutation = () => {
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn: ({postId, likesArray} : {postId: string; likesArray: string[]}) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })            
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })            
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })            
        }
    })
}

export const useSavePostMutation = () => {
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn: ({postId, userId} : {postId: string; userId: string}) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })            
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })            
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })            
        }
    })
}

export const useDeleteSavePostMutation = () => {
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn: ({savedRecordId} : {savedRecordId: string;}) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })            
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })            
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })            
        }
    })
}

export const useGetCurrentUserMutation = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useGetPostByIdMutation = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({postId,imageId}: {postId: string; imageId: string}) => deletePost(postId,imageId),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        })
    }
  })
}
export const useGetUserPostsMutation = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
}

export const useGetPostsQuery = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: ({ pageParam = 0 }) => getInfinitePosts(pageParam),
        getNextPageParam: (lastPage) => {
            if(lastPage && lastPage.documents.length === 0) return null
            
            const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;

            return lastId
        }
    })
}

export const  useSearchPostsQuery = (searchInput: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchInput],
        queryFn: () => searchPosts(searchInput),
        enabled: !!searchInput
    })
}