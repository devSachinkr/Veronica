import { Plane, SmartAi, TinyInstagram } from "@/icons";
import { v4 } from "uuid";

export type AUTOMATION_LISTENERS_PROPS = {
  id: string;
  label: string;
  icon: JSX.Element;
  description: string;
  type: "SMART_AI" | "MESSAGE";
};
export type AUTOMATION_TRIGGER_PROPS = {
  id: string;
  label: string;
  icon: JSX.Element;
  description: string;
  type: "COMMENT" | "DM";
};



export const AUTOMATION_TRIGGERS: AUTOMATION_TRIGGER_PROPS[] = [
  {
    id: v4(),
    label: 'User comments on my post',
    icon: <TinyInstagram />,
    description: 'Select if you want to automate comments on your post',
    type: 'COMMENT',
  },
  {
    id: v4(),
    label: 'User sends me a dm with a keyword',
    icon: <TinyInstagram />,
    description: 'Select if you want to automate DMs on your profile',
    type: 'DM',
  },
]
export const AUTOMATION_LISTENERS: AUTOMATION_LISTENERS_PROPS[] = [
    {
        id: v4(),
        label: 'Send the user a message',
        icon: <Plane />,
        description: 'Enter the message that you want to send the user.',
        type: 'MESSAGE',
      },
      {
        id: v4(),
        label: 'Let Smart AI take over',
        icon: <SmartAi />,
        description: 'Tell AI about your project. (Upgrade to use this feature)',
        type: 'SMART_AI',
      },
    
]