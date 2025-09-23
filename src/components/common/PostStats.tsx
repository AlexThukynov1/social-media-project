import { useDeleteSavePostMutation, useGetCurrentUserMutation, useLikePostMutation, useSavePostMutation } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import type { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

export default function PostStats({post, userId}: PostStatsProps) {
    const likeList = post.likes.map((user: Models.Document) => user.$id); 

    const [likes, setLike] = useState(likeList);
    const [isSaved, setIsSaved] = useState(false);

    const {mutate: likePostMutate} = useLikePostMutation();
    const {mutate: savePostMutate, isPending: isSavingPost} = useSavePostMutation();
    const {mutate: deleteSavedPostMutate, isPending: isDeletetingSavePost} = useDeleteSavePostMutation();

    const {data: currrentUser} = useGetCurrentUserMutation();

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);
        if(newLikes.includes(userId)) {
            newLikes = newLikes.filter((id) => id !== userId); 
        } else {
            newLikes.push(userId);
        }

        setLike(newLikes);
        likePostMutate({postId: post.$id, likesArray: newLikes});
    }
    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        if(savePostRecord) {
            setIsSaved(false);
            deleteSavedPostMutate({savedRecordId: savePostRecord.$id});
        } else {
            savePostMutate({postId: post.$id, userId: userId});
            setIsSaved(true);            
        }
    }

    const savePostRecord = currrentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);

    useEffect(() => {
        setIsSaved(!!savePostRecord)
    }, [currrentUser])
  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">
{            <img
                src={`${checkIsLiked(likes, userId) 
                    ? "/assets/icons/liked.svg" 
                    : "/assets/icons/like.svg"}`}
                alt="like"
                width={20}
                height={20}
                onClick={handleLikePost}
                className="cursor-pointer"
            />}
            <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

        <div className="flex gap-2">
            { isSavingPost || isDeletetingSavePost 
            ? <Loader/>           
            : <img
                src={`${isSaved 
                    ? "/assets/icons/saved.svg"
                    : "/assets/icons/save.svg"}`}
                alt="like"
                width={20}
                height={20}
                onClick={handleSavePost}
                className="cursor-pointer"
            />
            }
        </div>
    </div>
  )
}
