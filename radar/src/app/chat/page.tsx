import react from "react";

import Chat from "@/components/Chat"
import LobbySidebar from "@/components/LobbySidebar"


import { Card } from "@nextui-org/react";

// '@' in import path is an alias for the 'src' directory

export default function ChatWindow() {
    return (
        <div className="flex min-h-screen min-w-screen justify-center items-center">
            
            <Card className="flex flex-row justify-evenly items-center" shadow="md">
                <LobbySidebar name="TODO" game="TODO" id="1"/>
                <Chat lobbyID="1"/>
            </Card>

        </div>
    );
}