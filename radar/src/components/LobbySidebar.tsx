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
  Tooltip,
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



  
  
  
  // const [memberList, setMemberList] = useState(["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"]);
  
  // when someone joins the lobby, push them onto memberList
  const [lobbyTitle, setLobbyTitle] = useState(name);
  const [activityTitle, setActivityTitle] = useState(game);
  const [lobbyID, setLobbyId] = useState(id);
  const [memberCap, setMemberCap] = useState(5);
  
  const [disabled, setDisabled] = useState(true);
  // const isDisabled = true;
  // need a pointers to lobby owner, and current user
  // need to set this bool on clientside based on whether the current user is the lobby owner or not
  
  // store uids of users in lobby
  const [serverMemberList, setServerMemberList] = useState([]);
  
  // store userdata of lobby members
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    // check for lobby owner
    async function getLobbyInfo() {
        await fetch("http://localhost:8080/lobbies/" + id)
            .then(
                (res) => res.json(),
                (err) => console.error(err)
            )
            .then((data) => {
                setLobbyTitle(data.name);
                setActivityTitle(data.game);
                // alert("lobby owner_uid: " + data.owner_uid);
                if (data.owner_uid == localStorage.getItem("uid")) {
                    setDisabled(false);
                }
                // setMemberList(data.members);
                setServerMemberList(data.members);
            });
    }
    socket.on("lobby_closed", () => {
      alert("lobby closed!");
      router.replace("/main-page");
    });
    getLobbyInfo();
  }, [serverMemberList]);

  // will run whenever serverMemberList is updated
  useEffect(() => {
    async function getNickname() {
      
      var tempMemberList = [];
      for (var i = 0; i < serverMemberList.length; i++) {
        // alert("fetching member info for: " + serverMemberList[i]);
        await fetch("http://localhost:8080/users/" + serverMemberList[i])
          .then(
            (res) => res.json(),
            (err) => console.error(err)
          )
          .then((data) => {
            // alert("data: " + JSON.stringify(data));
            // alert("nickname: " + data.nickname);

            if (serverMemberList.length != memberList.length) { // ensures that we only add
              tempMemberList.push(data);
              // setMemberList([...memberList, data]);
              setMemberList(tempMemberList); 
            }
            
            // setMemberList([...memberList, data]);
          });
      }
    }
    getNickname();
  }, [serverMemberList]);

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
        <p className="font-bold text-2xl"> {activityTitle} </p>
        <p className="text-xs"> lobbyID: {id} </p>
      </CardHeader>

      <CardBody className="flex flex-col justify-start">
        <div 
          // className="grid gap-1 grid-cols-2"
          className="flex flex-col gap-1 h-64 overflow-y-auto"
        >
          <p className="font-bold"> Lobby Members: </p>

          {memberList.map((m) => (
                      <Dropdown // key={m}
                      >
                        <DropdownTrigger>
                          <Button>
                            <p className="font-bold text-purple-500"> {m.nickname} </p>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="light">
                          <DropdownItem
                            // className="text-danger"
                            // color="secondary"
                          >
                            <p className="font-bold"> {m.name} </p>
                          </DropdownItem>
                          <DropdownItem>
                            <p className="font-bold"> {m.email} </p>
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
        > 
          Close Lobby 
        </Button>
      </CardFooter>
    </Card>


  )
}
