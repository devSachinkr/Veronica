"use client";
import React from "react";
import GradientButton from "../gradient-button";
import { Loader } from "../loader";
import { Activity } from "lucide-react";

type Props = {};

const ActivateAutomationButton = (props: Props) => {
  return (
    <GradientButton
      className="bg-background-80/80 w-[110px] sm:w-[125px]"
      textClassName="pt-2 flex items-center gap-x-2"
      element="div"
      buttonProps={{
        onClick: () => alert("Connect")
        //   disabled: integrated?.name === strategy
      }}
    >
      <Loader loading={false}>
        <Activity className="text-demon-Yellow lg:inline hidden" />
        Activate
      </Loader>
    </GradientButton>
  );
};

export default ActivateAutomationButton;
