import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser();

  const onclick = useCallback(() => {
    if (!currentUser) {
      loginModel.onOpen();
    } else {
      router.push("/");
    }
  }, [loginModel]);

  return (
    <div onClick={onclick}>
      <div
        className="
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center
       bg-sky-500
        hover:bg-opacity-80
        transition 
        cursor-pointer
      ">
        <FaFeather size={24} color="white" />
      </div>

      <div
        className="mt-6
        hidden
        lg:block
        px-4
        py-2
        rounded-full
         bg-sky-500
        hover:bg-opacity-90
        cursor-pointer
        ">
        <p
          className="
          hidden
          lg:block
          text-center
          font-semibold
         text-white
          text-{28px}
        ">
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
