import { useCallback, useMemo } from "react";

import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModel from "./useLoginModel";
import { toast } from "react-hot-toast";
import axios from "axios";


const useLike = ({postId ,userId}:{postId :string, userId?:string})=> {
    const { data : currentUser} = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId as string);

    const loginModel = useLoginModel();

    const hasLiked = useMemo(()=> {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id)

    },[currentUser?.id ,fetchedPost?.likedIds]);

    const toggleLike = useCallback(async ()=> {
        if(!currentUser){
            return loginModel.onOpen();
        }

        try {
         let request;
         
         if(hasLiked){
            request = () => axios.delete('/api/like', { params : { postId } });
         } else {
           
            request = () => axios.post('/api/like',  { postId } );
         }

         await request();
         mutateFetchedPost();
         mutateFetchedPosts();

         const msg = hasLiked ? 'UnLiked':'Liked successfully';
         toast.success(`${msg}`)

        } catch (error) {
            toast.error('Something went wrong');
            
        }
    },[currentUser,
        hasLiked,
        postId,
        mutateFetchedPost,
        mutateFetchedPosts,
        loginModel]);

    return {
        hasLiked,
        toggleLike
    }
};

export default useLike;
