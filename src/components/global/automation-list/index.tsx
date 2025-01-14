"use client";
import { Button } from "@/components/ui/button";
import { useAutomations } from "@/hooks/automations";
import { usePath } from "@/hooks/sidebar";
import { Empty } from "@/icons";
import { cn, getMonth } from "@/lib/utils";
import Link from "next/link";
import GradientButtonLink from "../gradient-button-link";
import GradientText from "../gradient-text";

const AutomationList = () => {
  const { pathname } = usePath();
  const { data } = useAutomations();

  if (data?.status !== 200) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <Empty />
        <GradientText element="h2" className="font-semibold">
          No Automation Found
        </GradientText>
      </div>
    );
  }
  console.log(data);
  return (
    <div className="flex flex-col gap-y-3 md:overflow-y-scroll md:max-h-[73vh] sm:overflow-x-hidden hide-scrollbar">
      {data?.data?.map((automation) => (
        <Link
          className="bg-[#1D1D1D] hover:opacity-80 transition duration-300 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
          href={`${pathname}/${automation.id}`}
          key={automation.id}
        >
          <div className="flex flex-col flex-1 items-start">
            <GradientText element="h2" className="text-xl font-semibold">
              {automation.name}
            </GradientText>

            {automation.Keywords.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                {automation.Keywords.map((k,idx) => (
                  <div
                    key={k.id}
                    className={cn(
                      "rounded-full px-4 py-1 capitalize",
                      (idx + 1) % 1 == 0 &&
                        "bg-keyword-green/15 border-2 border-keyword-green",
                      (idx + 1) % 2 == 0 &&
                        "bg-keyword-purple/15 border-2 border-keyword-purple",
                      (idx + 1) % 3 == 0 &&
                        "bg-keyword-yellow/15 border-2 border-keyword-yellow",
                      (idx + 1) % 4 == 0 &&
                        "bg-keyword-red/15 border-2 border-keyword-red"
                    )}
                  >
                    {k.word}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                <p className="text-sm text-[#bfc0c3] ">No Keyword</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {getMonth({ month: automation.createdAt.getUTCMonth() + 1 })}{" "}
              {automation.createdAt.getUTCDate() === 1
                ? `${automation.createdAt.getUTCDate()}st`
                : `${automation.createdAt.getUTCDate()}th`}{" "}
              {automation.createdAt.getUTCFullYear()}
            </p>
            {automation.Listener?.listener === "SMART_AI" ? (
              <GradientButtonLink
                element="BUTTON"
                className="w-full bg-background-80 hover:bg-opacity-70"
                gradientText
              >
                Smart AI
              </GradientButtonLink>
            ) : (
              <Button className="bg-background-80 hover:bg-opacity-80 text-white hover:text-background-80">
                Standard
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
