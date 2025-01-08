import CreateAutomationButton from "@/components/global/automation-button";
import AutomationList from "@/components/global/automation-list";
import GradientText from "@/components/global/gradient-text";
import { Check } from "@/icons";
import { BadgeCheck } from "lucide-react";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = ({ params: { slug } }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
         <AutomationList/>
      </div>

      <div className="lg:col-span-2 ">
        <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active ">
          <div>
            <GradientText element="h2" className="text-xl">
              Automations
            </GradientText>
            <p className="text-text-secondary ">
              All the live Automations will show here
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium">
                      Direct traffic towards website
                    </h3>
                    <p className="text-text-secondary text-sm">
                      January 1st, 2025
                    </p>
                  </div>
                  <BadgeCheck className="text-demon-Yellow" />
                </div>
              ))}
          </div>
          <CreateAutomationButton />
        </div>
      </div>
    </div>
  );
};

export default page;
