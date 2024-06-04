import { useState, useEffect, useRef } from "react";
import { Card } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

// import Chat from "../components/Chat"
// import LobbySidebar from "../components/LobbySidebar"

import LoginCard from "@/components/LoginCard";
        
export default function LobbyModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex">
      <Button className="bg-purple-800 text-white" onPress={onOpen}>
        {" "}
        Join Lobby{" "}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="flex-none min-w-fit"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex">
               <LoginCard/>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-red-500" onPress={onClose}>
                  {" "}
                  Leave Lobby
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}