import Form from "@/components/Form";
import Header from "@/components/Header";
import PostIteam from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostView = ()=>{
    const router = useRouter();
    const { postId } = router.query;

    const {data: fetchedPost , isLoading} = usePost(postId as string);

    if(isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return(
        <div>
            <Header label="Post" showBackArrow />
            <PostIteam data={fetchedPost} />
            <Form
             postId={postId as string}
             isComment
             placeholder="Post your reply"
             />
        </div>
    );
}

export default PostView;