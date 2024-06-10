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
  const [selectedTagKeys, setSelectedTagKeys] = React.useState<Selection>(
    new Set([]),
  );
  const selectedTagValue = React.useMemo(
    () => Array.from(selectedTagKeys).join(", ").replaceAll("_", " "),
    [selectedTagKeys],
  );
  const [selectedPlatformKeys, setSelectedPlatformKeys] =
    React.useState<Selection>(new Set(["PC"]));
  const selectedPlatformValue = React.useMemo(
    () => Array.from(selectedPlatformKeys).join(", ").replaceAll("_", " "),
    [selectedPlatformKeys],
  );
  const [selectedRegionKeys, setSelectedRegionKeys] = React.useState<Selection>(
    new Set(["NA-West"]),
  );
  const selectedRegionValue = React.useMemo(
    () => Array.from(selectedRegionKeys).join(", ").replaceAll("_", " "),
    [selectedRegionKeys],
  );
  const [inputTitleValue, setInputTitleValue] = React.useState("");
  const [inputDescValue, setInputDescValue] = React.useState("");
  const [inputGameValue, setInputGameValue] = React.useState("");
  const [inputPlayerNum, setInputPlayerNum] = React.useState<SliderValue>(2);
  const [inputIsPrivate, setInputIsPrivate] = React.useState(false);
  const [privateStatus, setPrivateStatus] = React.useState("No");

  const changePrivateStatus = React.useCallback((value) => {
    if (value) {
      setInputIsPrivate(true);
      setPrivateStatus("Yes");
    } else {
      setInputIsPrivate(false);
      setPrivateStatus("No");
    }
  }, []);

  const isInvalidLobbyName = React.useMemo(() => {
    if (inputTitleValue === "" || inputTitleValue.length > 30) return true;
  }, [inputTitleValue]);
  const isInvalidGameName = React.useMemo(() => {
    if (inputGameValue === "") return true;
  }, [inputGameValue]);
  const isInvalidDescName = React.useMemo(() => {
    if (inputDescValue.length > 180) return true;
  }, [inputDescValue]);
  const isInvalidLobby = React.useMemo(() => {
    if (isInvalidDescName || isInvalidLobbyName || isInvalidGameName)
      return true;
  }, [isInvalidDescName, isInvalidLobbyName, isInvalidGameName]);

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
                Select Tags:
                <Dropdown>
                  <DropdownTrigger>
                    <Button isDisabled variant="bordered" className="capitalize">
                      {selectedTagValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    closeOnSelect={false}
                    disallowEmptySelection={false}
                    selectionMode="multiple"
                    selectedKeys={selectedTagKeys}
                    onSelectionChange={setSelectedTagKeys}
                  >
                    <DropdownItem key="Competitive">Competitive</DropdownItem>
                    <DropdownItem key="Casual">Casual</DropdownItem>
                    <DropdownItem key="PvP">PvP</DropdownItem>
                    <DropdownItem key="PvE">PvE</DropdownItem>
                    <DropdownItem key="Raid">Raid</DropdownItem>
                    <DropdownItem key="Voice Chat">Voice Chat</DropdownItem>
                    <DropdownItem key="No Voice Chat">
                      No Voice Chat
                    </DropdownItem>
                    <DropdownItem key="Co-op">Co-op</DropdownItem>
                    <DropdownItem key="Farming">Farming</DropdownItem>
                    <DropdownItem key="Need Help">Need Help</DropdownItem>
                    <DropdownItem key="Beginner">Beginner</DropdownItem>
                    <DropdownItem key="Advanced">Advanced</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
                <Input
                  isDisabled
                  value={inputDescValue}
                  autoFocus
                  placeholder="Your description"
                  onValueChange={setInputDescValue}
                  isInvalid={isInvalidDescName}
                  errorMessage={
                    isInvalidDescName &&
                    "Descriptions must be 180 characters or less."
                  }
                  variant="bordered"
                ></Input>
                <Slider
                  isDisabled
                  size="md"
                  step={1}
                  color="foreground"
                  label="Max Player Count"
                  showSteps={true}
                  onChange={setInputPlayerNum}
                  value={inputPlayerNum}
                  maxValue={10}
                  minValue={2}
                ></Slider>
                Select Platform:
                <Dropdown>
                  <DropdownTrigger>
                    <Button isDisabled variant="bordered" className="capitalize">
                      {selectedPlatformValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    closeOnSelect={true}
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedPlatformKeys}
                    onSelectionChange={setSelectedPlatformKeys}
                  >
                    <DropdownItem key="PC">PC</DropdownItem>
                    <DropdownItem key="xbox">Xbox</DropdownItem>
                    <DropdownItem key="playStation">PlayStation</DropdownItem>
                    <DropdownItem key="switch">Switch</DropdownItem>
                    <DropdownItem key="mobile">Mobile</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                Select Region:
                <Dropdown>
                  <DropdownTrigger>
                    <Button isDisabled variant="bordered" className="capitalize">
                      {selectedRegionValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    closeOnSelect={true}
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedRegionKeys}
                    onSelectionChange={setSelectedRegionKeys}
                  >
                    <DropdownItem key="NA-West">NA-West</DropdownItem>
                    <DropdownItem key="NA-East">NA-East</DropdownItem>
                    <DropdownItem key="EU">EU</DropdownItem>
                    <DropdownItem key="South America">
                      South America
                    </DropdownItem>
                    <DropdownItem key="Oceania">Oceania</DropdownItem>
                    <DropdownItem key="Asia">Asia</DropdownItem>
                    <DropdownItem key="Africa">Africa</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Switch
                  isDisabled
                  size="md"
                  isSelected={inputIsPrivate}
                  onValueChange={changePrivateStatus}
                >
                  Private Lobby
                </Switch>
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
