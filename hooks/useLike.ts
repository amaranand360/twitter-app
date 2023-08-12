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
    const { mutate: mutateFetchedPosts } = usePosts(userId);

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
         console.log(hasLiked);
         console.log(postId);
         
         if(hasLiked){
            request = () => axios.delete('/api/like', { data : { postId } });
         } else {
           
            request = () => axios.post('/api/like',  { postId } );
         }

         await request();
         mutateFetchedPost();
         mutateFetchedPosts();

         toast.success('Liked successfully')

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
