"use client";
import React, { useEffect, useContext } from "react";
import {
  Modal,
  Input,
  Button,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Slider,
  Switch,
  SliderValue,
} from "@nextui-org/react";
import { Selection } from "@react-types/shared";

import SocketContext from "@/components/SocketContext";

export default function LobbyCreator() {
  const socket = useContext(SocketContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [inputTitleValue, setInputTitleValue] = React.useState("");
  const [inputGameValue, setInputGameValue] = React.useState("");

  const isInvalidLobbyName = React.useMemo(() => {
    if (inputTitleValue === "" || inputTitleValue.length > 30) return true;
  }, [inputTitleValue]);
  const isInvalidGameName = React.useMemo(() => {
    if (inputGameValue === "") return true;
  }, [inputGameValue]);

  const isInvalidLobby = React.useMemo(() => {
    if (isInvalidLobbyName || isInvalidGameName)
      return true;
  }, [isInvalidLobbyName, isInvalidGameName]);

  const CreateLobby = async () => {
    // update the DB to reflect new lobby
    // const socket = useContext(SocketContext);
    socket.emit("create_lobby", inputTitleValue, inputGameValue, localStorage.getItem("uid"));
  };

  return (
    <div>
      <Button onPress={onOpen}>Create Lobby</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Lobby
              </ModalHeader>
              <ModalBody>
                <Input
                  value={inputTitleValue}
                  autoFocus
                  placeholder="Your lobby title"
                  onValueChange={setInputTitleValue}
                  isInvalid={isInvalidLobbyName}
                  errorMessage={
                    isInvalidLobbyName &&
                    "Lobby title cannot be empty and must be 30 characters or less."
                  }
                  variant="bordered"
                ></Input>
                <Input
                  value={inputGameValue}
                  autoFocus
                  placeholder="Game Title"
                  onValueChange={setInputGameValue}
                  isInvalid={isInvalidGameName}
                  errorMessage={
                    isInvalidGameName && "Please input a game title."
                  }
                  variant="bordered"
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
                <Button
                  onPress={() => {
                    CreateLobby();
                  }}
                  isDisabled={isInvalidLobby}
                  color={isInvalidLobby ? "danger" : "success"}
                  variant={isInvalidLobby ? "bordered" : "shadow"}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
