// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Switch } from "@nextui-org/react";

import React from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      // defaultSelected // default is light theme?
      onValueChange={(value) => setTheme(value ? "dark" : "light")}
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    ></Switch>
  );
}
