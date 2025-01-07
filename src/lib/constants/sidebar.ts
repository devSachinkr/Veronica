import { AutomationDuoToneWhite, ContactsDuoToneWhite, HomeDuoToneWhite, RocketDuoToneWhite, SettingsDuoToneWhite } from "@/icons";
import React from "react";
import { v4 } from "uuid";
type Props = {
  label: string;
  id: string;
};

export type SIDEBAR_ITEMS_PROPS = {
  icon: React.ComponentType;
} & Props;

export const SIDEBAR_ITEMS: SIDEBAR_ITEMS_PROPS[] = [
  {
    id: v4(),
    label: "Home",
    icon: HomeDuoToneWhite
  },
  {
    id:v4(),
    label: "Contacts",
    icon: ContactsDuoToneWhite
  },
  {
    id: v4(),
    label: "Automations",
    icon:AutomationDuoToneWhite
  },
  {
    id: v4(),
    label:"Integrations",
    icon:RocketDuoToneWhite,
  },
  {
    id: v4(),
    label: "Settings",
    icon: SettingsDuoToneWhite
  }
];
