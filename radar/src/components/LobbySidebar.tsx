"use client";

import { useState, useEffect, useRef } from "react";

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
  // const userArr = [localStorage.getItem("session_username")];
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
  
  useEffect(() => {
    function checkLobbyOwner() {
      // if (localStorage.getItem("session_username") === lobbyOwner) {
      //   setDisabled(false);
      // }
    }

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
            });
    }

    getLobbyInfo();
}, []);

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
        <Button color="danger" isDisabled={disabled}> Close Lobby </Button>
      </CardFooter>
    </Card>


  )


  // return (
  //       <Card
  //         className="flex flex-col justify-start items-center w-64 h-full"
  //         shadow="none"
  //         radius="none"
  //       >
  //         {/* cards will be mutable by lobby owner*/}
  //         <CardHeader className="flex flex-col">
  //           <Tooltip content="Modfiy lobby title" isDisabled={toggleDisable}>
  //             <Button
  //               className="flex"
  //               variant="light"
  //               isDisabled={toggleDisable}
  //             >
  //               <p className="text-2xl font-bold text-purple-500">
  //                 {lobbyTitle}
  //               </p>
  //             </Button>
  //           </Tooltip>

  //           <Spacer />
  //           <Divider />
  //           <Spacer />

  //           <Tooltip content="Modify activity title" isDisabled={toggleDisable}>
  //             <Button
  //               className="flex"
  //               variant="light"
  //             >
  //               <p className="text-lg font-bold">{activityTitle}</p>
  //             </Button>
  //           </Tooltip>
  //         </CardHeader>

  //         <CardFooter className="flex justify-center items-center">
  //           <Card shadow="sm">
  //             <CardHeader>
  //               Members: {memberList.length} / {memberCap}
  //             </CardHeader>

  //             {/* maybe make user components hoverable buttons so they can be kicked by lobby owner? */}
  //             <CardBody className="grid gap-1 grid-cols-2">
  //               {/* {memberList.map((m) => <UserButton chatName = {m.chatName}/>)} */}
  //               {memberList.map((m) => (
  //                 <Dropdown key={m}>
  //                   <DropdownTrigger>
  //                     <Button>
  //                       <p className="font-bold text-purple-500"> {m} </p>
  //                     </Button>
  //                   </DropdownTrigger>
  //                   <DropdownMenu>
  //                     <DropdownItem
  //                       // className="text-danger"
  //                       // color="secondary"
  //                     >
  //                       <p className="font-bold"> User Info </p>
  //                     </DropdownItem>
  //                   </DropdownMenu>
  //                 </Dropdown>
  //               ))}
  //             </CardBody>
  //             <CardFooter>
  //               LobbyID = {lobbyID}
  //             </CardFooter>
  //           </Card>
  //         </CardFooter>
  //       </Card>
  // );
}
