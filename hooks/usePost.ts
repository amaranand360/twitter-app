// import useSWR  from "swr";

// import fetcher from "@/libs/fetcher";

// const usePost = (postId: string)=> {
//     const url = postId ? `/api/posts/${postId}` : null ;
//     console.log('url->',url);
//     const {
//         data, 
//         error,
//         isLoading,
//         mutate
//         } = useSWR(url,fetcher)
  
//     return {
//         data,
//         error,
//         isLoading,
//         mutate
//     }
// }

// export default usePost;

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(postId ? `/api/posts/${postId}` : null, fetcher);


  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;
