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

import TagsDropdown from "../components/TagsDropdown";

// lobbyTitle
// gameTitle
// description
// platform
// is_private
// region
// player_limit
// players
// show all member names
// tag
// lobby_key

export default function LobbySidebar({name, game, id}) {
  // will be updated based on joined users
  // const userArr = [localStorage.getItem("session_username")];
  const [memberList, setMemberList] = useState(["user1", "user2", "user3", "user4", "user5"]);
  // when someone joins the lobby, push them onto memberList
  const [description, setDescription] = useState("DEFAULT_DESCRIPTION");
  const [lobbyTitle, setLobbyTitle] = useState(name);
  const [activityTitle, setActivityTitle] = useState(game);
  const [lobbyID, setLobbyId] = useState(id);
  const [memberCap, setMemberCap] = useState(5);

  const toolTip = "Lobby settings only mutable by lobby creator!";
  // lobbyOwner can modify title and disc.

  const toggleDisable: boolean = true;
  // need a pointers to lobby owner, and current user
  // need to set this bool on clientside based on whether the current user is the lobby owner or not

  /*
  const UpdateDescription = () => {
    // send the new description to server
    console.log("Description updated: ", description);
  };

  const SetLobbyTitle = () => {
    let str = prompt("Enter Lobby Title:");
    if (str != "" && str != null) {
      setLobbyTitle(str);
    } else {
      setLobbyTitle("LOBBY_TITLE");
    }
  };

  const SetActivityTitle = () => {
    let str = prompt("Enter Activity Title:");
    if (str != "" && str != null) {
      setActivityTitle(str);
    } else {
      setActivityTitle("ACTIVITY_TITLE");
    }
  };

  const KickMember = (toKick: string) => {
    // might have to be based on userID or something more objective
    setMemberList(memberList.filter((member) => member != toKick)); // should remove the user from the list
  };
  */

  return (
    <div className="flex">
      <Tooltip content={toolTip}>
        <Card
          className="flex-col justify-center w-64"
          shadow="none"
          radius="none"
        >
          {/* cards will be mutable by lobby owner*/}
          <CardHeader className="flex flex-col">
            <Tooltip content="Modfiy lobby title" isDisabled={toggleDisable}>
              <Button
                className="flex"
                variant="light"
                isDisabled={toggleDisable}
              >
                <p className="text-2xl font-bold text-purple-500">
                  {lobbyTitle}
                </p>
              </Button>
            </Tooltip>

            <Spacer />
            <Divider />
            <Spacer />

            <Tooltip content="Modify activity title" isDisabled={toggleDisable}>
              <Button
                className="flex"
                variant="light"
              >
                <p className="text-lg font-bold">{activityTitle}</p>
              </Button>
            </Tooltip>
          </CardHeader>

          <Divider />

          <CardBody className="flex justify-center">
            <Textarea
              label="Description"
              isReadOnly={toggleDisable}
              value={description}
              onValueChange={setDescription}
            />

            <Spacer />
            <Button>
              Save Description
            </Button>

            <Spacer />
            <Divider />
            <Spacer />

            {/* <TagsDropdown tags = {tags}/> */}
          </CardBody>

          <Divider />

          <CardFooter className="flex justify-center items-center">
            <Card shadow="sm">
              <CardHeader>
                Members: {memberList.length} / {memberCap}
              </CardHeader>

              {/* maybe make user components hoverable buttons so they can be kicked by lobby owner? */}
              <CardBody className="grid gap-1 grid-cols-2">
                {/* {memberList.map((m) => <UserButton chatName = {m.chatName}/>)} */}
                {memberList.map((m) => (
                  <Dropdown key={m}>
                    <DropdownTrigger>
                      <Button>
                        <p className="font-bold text-purple-500"> {m} </p>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        className="text-danger"
                        color="danger"
                      >
                        Kick user?
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ))}
              </CardBody>
              <CardFooter>
                LobbyID = {lobbyID}
              </CardFooter>
            </Card>
          </CardFooter>
        </Card>
      </Tooltip>
    </div>
  );
}
