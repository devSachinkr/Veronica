"use client";
import { Separator } from "@/components/ui/separator";
import { useAutomationInfo, useTriggers } from "@/hooks/automations";
import { VERONICA_CONSTANTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GradientButton from "../../gradient-button";
import GradientText from "../../gradient-text";
import { Loader } from "../../loader";
import ActivateTrigger from "../activate-trigger";
import ThenAction from "../then/then-action";
import TriggerButton from "../trigger-button";
import Keywords from "./keywords";
type Props = {
  id: string;
};

const Trigger = ({ id }: Props) => {
  const { automationInfo } = useAutomationInfo({ automatonId: id });
  const { isPending, onSetTrigger, types, onSaveTrigger } = useTriggers({ id });
  if (automationInfo?.data && automationInfo.data.Trigger?.length > 0) {
    return (
      <div className="flex flex-col gap-y-6 items-center">
        <ActivateTrigger
          type={automationInfo.data.Trigger[0].type as "COMMENT" | "DM"}
          keywords={automationInfo.data.Keywords}
        />
        {automationInfo?.data?.Trigger?.length > 1 && (
          <>
            <div className="relative w-6/12 mb-4">
              <div
                className="absolute transform bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 p-[3px]
        -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 rounded-full aspect-square
       "
              >
                <div className=" rounded-full w-full h-full bg-background-80 p-[4px] aspect-square flex items-center justify-center">
                  <GradientText className="font-semibold">or</GradientText>
                </div>
              </div>
              <Separator
                orientation="horizontal"
                className="bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 h-[2px]"
              />
            </div>
            <ActivateTrigger
              type={automationInfo.data.Trigger[1].type as "COMMENT" | "DM"}
              keywords={automationInfo.data.Keywords}
            />
          </>
        )}

        {!automationInfo.data.Listener && <ThenAction id={id} />}
      </div>
    );
  }
  return (
    <TriggerButton label=" Add Trigger">
      <div className="flex flex-col gap-y-2">
        {VERONICA_CONSTANTS.automationTriggers.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              "hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-[4px] ",
              !types?.find((t) => t === trigger.type)
                ? " bg-background-80"
                : " bg-gradient-to-br from-demon-Yellow via-yellow-200 to-yellow-700"
            )}
          >
            <div className=" rounded-xl w-full bg-background-80 gap-y-2  p-3 flex flex-col">
              <div className="flex gap-x-2 items-center">
                {trigger.icon}
                <p className="">{trigger.label}</p>
              </div>
              <p className="text-text-secondary">{trigger.description}</p>
            </div>
          </div>
        ))}
        <Keywords id={id} />
        <GradientButton
          className="pt-2 w-full select-none"
          btnClassName="w-full "
          buttonProps={{
            onClick: () => onSaveTrigger(),
            disabled: isPending || types?.length === 0,
          }}
        >
          <Loader loading={isPending}>Create Trigger</Loader>
        </GradientButton>
      </div>
    </TriggerButton>
  );
};

export default Trigger;
