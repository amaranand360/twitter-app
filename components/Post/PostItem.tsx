import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

interface PostIteamProps {
  data: Record<string, any>;
  userId?: string;
}

const PostIteam: React.FC<PostIteamProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const { data: currentUser } = useCurrentUser();

  const goTouser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/user/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/user/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModel.onOpen();
    },
    [loginModel]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-700
        transition
    "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goTouser}
              className="
                    text-white
                    font-semibold
                    cursor-pointer
                    hover:underline
            "
            >
              {data.user?.name}
            </p>
            <span
              onClick={goTouser}
              className="
               text-neutral-500 
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt} Ago</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex  flex-row items-center mt-3 gap-10">
            <div
              className="flex 
                flex-row
                items-center 
                text-neutral-500 
                gap-2  
                cursor-pointer 
                transition 
                hover:text-sky-500"
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex 
                flex-row
                items-center 
                text-neutral-500 
                gap-2  
                cursor-pointer 
                transition 
                hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p>{data.likes?.length || 0} ❤</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIteam;
