import React, { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import GitHubAuth from "@/components/GitHubAuth";


export default function LoginCard() {

  return (
    <Card>
      <CardBody>
        <div className="relative flex w-full grow flex-col items-center justify-center">
          <p className="text-center md:text-[32px] font-semibold pl-10 pr-10 mt-10 mb-10">
            Login To Get Started
          </p>
          <div className="text-center mb-10">
            <GitHubAuth />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
