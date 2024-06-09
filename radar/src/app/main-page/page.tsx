"use client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import LoginCard from "@/components/LoginCard";
import Logo from "@/components/Logo";
import Lobbies from "@/components/Lobbies";
import EditUserProfileButton from "@/components/Edituser";  // Import the button
import { useContext } from "react";
import SocketContext from "@/components/SocketContext";


const page = () => {
  return (
    <div>
     <div className="fixed top-4 right-0 m-4">
        <ThemeSwitcher />
      <EditUserProfileButton />  
      </div>
      <div className="fixed top-0 left-0 m-4">
        <Logo />
      </div>
      <div>
        <Lobbies/>
      </div>
      
      <div className="absolute left-0 right-0 top-0 z-[2]"></div>
    </div>
  );
};

export default page;
