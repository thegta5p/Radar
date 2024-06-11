"use client";
import { useEffect, useState, useContext, useMemo } from "react";
import {
  Modal,
  Input,
  Button,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";
import { Selection } from "@react-types/shared";

import SocketContext from "@/components/SocketContext";

export default function EditUser() {
  const socket = useContext(SocketContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("dude");
  const [email, setEmail] = useState("dude@dude");
  const [nickname, setNickname] = useState("duderman");
  const [pressed, setPressed] = useState(false);

  // fetch the user's details from the server
  
  async function getUserDetails() {
    await fetch("http://localhost:8080/users/" + localStorage.getItem("uid"))
      .then(
        (res) => res.json(),
        (err) => console.error(err)
      )
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setNickname(data.nickname);
      });
  }

  useEffect(() => {
    // onOpen;
    // setPressed(!pressed);
    getUserDetails();
  }, []);

  const handleChangeNickname = () => {
    // const nickname = prompt("Enter your new nickname: ");
    socket.emit("update_nickname", nickname, localStorage.getItem("uid"));
  };

  const isInvalidNickname = useMemo(() => {
    if (nickname === "" || nickname.length > 20 || nickname.includes(" ")) {
      return true;
    }
  }, [nickname]);

  return (
    <div>
      <Button color="success" onPress={onOpen}> 
        <p className="text-white"> View/Edit Profile </p> 
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Lobby
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  id="userName"
                  value={name}
                  disabled
                  variant="bordered"
                ></Input>
                <Input
                  label="Email"
                  id="userEmail"
                  value={email}
                  disabled
                  variant="bordered"
                ></Input>
                <Input
                  label="Nickname"
                  id="userNickname"
                  value={nickname}
                  onValueChange={(e) => setNickname(e)}
                >
                </Input>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}> Close </Button>
                <Button
                  onPress={() => {
                    handleChangeNickname();
                  }}
                  isDisabled={isInvalidNickname}
                  color={isInvalidNickname ? "danger" : "success"}
                  variant={isInvalidNickname ? "bordered" : "shadow"}
                >
                  <p className="text-white"> Update Nickname </p>
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
