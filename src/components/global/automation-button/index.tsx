"use client";
import React, { useMemo } from "react";
import GradientButton from "../gradient-button";
import { Loader } from "../loader";
import { AutomationDuoToneWhite } from "@/icons";
import { Activity } from "lucide-react";
import { useCreateAutomation } from "@/hooks/automations";
import { v4 } from "uuid";

type Props = {};

const CreateAutomationButton = (props: Props) => {
  const { isPending, mutate } = useCreateAutomation();
  return (
    <GradientButton
      btnClassName="w-full "
      textClassName="pt-2 flex items-center justify-center gap-x-3 "
      className="w-[99%] bg-background-90/90"
      element="div"
      buttonProps={{
        onClick: () =>
          mutate({
           
          })
      }}
    >
      <Loader loading={isPending}>
        <Activity className="text-demon-Yellow " size={25} />
        <p className="lg:inline hidden">Create Automation</p>
      </Loader>
    </GradientButton>
  );
};

export default CreateAutomationButton;
