import ActivateAutomationButton from "@/components/global/activate-automation-button";
import { PencilDuoToneBlack } from "@/icons";
import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const AutomationBreadcrumbs = ({ id }: Props) => {
  return (
    <div
      className="rounded-full w-full p-5 bg-[#18181B1A]
    flex justify-between items-center"
    >
      <div className="flex items-center gap-x-3">
        <p className="text-[#9B9CA0]">Automations</p>
        <ChevronRight className="text-demon-Yellow" />
        <span className="flex gap-x-3 items-center">
          <p className="text-[#9B9CA0]">name</p>
          <span className="cursor-pointer hover:opacity-75 duration-100 transition">
            <PencilDuoToneBlack />
          </span>
        </span>
      </div>
      
      <ActivateAutomationButton />
    </div>
  );
};

export default AutomationBreadcrumbs;
