import React, { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import LoginButton from "@/components/login";
import { gapi } from "gapi-script";

const clientID =
  "945465335228-kstnrqd7gqhg9dt9s75dqgtto9ra2u3c.apps.googleusercontent.com";

/*
  export default function LoginCard() {
  useEffect(() => {
    async function start() {
      const gapiInstance = (await import("gapi-script")).gapi;
      gapiInstance.load("client:auth2", async () => {
        await gapiInstance.client.init({
          clientID: clientID,
          scope: "",
        });
      });
    }
    start();
  }, []);
  */

/* start() stuff

 const gapiInstance = (await import("gapi-script")).gapi;
      gapiInstance.load("client:auth2", async () => {
        await gapiInstance.client.init({
          clientID: clientID,
          plugin_name: "test",
          scope: "",
        });
      });
*/

export default function LoginCard() {
  useEffect(() => {
    async function start() {}
    start();
  }, []);

  //<LoginButton />
  return (
    <Card>
      <CardBody>
        <div className="relative flex w-full grow flex-col items-center justify-center">
          <p className="text-center md:text-[32px] font-semibold pl-10 pr-10 mt-10 mb-10">
            Login or Sign up
          </p>
          <div className="text-center mb-10">
            <LoginButton></LoginButton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
