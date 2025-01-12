"use client";
import React from "react";
import GradientButton from "../gradient-button";
import { Loader } from "../loader";
import { Activity } from "lucide-react";
import { useAutomationInfo } from "@/hooks/automations";
import { useMutationData } from "@/hooks/mutation";
import { activateAutomation } from "@/actions/automations";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  const { automationInfo } = useAutomationInfo({ automatonId: id });
  const { isPending, mutate } = useMutationData({
    mutationKey: ["activate"],
    mutationFn: (data: { state: boolean }) =>
      activateAutomation({
        data: {
          active: data.state,
          id,
        },
      }),
    queryKey: "automation-info",
  });
  return (
    <GradientButton
      className="bg-background-80/80 w-[110px] sm:w-[125px]"
      textClassName="pt-2 flex items-center gap-x-2"
      element="div"
      buttonProps={{
        onClick: () =>
          mutate({
            state: !automationInfo?.data?.active,
          }),
        //   disabled: integrated?.name === strategy
      }}
    >
      <Loader loading={isPending}>
        <Activity className="text-demon-Yellow lg:inline hidden" />
        {automationInfo?.data?.active ? "Deactivate" : "Activate"}
      </Loader>
    </GradientButton>
  );
};

export default ActivateAutomationButton;
