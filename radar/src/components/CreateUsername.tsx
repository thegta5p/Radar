"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import react, { useState, useMemo } from "react";
// import * as users from "../../api/users";

async function sendUserName(username) {
  var username = username;
  var session_token = localStorage["session_token"];
  console.log(session_token);
  var response = await users.ChangeUsername(username, session_token);
  if (response.status != 200) {
    alert("Cannot change username");
    return;
  } else {
    window.location.href = "/main-page";
    alert("Username set to " + username);
  }
}
// import * as usersAPI from "../../api/users";

/*
async function sendUserName(username) {
    //var username = username
    //var session_token = localStorage['session_token']
    //var response = users.changeUsername(username, session_token)
        
    const s:string = Math.random().toString().substring(0, 8);
    localStorage.setItem('session_token', s);

    window.location.href = "/main-page";

    const response = await usersAPI.ChangeUsername(username, localStorage.getItem('session_token'));

    if (response.status == 200) {
        alert("Username set to " + username + ". session_token: " + localStorage.getItem('session_token'));
    }
    else {
        alert("bad response from ChangeUsername() !");
    }

}
*/

const CreateUsername = ({ isOpen }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [username, setUsername] = useState("t");
  const [isFirstTime, setIsFirstTime] = useState(true);

  const isInvalid = useMemo(() => {
    if (
      username === "" ||
      username.charAt(0) === " " ||
      username.charAt(username.length - 1) === " "
    ) {
      setIsDisabled(true);
      return true;
    }

    if (!isFirstTime) {
      setIsDisabled(false);
    }
    return false;
  }, [username, isFirstTime]);

  return (
    <>
      <div>
        <Modal isOpen={isOpen}>
          <ModalContent>
            <ModalHeader>Set Username Current</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                placeholder="Username"
                errorMessage={isInvalid && "Please enter a username"}
                isInvalid={isInvalid}
                onValueChange={(value) => {
                  setUsername(value);
                  setIsFirstTime(false);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-green-500"
                isDisabled={isDisabled}
                onPress={() => sendUserName(username)}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

//export default CreateUsername;
