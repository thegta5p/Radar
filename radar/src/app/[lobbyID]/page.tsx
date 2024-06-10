import react from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useState, useEffect } from "react";

import Chat from "@/components/Chat"
import LobbySidebar from "@/components/LobbySidebar"

// '@' in import path is an alias for the 'src' directory

// export async function generateStaticParams() {

//     const lobbyIDs = await fetch("http://localhost:3000/lobbies/ids")
//         .then(res => res.json())
//         .catch(err => console.error(err));
//         // console.log("lobbyIDs: " + JSON.stringify(lobbyIDs));
//         // won't do anything because this function will never be loaded in browser
    
//     // return lobbyIDs.map(id => ({params: {id: id.toString()}}));
//     return lobbyIDs.map(lobbyID) => {
//         id: 


//     });
// }

// fetch the name and game from the lobbyID


export default function ChatWindow({params} : {params: {lobbyID: string}}) {
    
    return (
        <div className="flex min-h-screen min-w-screen justify-center items-center">
            <Card className="flex flex-row justify-evenly items-center" radius="none" shadow="md">
                <CardBody className="flex flex-row">
                    <LobbySidebar name="super long title name" game="ACTIVITY_TITLE" id={params.lobbyID}/>
                    <Chat lobbyID={params.lobbyID}/>
                </CardBody>
            </Card>
        </div>
    );
}
