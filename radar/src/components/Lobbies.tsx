"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import LobbyCreator from "./LobbyCreator";
import Logout from "@/components/logout";
import LoginButton from "@/components/LoginButton";
import { Selection } from "@react-types/shared";
import LobbyModal from "@/components/LobbyModal";

import { ThemeSwitcher } from "./ThemeSwitcher";

import { BsSearch } from "react-icons/bs";
import { Router } from "react-router-dom";


export default function Lobbies() {

  const router = useRouter();

  const [lobbies, setLobbies] = useState([]);
  useEffect(() => {
    async function getLobbies() {
      await fetch("http://localhost:8080/lobbies")
        .then(
          (res) => res.json(),
          (err) => console.error(err)
        )
        .then((data) => {
          setLobbies(data);
        });
  
        // console.log("DB lobbies:\n" + JSON.stringify(lobbies));
    }

    getLobbies();

  }, [lobbies]);

  // const [lobbies, setLobbies] = useState([
  //   {
  //     name: "Lobby 1",
  //     game: "Game 1",
  //     id: 1,

  //   },
  //   {
  //     name: "Lobby 2",
  //     game: "Game 2",
  //     id: 2,
  //   },
  //   {
  //     name: "Lobby 3",
  //     game: "Game 3",
  //     id: 3,
  //   },
  //   {
  //     name: "Lobby 4",
  //     game: "Game 1",
  //     id: 4,
  //   },
  //   {
  //     name: "Lobby 5",
  //     game: "Game 4",
  //     id: 5,
  //   },
  //   {
  //     name: "Lobby 6",
  //     game: "Game 4",
  //     id: 6,
  //   },
  //   {
  //     name: "Lobby 7",
  //     game: "BLOPS",
  //     id: 7,
  //   },
  // ]);

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "game",
      label: "GAME",
    },
    {
      key: "id",
      label: "ID",
    },
  ];

  const [filterValue, setFilterValue] = React.useState("");
  const [filterSelection, setFilterSelection] = React.useState<Selection>(
    new Set(["search for lobby name"]),
  );
  const chosenSelection = React.useMemo(
    () => Array.from(filterSelection).join(", ").replaceAll("_", " "),
    [filterSelection],
  );

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredLobbies = [...lobbies];

    if (hasSearchFilter && chosenSelection == "search for lobby name") {
      filteredLobbies = filteredLobbies.filter((lobby) =>
        lobby.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    } else if (hasSearchFilter && chosenSelection == "search for game") {
      filteredLobbies = filteredLobbies.filter((lobby) =>
        lobby.game.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredLobbies;
  }, [lobbies, filterValue, filterSelection]);

  const onSearchChange = React.useCallback((value) => {
    if (value != "") {
      setFilterValue(value);
      setTablePage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const tableTopContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-center">
          <Input
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            value={filterValue}
            autoFocus
            placeholder="Search"
            onValueChange={onSearchChange}
            variant="bordered"
          ></Input>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {chosenSelection}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection={true}
              selectionMode="single"
              selectedKeys={filterSelection}
              onSelectionChange={setFilterSelection}
            >
              <DropdownItem key="search for lobby name">Search For Lobby Name</DropdownItem>
              <DropdownItem key="search for game">Search For Game</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <LobbyCreator/>
        </div>
      </div>
    );
  }, [filterValue, filterValue, chosenSelection]);

  const [tablePage, setTablePage] = React.useState(1);
  const rowsPerTablePage = 5;

  const tablePages = Math.ceil(filteredItems.length / rowsPerTablePage);

  const items = React.useMemo(() => {
    const start = (tablePage - 1) * rowsPerTablePage;
    const end = start + rowsPerTablePage;

    return filteredItems.slice(start, end);
  }, [filteredItems, tablePage]);

  function selectLobby(selection:any) {
    setSelectedLobby(selection);
    // alert(selection.id);
  } 

  // selectedLobby will be a JS Set object
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  const [selectedLobby, setSelectedLobby] = useState<Selection>(new Set());
  const [selectedLobbyID, setSelectedLobbyID] = useState("");
  return (
    <div>
      <div className="place-content-center grid gap-y-12 my-64">
        <Table
          topContent={tableTopContent}
          removeWrapper={true}
          color="primary"
          // selectionMode="single"
          selectionMode="multiple"
          selectionBehavior="replace"
          selectedKeys={selectedLobby}
          onSelectionChange={setSelectedLobby}
          // onRowAction={(key) => alert('/' + key)}
          onRowAction={(key) => router.push(`/` + key)}
          bottomContent={
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-3 items-end">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={tablePage}
                  total={tablePages}
                  onChange={(tablePage) => setTablePage(tablePage)}
                ></Pagination>
                {/* route to selected lobby */}
                <Button className="bg-purple-800 text-white" onClick={() => alert("double-click row to join lobby!")}>
                  <p> Join Lobby {selectedLobby} </p>
                </Button>
              </div>
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={items}
            emptyContent={"No lobbies found, create your own to get started!"}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
