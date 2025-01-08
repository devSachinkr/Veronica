"use client";
import GradientButton from "@/components/global/gradient-button";
import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { INTEGRATION_PLATFORMS_PROPS } from "@/lib/constants/integrations-platforms";
import React from "react";

type Props = INTEGRATION_PLATFORMS_PROPS;

const IntegrationCard = ({ description, icon, name, strategy }: Props) => {
  switch (strategy) {
    case "INSTAGRAM": {
      return (
        <div className="border-[1px] border-dashed border-demon-Yellow rounded-2xl gap-x-5 p-5 flex items-center">
          {icon}
          <div className="flex flex-col flex-1">
            <GradientText element="h3" className="text-xl">
              {name.toLocaleUpperCase()}
            </GradientText>
            <p className="text-base w-full md:w-10/12 xl:w-8/12 2xl:w-6/12 text-gray-500">
              {description}
            </p>
          </div>

          <GradientButton
            className="bg-background-80/80"
            textClassName="pt-2"
            buttonProps={{
              onClick: () => alert("Connect"),
            //   disabled: integrated?.name === strategy
            }}
          >
            {/* {integrated ? "Connected" : "Connect"} */}
            Connect             
          </GradientButton>
        </div>
      );
    }
    default:
      return <div>No integrations</div>;
  }
};

export default IntegrationCard;
