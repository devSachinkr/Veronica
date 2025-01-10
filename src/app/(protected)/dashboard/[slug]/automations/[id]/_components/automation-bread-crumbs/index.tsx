"use client";
import ActivateAutomationButton from "@/components/global/activate-automation-button";
import { Input } from "@/components/ui/input";
import { useAutomation, useEditAutomation } from "@/hooks/automations";
import { useMutationDataState } from "@/hooks/mutation";
import { PencilDuoToneBlack } from "@/icons";
import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const AutomationBreadcrumbs = ({ id }: Props) => {
  const { automationInfo } = useAutomation({ automatonId: id });
  const { disableEdit, enableEdit, edit, inputRef, isPending } =
    useEditAutomation({ automatonId: id });

  const { latestVariables } = useMutationDataState({
    mutationKey: ["update-automation"]
  });
  return (
    <div
      className="rounded-full w-full p-5 bg-[#18181B1A]
    flex justify-between items-center"
    >
      <div className="flex items-center gap-x-3">
        <p className="text-[#9B9CA0]">Automations</p>
        <ChevronRight className="text-demon-Yellow" />
        <span className="flex gap-x-3 items-center">
          {edit ? (
            <Input
              placeholder={
                isPending ? latestVariables?.variables : "Enter Automation Name"
              }
              className="bg-transparent h-auto outline-none text-base border-none p-0"
              ref={inputRef}
              
            />
          ) : (
            <p className="text-[#9B9CA0] truncate">
              {latestVariables?.variables
                ? latestVariables?.variables.name
                : automationInfo?.data?.name}
            </p>
          )}
          {edit ? (
            <></>
          ) : (
            <span
              className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4"
              onClick={enableEdit}
            >
              <PencilDuoToneBlack />
            </span>
          )}
        </span>
      </div>

      <ActivateAutomationButton />
    </div>
  );
};

export default AutomationBreadcrumbs;
