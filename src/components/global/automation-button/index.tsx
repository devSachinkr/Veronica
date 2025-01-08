import React from "react";
import GradientButton from "../gradient-button";
import { Loader } from "../loader";
import { AutomationDuoToneWhite } from "@/icons";
import { Activity } from "lucide-react";

type Props = {};

const CreateAutomationButton = (props: Props) => {
  return (
    <GradientButton
      btnClassName="w-full "
      textClassName="pt-2 flex items-center justify-center gap-x-3 "
      className="w-[99%] bg-background-90/90"
      element="div"
    >
      <Loader loading={false}>
        <Activity className="text-demon-Yellow " size={25} />
        <p className="lg:inline hidden">Create Automation</p>
      </Loader>
    </GradientButton>
  );
};

export default CreateAutomationButton;
