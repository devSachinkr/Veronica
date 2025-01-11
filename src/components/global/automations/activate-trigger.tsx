import { InstagramBlue, Plane } from "@/icons";
import React from "react";
import GradientButton from "../gradient-button";

type Props = {
  type: "COMMENT" | "DM";
  keywords: {
    id: string;
    word: string;
    automationId: string | null;
  }[];
};

const ActivateTrigger = ({ type, keywords }: Props) => {
  return (
    <div className="bg-background-80 p-3 rounded-xl w-full border-[1px] border-demon-Yellow border-dashed border-opacity-55">
      <div className="flex gap-x-2 items-center ">
        {type === "COMMENT" ? <InstagramBlue /> : <Plane />}
        <p className="text-lg">
          {type === "COMMENT"
            ? "When someone comment on my post"
            : "When someone sends me a direct message"}
        </p>
      </div>
      <p className="text-text-secondary">
        {type === "COMMENT"
          ? "If the user comment on a post that is setup to listen for keyword, I will send you a notification"
          : "If the user sends me a direct message that is setup to listen for keyword, I will send you a notification"}
      </p>
      <div className="flex gap-2 mt-5 flex-wrap ">
        {keywords?.length > 0 &&
          keywords.map((keyword, index) => (
            <GradientButton key={index} element="div" className="pt-2" textClassName="capitalize">
              {keyword.word}
            </GradientButton>
          ))}
      </div>
    </div>
  );
};

export default ActivateTrigger;
