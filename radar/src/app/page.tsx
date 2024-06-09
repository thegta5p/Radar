"use client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import LoginCard from "@/components/LoginCard";
import Logo from "@/components/Logo";
import Lobbies from "@/components/Lobbies";
import EditUserProfileButton from "@/components/Edituser";  // Import the button

export default function Home() {
  return (
    <main>
      <div className="fixed top-4 right-0 m-4 space-x-4 flex items-start">
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
    </main>
  );
}
