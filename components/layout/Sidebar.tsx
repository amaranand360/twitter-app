import { AiTwotoneHome } from "react-icons/ai";
import { BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import Sidebarlogo from "./Sidebarlogo";
import Sidebaritem from "./Sidebaritem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";

import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data : currentUser} = useCurrentUser();
  console.log(currentUser);

  const items =[
{
  lebel :'Home',
  href:"/",
  icon: AiTwotoneHome
},
{
  lebel:'Notifaction',
  href:'/notification',
  icon: BsBellFill,
  auth:true
},
{
  lebel:'Profile',
  href:`/users/${currentUser?.id}`,
  icon: FaUser,
  auth:true
}

];
  return (
    <>
    <div className="col-span-1 h-full pr-4 md:pr-6" >
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <Sidebarlogo/>
           {items.map((item)=>(
           <Sidebaritem 
           key={item.href}
           href={item.href}
           lebel={item.lebel}
           icon={item.icon}
           auth={item.auth}
           /> 
           ))}
           { currentUser && (
           < Sidebaritem onClick={()=>signOut() } icon={BiLogOut} lebel="Logout" href="/" />
           )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  </>
  )
}

export default Sidebar;
