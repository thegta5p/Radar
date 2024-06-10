"use client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import EditUserProfileButton from "@/components/Edituser";  // Import the button
import Logo from "@/components/Logo";
import Lobbies from "@/components/Lobbies";
import { useContext } from "react";
import SocketContext from "@/components/SocketContext";

const page = () => {
  const { uid } = useContext(SocketContext) ///
  return (
    <div>
      <div className="fixed top-4 right-0 m-4 flex items-center space-x-4"> 
      <EditUserProfileButton uid={uid} />
        <ThemeSwitcher />
      
      </div>
      <div className="fixed top-0 left-0 m-4">
        <Logo />
      </div>
      <div>
        <Lobbies />
      </div>
      
      <div className="absolute left-0 right-0 top-0 z-[2]"></div>
    </div>
  );
};

export default page;
