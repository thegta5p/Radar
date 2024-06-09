import { GithubAuthProvider,  signInWithPopup, getAuth } from "firebase/auth";
import {app} from "../firebase";
import {Button} from "@nextui-org/button";

import { useState, useContext } from "react";

import SocketContext from "./SocketContext";

import { useRouter } from "next/navigation";

const GitHubAuth = () => {

  const socket = useContext(SocketContext);
  const router = useRouter();

  const [ghUsername, setGhUsername] = useState("");

  const auth = getAuth(app);
  const handleGitHubClick = async () => {
    const provide = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provide);
      var userName = result.user.displayName;
      var email = result.user.email;
      var uid = result.user.uid;
      // pass the username to the backend, create a user profile for them
      socket.emit("user_login", userName, email, uid);
      // await socket.on("login_success", (login_id) => {
      //   localStorage.setItem("login_id", login_id);
      // });
      // setGhUsername(userName);
      // console.log(userName);

      router.push("/main-page");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button onClick={handleGitHubClick}>Sign in with GitHub <span className="font-bold"> {ghUsername} </span> </Button>
    </div>
  )

}

export default GitHubAuth;