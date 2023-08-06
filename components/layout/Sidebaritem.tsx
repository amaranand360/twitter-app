import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebaritemProps{
  lebel:string; 
  href?: string;
  icon: IconType
  onClick?:()=> void;
  auth?:boolean;

}
 

const Sidebaritem:React.FC<SidebaritemProps> = ({
  lebel,
  href,
  icon:Icon, 
  onClick,
  auth
 }) => {
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleClick =useCallback(()=>{
    if (onClick) {
      return onClick();
    }

    if(auth && !currentUser){
      loginModel.onOpen();
    }
    else if(href){
      router.push(href);
    }

  },[router,onClick,href,currentUser,auth,loginModel])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
      relavite
      rounded-full
      h-14
      w-14
      flex
      items-center
      justify-center
      p-4
      hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      lg:hidden
      ">
        <Icon size={28}  color="white" />
      </div>
      <div className="
      relavite
      hidden
      lg:flex
      items-center
      gap-4
      p-4
      rounded-full
      hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
        {lebel}
        </p>
      </div>
    </div>
  );
}

export default Sidebaritem;
