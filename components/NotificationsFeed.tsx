import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  console.log(fetchedNotifications);
  console.log(currentUser);
  console.log("mutate", mutateCurrentUser);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col text-yellow-50">
      {fetchedNotifications.map((notification: Record<string, any>) => {
        {
          console.log(notification);
        }
        <div
          key={notification.id}
          className="
            flex
            flex-row
            items-center
            p-6
            gap-4
            border-b-[1px]
            bordre-neutral-800
            "
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>;
      })}
    </div>
  );
};

export default NotificationsFeed;
