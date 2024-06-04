import react from "react";
// import { FC } from "react";

import Chat from "@/components/Chat"
import LobbySidebar from "@/components/LobbySidebar"


import { Card } from "@nextui-org/react";

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

export default function ChatWindow({params} : {params: {lobbyID: string}}) {
    return (
        <div className="flex min-h-screen min-w-screen justify-center items-center">
            
            <Card className="flex flex-row justify-evenly items-center" shadow="md">
                <LobbySidebar name="TODO" game="TODO" id={params.lobbyID}/>
                <Chat lobbyID={params.lobbyID}/>
            </Card>
        </div>
    );
}
