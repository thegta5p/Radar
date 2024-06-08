import { GithubAuthProvider,  signInWithPopup, getAuth } from "firebase/auth";
import {app} from "../firebase";
import {Button} from "@nextui-org/button"

const GitHubAuth = () => {
  const auth = getAuth(app);
  const handleGitHubClick = async () => {
    const provide = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provide);
      var userName = result.user.displayName;
      console.log(userName);

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button onClick={handleGitHubClick}>Sign in with GitHub</Button>
    </div>
  )

}

export default GitHubAuth;