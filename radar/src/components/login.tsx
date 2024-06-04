import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
// import * as userAPI from "../../api/users";
import { user } from "@nextui-org/react";
import LoginButton from "./LoginButton";
//import { GoogleLogin } from "react-google-login";

// const cliendID =
//   "945465335228-kstnrqd7gqhg9dt9s75dqgtto9ra2u3c.apps.googleusercontent.com";

// var isValid = false;
// var currUsername = "";

// async function SendToken(googleToken) {
//   // var response = await userAPI.authenticateUser(googleToken);

//   if (response.status == 200) {
//     var data = response.data;
//     if (data.firstTimeLogin) {
//       isValid = true;
//       currUsername = data.username;
//     } else {
//       window.location.href = "/main-page";
//       localStorage.setItem("session_token", data.sessionToken);
//     }
//   } else {
//     window.location.href = "/";
//     alert("Cannot get status");
//     console.log(response.data);
//   }
// }

/*
    <div id="signInButton">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          SendToken(credentialResponse);
          if (isValid) {
            setIsOpen(true);
          }
        }}
        onError={() => {
          console.log("error");
        }}
      />
      <CreateUsername isOpen={isOpen} />
    </div>

*/

function Login() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="signInButton">
      <LoginButton></LoginButton>
    </div>
  );
}

export default Login;
