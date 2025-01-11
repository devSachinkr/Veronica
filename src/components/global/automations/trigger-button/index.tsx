import React from "react";
import Popover from "../../popover";
import { BlueAddIcon } from "@/icons";
import GradientText from "../../gradient-text";

type Props = {
  label: string;
  children: React.ReactNode;
};

const TriggerButton = ({ label, children }: Props) => {
  return (
    <Popover
      className="w-[400px] "
      trigger={
        <div className="border-2 border-dashed w-full border-demon-Yellow hover:opacity-80 cursor-pointer transition duration-100 rounded-xl flex gap-x-2 justify-center items-center p-5 ">
          <BlueAddIcon />
          <GradientText>{label}</GradientText>
        </div>
      }
    >         
        {children}
    </Popover>
  );
};

export default TriggerButton;
