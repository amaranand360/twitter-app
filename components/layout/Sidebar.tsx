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

  const items =[
{
  label :'Home',
  href:"/",
  icon: AiTwotoneHome
},
{
  label:'Notifactions',
  href:'/notifications',
  icon: BsBellFill,
  auth:true,
  alert:currentUser?.hasNotification,
},
{
  label:'Profile',
  href:`/users/${currentUser?.id}`,
  icon: FaUser,
  auth:true,
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
           label={item.label}
           icon={item.icon}
           auth={item.auth}
           alert={item.alert}
           /> 
           ))}
           { currentUser && (
           < Sidebaritem onClick={()=>signOut() } icon={BiLogOut} label="Logout" href="/" />
           )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  </>
  )
}

export default Sidebar;
