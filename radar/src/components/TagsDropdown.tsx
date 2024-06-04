import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import { Selection } from "@react-types/shared";

export default function TagsDropdown({tags}) {
  const [selectedTagKeys, setSelectedTagKeys] = useState<Selection>(
    new Set([tags]),
  );

  const selectedTagValue = useMemo(
    () => Array.from(selectedTagKeys).join(", ").replaceAll("_", " "),
    [selectedTagKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
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
        <DropdownItem key="No Voice Chat">No Voice Chat</DropdownItem>
        <DropdownItem key="Co-op">Co-op</DropdownItem>
        <DropdownItem key="Farming">Farming</DropdownItem>
        <DropdownItem key="Need Help">Need Help</DropdownItem>
        <DropdownItem key="Beginner">Beginner</DropdownItem>
        <DropdownItem key="Advanced">Advanced</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
