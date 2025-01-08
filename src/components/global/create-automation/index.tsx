import { Button } from "@/components/ui/button";
import React from "react";
import { Loader } from "../loader";
import { AutomationDuoToneWhite } from "@/icons";

type Props = {};

const CreateAutomation = (props: Props) => {
  return (
    <Button className="lg:px-10 py-6  bg-demon-Yellow/35 hover:opacity-80 text-white border-2 border-demon-Yellow/80 hover:bg-demon-Yellow/50 rounded-full">
      <Loader loading={false}>
        <AutomationDuoToneWhite  color="#fff"/>
        <p className="lg:inline hidden">Create Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
