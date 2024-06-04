"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import SocketContext from "@/components/SocketContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

// 1. import `NextUIProvider` component
export default function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <SocketContext.Provider value={socket}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SocketContext.Provider>
  );
}
