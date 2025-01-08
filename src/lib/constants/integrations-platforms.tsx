import { Instagram } from "lucide-react";
import React from "react";
export type INTEGRATION_PLATFORMS_PROPS = {
  name: string;
  icon: React.ReactNode;
  description: string;
  strategy: "INSTAGRAM";
};

export const INTEGRATION_PLATFORMS: INTEGRATION_PLATFORMS_PROPS[] = [
  {
    name: "Instagram",
    description:
      "Instagram is a social media platform that allows users to share photos and videos with their friends and followers.",
    strategy: "INSTAGRAM",
    icon: <Instagram className="text-pink-500" size={40} />,
  }
];
