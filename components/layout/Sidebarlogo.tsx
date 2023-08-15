import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const Sidebarlogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="
      rounded-full
      h-14
      w-14
      p-4
      flex
      item-center
      justify-center
     hover:bg-blue-300
      hover:bg-opacity-10
      curser-pointer
      transition
      "
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default Sidebarlogo;
