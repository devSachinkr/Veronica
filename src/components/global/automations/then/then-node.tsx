"use client";
import { Separator } from "@/components/ui/separator";
import { useAutomationInfo } from "@/hooks/automations";
import { Plane, SmartAi } from "@/icons";
import { CircleAlert } from "lucide-react";
import GradientText from "../../gradient-text";
import PostButton from "./post-button";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { automationInfo, isFetching } = useAutomationInfo({ automatonId: id });
  const commentTrigger = automationInfo?.data?.Trigger?.find(
    (t) => t.type === "COMMENT"
  );

  return !automationInfo?.data?.Listener ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 xl:w-6/12 p-[4px] rounded-xl flex flex-col bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 relative gap-y-3 ">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50 ">
        <span className="h-[9px] w-[9px] bg-demon-Yellow rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px]  border-demon-Yellow "
        />
        <span className="h-[9px] w-[9px] bg-demon-Yellow rounded-md" />
      </div>

      <div className="w-full   p-8 rounded-xl flex flex-col bg-[#1E1E1E]/95 gap-y-3 z-50 ">
        <GradientText
          element="h2"
          className="text-lg flex gap-x-2 items-center"
        >
          <CircleAlert className="text-demon-Yellow" size={20} />
          Then...
        </GradientText>
        <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2 border-[1px] border-dashed border-demon-Yellow border-opacity-55">
          <div className="flex gap-x-2 items-center">
            {automationInfo?.data?.Listener.listener === "MESSAGE" ? (
              <Plane />
            ) : (
              <SmartAi />
            )}
            <p className=" text-lg">
              {automationInfo?.data?.Listener.listener === "MESSAGE"
                ? "Send a message to the user"
                : "Let Smart AI take care of it"}
            </p>
          </div>
          <div className="font-light text-text-secondary">
            {automationInfo?.data?.Listener.prompt}
          </div>
          {automationInfo?.data.Posts.length > 0 ? (
            <></>
          ) : commentTrigger ? (
            <PostButton id={id} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ThenNode;
