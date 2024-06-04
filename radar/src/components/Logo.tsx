"use cleint";
import Icon from "@/components/RadarIcon.svg";
import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex cursor-default items-center text-[32px] text-purple-500 font-semibold leading-none text-5xl">
      <div>Radar </div>
      <Image src={Icon} height={60} width={60} alt={Icon} />
    </div>
  );
}
