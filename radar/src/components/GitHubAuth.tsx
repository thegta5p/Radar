import { GithubAuthProvider,  signInWithPopup, getAuth } from "firebase/auth";
import {app} from "../firebase";
import {Button} from "@nextui-org/button";

import { useState } from "react";

const GitHubAuth = () => {

  const [ghUsername, setGhUsername] = useState("");

  const auth = getAuth(app);
  const handleGitHubClick = async () => {
    const provide = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provide);
      var userName = result.user.displayName;
      
      // pass the username to the backend, create a user profile for them
      setGhUsername(userName);
      console.log(userName);
      window.location.href = "/main-page";

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