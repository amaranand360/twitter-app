import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";
import Header from "@/components/Header";

import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import PostFeed from "@/components/Post/PostFeed";

const Userview = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);
  console.log("fetched user", fetchedUser?.name);

  if (isLoading || !fetchedUser) {
    return (
      <div
        className="
      flex
      justify-center
      items-center
      h-full
      "
      >
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="User Profile" />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default Userview;
