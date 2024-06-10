"use client";

import { useState, useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import SocketContext from "./SocketContext";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  ScrollShadow,
  Spacer,
  Button,
  Divider,
  Textarea,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";


export default function LobbySidebar({name, game, id}) {
  // will be updated based on joined users
  
  const socket = useContext(SocketContext);
  const router = useRouter();

  const [memberList, setMemberList] = useState(["user1", "user2", "user3", "user4", "user5"]);
  // when someone joins the lobby, push them onto memberList
  const [lobbyTitle, setLobbyTitle] = useState(name);
  const [activityTitle, setActivityTitle] = useState(game);
  const [lobbyID, setLobbyId] = useState(id);
  const [memberCap, setMemberCap] = useState(5);

  const toolTip = "Lobby settings only mutable by lobby creator!";
  // lobbyOwner can modify title and disc.

  const [disabled, setDisabled] = useState(true);
  // const isDisabled = true;
  // need a pointers to lobby owner, and current user
  // need to set this bool on clientside based on whether the current user is the lobby owner or not
  
  // store uids of users in lobby
  const [serverMemberList, setServerMemberList] = useState([]);


  useEffect(() => {
    // check for lobby owner
    async function getLobbyInfo() {
        await fetch("http://localhost:8080/lobbies/" + id)
            .then(
                (res) => res.json(),
                (err) => console.error(err)
            )
            .then((data) => {
                // console.log("data: " + JSON.stringify(data));
                // alert(data.name);
                setLobbyTitle(data.name);
                setActivityTitle(data.game);
                // alert("lobby owner_uid: " + data.owner_uid);
                if (data.owner_uid == localStorage.getItem("uid")) {
                    setDisabled(false);
                }
            });
    }
    getLobbyInfo();
}, []);


  function handleLobbyClose() {
    alert("closing lobby!");
    // route user back to main page, emit socket delete event
    socket.emit("close_lobby", id);
    router.replace("/main-page");
  }

  return (
    <Card className="grow" radius ="none" shadow="none">

      <CardHeader className="flex flex-col gap-2 items-start text-wrap max-w-56">
        <p className="text-purple-500 font-bold text-3xl text-wrap"> {lobbyTitle} </p>
        <Divider/>
        <p className="font-bold text-xl"> {activityTitle} </p>
        <p> lobbyID: {id} </p>
      </CardHeader>

      <CardBody className="self-center">
        <div className="grid gap-1 grid-cols-2 self-center">
          {memberList.map((m) => (
                      <Dropdown key={m}>
                        <DropdownTrigger>
                          <Button>
                            <p className="font-bold text-purple-500"> {m} </p>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            // className="text-danger"
                            // color="secondary"
                          >
                            <p className="font-bold"> User Info </p>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ))}
        </div>
      </CardBody>
      <CardFooter className="justify-center">
        <Button color="danger" 
        isDisabled={disabled}
        onClick={() => handleLobbyClose()}
          
        > Close Lobby 

        </Button>
      </CardFooter>
    </Card>


  )
}
