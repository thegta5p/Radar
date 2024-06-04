import { GoogleLogout } from "react-google-login";

const cliendID =
  "945465335228-kstnrqd7gqhg9dt9s75dqgtto9ra2u3c.apps.googleusercontent.com";

function Logout() {
  const onSuccess = () => {
    alert("Logout made successfully");
  };

  return (
    <div className="inline-block w-auto" id="signOutButton">
      <GoogleLogout
        clientId={cliendID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
