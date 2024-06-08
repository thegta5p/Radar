import React from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Logo from "@/components/Logo";
import Lobbies from "@/components/Lobbies";

const page = () => {
  return (
    <div>
     <div className="fixed top-4 right-0 m-4">
        <ThemeSwitcher />
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
