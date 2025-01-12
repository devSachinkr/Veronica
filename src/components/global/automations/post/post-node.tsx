"use client";
import { Separator } from "@/components/ui/separator";
import { useAutomationInfo } from "@/hooks/automations";
import { InstagramBlue } from "@/icons";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import GradientText from "../../gradient-text";

type Props = {
  id: string;
};

const PostNode = ({ id }: Props) => {
  const { automationInfo } = useAutomationInfo({ automatonId: id });
  return (
    automationInfo?.data &&
    automationInfo.data.Posts.length > 0 && (
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
            If they comment on your this post...
          </GradientText>

          <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2 border-[1px] border-dashed border-demon-Yellow border-opacity-55">
            <div className="flex gap-x-2 items-center ">
              <InstagramBlue />
              <p className=" text-lg font-bold">These Post</p>
            </div>
            {automationInfo?.data.Posts.map((p) => (
              <div
                key={p.postId}
                className="relative w-4/12 aspect-square rounded-lg  cursor-pointer overflow-hidden"
              >
                <Image fill sizes="100vw" src={p.media} alt={"image"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default PostNode;
