"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { gapi } from "gapi-script";
//import LoginBttn from "@/components/login";

import { GoogleOAuthProvider } from "@react-oauth/google";

const cliendID =
  "945465335228-kstnrqd7gqhg9dt9s75dqgtto9ra2u3c.apps.googleusercontent.com";

//<LoginBttn />
// <GoogleOAuthProvider clientId="945465335228-kstnrqd7gqhg9dt9s75dqgtto9ra2u3c.apps.googleusercontent.com">...</GoogleOAuthProvider>;

export default function LoginButton() {
  const [usernameValue, setUsernameValue] = React.useState("");
  const [invalidInput, setInvalidInput] = React.useState(true);

  const onUsernameChange = React.useCallback((value) => {
    if (value != "") {
      setUsernameValue(value);
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
      setUsernameValue("");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            value={usernameValue}
            autoFocus
            placeholder="Type in your username"
            onValueChange={onUsernameChange}
            variant="bordered"
          ></Input>
          <Button
            onPress={() => {
              //REDIRECT TO MAIN PAGE

              // TODO
                // make this a real route with next/Navigation router
              window.location.href = "/main-page";
              localStorage.setItem('session_username', usernameValue);
              alert("(LocalStorage) username set to: " + localStorage.getItem('session_username'));
            }}
            isDisabled={invalidInput}
            color={invalidInput ? "danger" : "success"}
            variant={invalidInput ? "bordered" : "shadow"}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
