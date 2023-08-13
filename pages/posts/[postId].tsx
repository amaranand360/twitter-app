import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostIteam from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);
    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <div>
            <Header showBackArrow label="Replay" />
            <PostIteam data={fetchedPost} />
            <Form
                postId={postId as string}
                isComment
                placeholder="Commit your reply !"
            />
            <CommentFeed comments={fetchedPost?.comments} />
        </div>
    );
}

export default PostView;