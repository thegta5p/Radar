
"use client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import LoginCard from "@/components/LoginCard";
import Logo from "@/components/Logo";
import Lobbies from "@/components/Lobbies";
import EditUserProfileButton from "@/components/Edituser";  // Import the button
import { useContext } from "react";
import SocketContext from "@/components/SocketContext";


export default function Home() {

  return (
    <main>
      <div className="fixed top-4 right-0 m-4 space-x-4 flex items-start">
        <ThemeSwitcher />
      </div>
      <div className="fixed top-0 left-0 m-4">
        <Logo />
      </div>
      <div className="flex min-h-full min-h-screen w-screen items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-[50%_50%]">
        <div className="relative hidden md:block flex flex-col lg:flex lg:px-8">
          <p className="text-5xl text-purple-500 font-semibold text-left pl-9">
            It&apos;s dangerous out there...
          </p>
          <p className="text-5xl text-purple-300 text-left pl-9">
            Group up with gamers
          </p>
        </div>
        <div className="relative flex grow flex-col items-center">
          <div className="flex grow w-full max-w-md flex-col items-center justify-center">
            <LoginCard />
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 top-0 z-[2]"></div>
    </main>
  );
}
