"use client";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter, ScrollShadow, Spacer, Textarea, Button } from "@nextui-org/react";
import SocketContext from "@/components/SocketContext";
import EditUserProfileButton from "./EditUser"; // Ensure this is the correct path

class MessageData {
  content: string;
  author: string;
  timeStamp: string;

  constructor(content: string, author: string) {
    this.content = content;
    this.author = author;
    this.timeStamp = new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString();
  }
}

export default function Chat({ lobbyID } : { lobbyID: string }) {
  const socket = useContext(SocketContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [sessionUsername, setSessionUsername] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);
  const [messageList, setMessageList] = useState<MessageData[]>([]);
  const messageListEndRef = useRef(null);

  const toggleEditButton = () => setShowEditButton(!showEditButton);

  const handleUsernameSubmit = (username: string) => {
    setSessionUsername(username);
    toggleEditButton(); // Hide the edit button once the username is submitted
  };

  async function getMessages() {
    await fetch(`http://localhost:8080/messages/${lobbyID}`)
      .then(res => res.json())
      .then(data => {
        setMessageList(data);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (sessionUsername) {
      socket.emit("join_chat", sessionUsername, lobbyID);
    }
    getMessages();
  }, [sessionUsername, lobbyID]); // Effect runs when `sessionUsername` or `lobbyID` changes

  const sendMessage = () => {
    if (currentMessage != "" && sessionUsername != "") {
      const newMessage = new MessageData(currentMessage, sessionUsername);
      socket.emit("send_message", newMessage, lobbyID);
      setCurrentMessage("");
      setMessageList([...messageList, newMessage]);
    }
  };

  const scrollToBottom = () => {
    messageListEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Card className="h-full w-96" shadow="none">
      <CardHeader className="justify-center">
        <Button flat onClick={toggleEditButton}>
          Nickname: <span className="font-bold text-purple-500">{sessionUsername || "Set Nickname"}</span>
        </Button>
        {showEditButton && <EditUserProfileButton onNicknameSubmit={handleUsernameSubmit} />}
      </CardHeader>

      <CardBody className="h-96">
        <ScrollShadow visibility="top">
          {messageList.map((m, index) => (
            <Message key={index} {...m} />
          ))}
          <div ref={messageListEndRef} />
        </ScrollShadow>
      </CardBody>

      <CardFooter className="flex">
        <Textarea
          className="grow"
          placeholder="Type message here, press Enter to send..."
          value={currentMessage}
          onValueChange={setCurrentMessage}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              sendMessage();
            }
          }}
        />
      </CardFooter>
    </Card>
  );
}

function Message({ content, author, timeStamp }) {
  return (
    <Card className="m-3" shadow="sm" radius="none">
      <CardHeader className="flex justify-between">
        <p className="text-base font-bold text-left text-purple-500">{author}</p>
        <p className="text-sm text-right">{timeStamp}</p>
      </CardHeader>
      <CardBody className="text-base">{content}</CardBody>
    </Card>
  );
}
