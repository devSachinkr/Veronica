"use client";
import { useListner } from "@/hooks/automations";
import React from "react";
import TriggerButton from "../trigger-button";
import { VERONICA_CONSTANTS } from "@/lib/constants";
import { Subscription } from "../../subscription";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import GradientButton from "../../gradient-button";
import { Loader } from "../../loader";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const { isPending, onSubmit, register, onSetListener, listener } = useListner(
    { id }
  );

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2">
        {VERONICA_CONSTANTS.automationListeners.map((lis) =>
          lis.type === "SMART_AI" ? (
            <Subscription key={lis.id} type="PRO">
              <div
                onClick={() => onSetListener(lis.type)}
                key={lis.id}
                className={cn(
                  listener === lis.type
                    ? " bg-gradient-to-br from-demon-Yellow via-yellow-200 to-yellow-700 "
                    : "bg-background-80",
                  "p-[4px] rounded-xl flex flex-col cursor-pointer hover:opacity-80 transition duration-100"
                )}
              >
                <div className=" rounded-xl w-full bg-background-80 gap-y-2  p-3 flex flex-col">
                  <div className="flex gap-x-2 items-center">
                    {lis.icon}
                    <p className="">{lis.label}</p>
                  </div>
                  <p className="text-text-secondary">{lis.description}</p>
                </div>
              </div>
            </Subscription>
          ) : (
            <div
              onClick={() => onSetListener(lis.type)}
              key={lis.id}
              className={cn(
                listener === lis.type
                  ? " bg-gradient-to-br from-demon-Yellow via-yellow-200 to-yellow-700 "
                  : "bg-background-80",
                "p-[4px] rounded-xl flex flex-col cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className=" rounded-xl w-full bg-background-80 gap-y-2  p-3 flex flex-col">
                <div className="flex gap-x-2 items-center">
                  {lis.icon}
                  <p className="">{lis.label}</p>
                </div>
                <p className="text-text-secondary">{lis.description}</p>
              </div>
            </div>
          )
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
          <Textarea
            placeholder={
              listener === "SMART_AI"
                ? "Tell AI about your project. Make sure this prompt is relevant to your project. otherwise, Ai will not understand your request. And generate wrong results."
                : "Enter the message that you want to send the user."
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register("reply")}
            placeholder="Reply to the user"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />

          <GradientButton
            element="div"
            buttonProps={{
              type: "submit",
            }}
            className="pt-2"
            btnClassName="self-end mt-3"
          >
            <Loader loading={isPending}>Add Listener</Loader>
          </GradientButton>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
