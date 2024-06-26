import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import { useRecoilState, useRecoilValue } from "recoil";
import { friendsData } from "../store/friendsData";
import useGetFriends from "../hooks/useGetFriends";
import { friendToChat } from "../store/friendToChat";
import { userData } from "../store/authUserData";

export default function FriendsSidebarList({onlineUser}) {
  const [friends, setFriends] = useRecoilState(friendsData);
  const authUser=useRecoilValue(userData);
  useEffect(() => {
    useGetFriends(setFriends);
  }, []);
  
  console.log("onlineUser"+onlineUser);

  console.log("friends" + friends);
  return (
    <div className="w-1/4 relative bg-[#121212] ">
      {/* <div className="flex gap-4 items-center mb-12 border border-gray-600 bg-gray-400 h-[8vh] p-4"> */}
      <div className="flex gap-4 items-center border border-gray-600 bg-[#343434] h-[10vh] p-4">
        {/* <div className="flex gap-4 items-center mt-12 mb-12"> */}
        <img className="w-10 h-10 rounded-full" src={authUser?.avatar} />
        <input
          className="p-1 px-4 rounded-3xl w-3/5 border border-sky-400 placeholder:text-black"
          type="text"
          placeholder="Search.."
        />
        <FaSearch className="bg-slate-200 w-8 h-8 p-2 rounded-full" />
      </div>

      <div className=" h-[90vh] overflow-auto relative">
        {friends &&
          friends.map((f) => {
            const onlineStatus = onlineUser.includes(f._id);
            return <Friend user={f} onlineStatus={onlineStatus} />;
          })}
      </div>
      {/* <CiLogout className="w-6 h-6 mt-2" onClick={() => useLogout()} /> */}
    </div>
  );
}

export function Friend({ user,onlineStatus }) {
  const [userClicked, setUserClicked] = useRecoilState(friendToChat);
  return (
    <div
      // className={`flex items-center hover:bg-sky-400 gap-4 w-64 p-2 px-3
      className={`flex items-center hover:bg-slate-700 gap-4 w-64 p-2 px-3
     ${userClicked === user ? "bg-slate-700" : ""}`}
      onClick={() => setUserClicked(user)}
    >
      <div className="relative ">
        <img className="w-10 h-10 rounded-full p-0" src={user.avatar} />
          {onlineStatus && <div className="absolute right-0 top-1 bg-green-500 w-2 h-2 rounded-full 
          border border-black"></div>}
      </div>
      <p className="text-base text-slate-200">{user.name}</p>
      {/* <p>{onlineStatus ? "online" : "not online"}</p> */}
    </div>
  );
}
