"use client";
import { useAutomations } from "@/hooks/automations";
import GradientText from "../gradient-text";

const MetricsCard = () => {
  const { data } = useAutomations();
  const comments = data?.data?.reduce((curr, next) => {
    return curr + next.Listener?.commentCount! || 0;
  }, 0);

  const dms = data?.data?.reduce((curr, next) => {
    return curr + next.Listener?.dmCount! || 0;
  }, 0);
  return (
    <div className="w-full   p-[4px] rounded-xl flex flex-col bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 relative h-full ">
      <div className="w-full   p-8  rounded-xl flex  bg-[#1E1E1E]/95  h-full gap-x-2">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="p-5 border-[1px] flex flex-col gap-y-20 rounded-xl w-full lg:w-6/12 border-demon-Yellow border-dashed border-opacity-55 "
          >
            {i == 1 ? (
              <div>
                <GradientText element="h2">Comments</GradientText>
                <p className="text-sm text-text-secondary">On your posts</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <GradientText element="h2">
                  Direct Messages
                </GradientText>
                <p className="text-sm text-text-secondary">On your DMs</p>
              </div>
            )}
            {i == 1 ? (
              <div>
                <h3 className="text-3xl font-bold">100%</h3>
                <p className="text-sm text-text-secondary">
                  {comments} out of {comments} comments replied
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-3xl font-bold">100%</h3>
                <p className="text-sm text-text-secondary">
                  {dms} out of {dms} DMs replied
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsCard;
