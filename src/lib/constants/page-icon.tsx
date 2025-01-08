import { Activity, House, Rocket, Settings, UserRound } from "lucide-react";

export type PAGE_ICON_PROPS = {
  [page in string]: React.ReactNode;
};

export const PAGE_ICON: PAGE_ICON_PROPS = {
  AUTOMATIONS: <Activity className="text-[#eec12f] " size={30} />,
  CONTACTS: <UserRound className="text-[#eec12f] " size={30} />,
  INTEGRATIONS: <Rocket className="text-[#eec12f] " size={30} />,
  SETTINGS: <Settings className="text-[#eec12f] " size={30} />,
  HOME: <House className="text-[#eec12f] " size={30} />
};
