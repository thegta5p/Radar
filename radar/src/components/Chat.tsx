"use client";
import { useState, useEffect, useRef, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  ScrollShadow,
  Spacer,
  Button,
  Textarea,
  Divider,
} from "@nextui-org/react";
import SocketContext from "@/components/SocketContext";
// import { io } from "socket.io-client";

class MessageData {
  // pass MessageData objects around
  content: string;
  author: string;
  timeStamp: string;
  // uid: string; // uid not used 

  constructor(content: string, author: string) {
    this.content = content;
    this.author = author;
    this.timeStamp = new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString();
    // this.uid = localStorage.getItem("uid") || "-1";
  }
}

export default function Chat({lobbyID} : {lobbyID: string}) {
  const socket = useContext(SocketContext);

  // TODO: pass in the lobby_ID and username from DB
  // for now, prompt the user to pick a username
  const [currentMessage, SetCurrentMessage] = useState("");

  // default values set for lobbyID and username

  const [sessionUsername, SetSessionUsername] = useState("");

  const [serverMessageList, SetServerMessageList] = useState<MessageData[]>([]); // messageList : MessageData[] // array of MessageData objects

  // local message list
  const [messageList, SetMessageList] = useState<MessageData[]>([]); // messageList : MessageData[] // array of MessageData objects
  // it's important to use useState vs a a normal variable here because react re-renders when useStates are modified
  // normal variables are reset upon render, easy to get out sync with visual components

  const messageListEndRef = useRef(null);
  

  const scrollToBottom = () => {
    messageListEndRef.current?.scrollIntoView({ behavior: "smooth" }); // '?' indicates that prop might be undefined
  };
    
  async function getMessages() {
    await fetch("http://localhost:8080/messages/" + lobbyID)
      .then(
        (res) => res.json(),
        (err) => console.error(err)
      )
      .then((data) => {
        SetServerMessageList(data);
      });
  }
  
  // run on initial render
  useEffect(() =>  {
    async function getNickname() {
      await fetch("http://localhost:8080/users/" + localStorage.getItem("uid"))
        .then(
          (res) => res.json(),
          (err) => console.error(err)
        )
        .then((data) => {
          SetSessionUsername(data.nickname);
        });
    }
    
    function ChatInit() {
      getNickname();
      socket.emit("join_chat", sessionUsername, lobbyID);
    };

    ChatInit();

  }, []); // empty dependency array passed in, so effect will only run once, will not run on every re-render

  const SendMessage = () => {
    if (currentMessage != "" && sessionUsername != "") {
      console.log("sending message: ", currentMessage);
      let newMessage = new MessageData(currentMessage, sessionUsername); // push message to messageList array

      socket.emit("send_message", newMessage, lobbyID, localStorage.getItem("uid"));

      // might need to get rid of this line, messages will be sent to server
      // server will update the db, and send that data back to everyone in the room
      // SetMessageList([...messageList, newMessage]); // don't use mutate the array, set it to a new array
    }
    SetCurrentMessage(""); // should clear input field
  };

  // listener for recieving messages
  // will run when dependencies change/rerender
  useEffect(() => {
    getMessages();
    if (messageList.length != serverMessageList.length) {
      SetMessageList(serverMessageList);
    }

    // serverMessageList will change constantly, need to check if we should update local messages
  }, [serverMessageList]); // 2nd arg is for dependencies which might change


  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
      <Card className="h-full w-96" shadow="none">
        <CardHeader className="justify-center">
          <Button disabled>
            Nickname:
            <div className="font-bold text-purple-500">{sessionUsername}</div>
          </Button>
        </CardHeader>

        <CardBody className="h-96">
          <Spacer y={2} />

          <ScrollShadow visibility="top">
            {messageList.map((m) => (
              <Message
                key={m.timeStamp}
                content={m.content}
                author={m.author}
                timeStamp={m.timeStamp}
              />
            ))}
            {/* key is needed for react to disgtinguish between elements/for production build to compile */}
            <div ref={messageListEndRef} />
          </ScrollShadow>
        </CardBody>

        <CardFooter className="flex">
          <Textarea
            className="grow"
            type="text"
            placeholder="Type message here, press Enter to send..."
            value={currentMessage}
            onValueChange={SetCurrentMessage}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                // emit event and create message component when user presses enter
                event.preventDefault();
                SendMessage();
              }
            }}
          />
        </CardFooter>
      </Card>
  );
}

function Message(data: MessageData) {
  return (
    <Card className="m-3" shadow="sm" radius="none">
      <CardHeader className="flex justify-between">
        <p className="text-base font-bold text-left text-purple-500">
          {data.author}
        </p>
        <p className="text-sm text-right">
          {data.timeStamp}
          {/* time, formated as HR:MIN:SEC*/}
        </p>
      </CardHeader>
      <CardBody className="text-base">{data.content}</CardBody>
    </Card>
  );
}