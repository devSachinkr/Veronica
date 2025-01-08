"use client";
import { usePath } from "@/hooks/sidebar";
import Link from "next/link";
import React from "react";
import GradientText from "../gradient-text";
import { cn } from "@/lib/utils";
import GradientButtonLink from "../gradient-button-link";
import { Button } from "@/components/ui/button";

const AutomationList = () => {
  const { pathname } = usePath();

  return (
    <div className="flex flex-col gap-y-3 ">
      <Link
        className="bg-[#1D1D1D] hover:opacity-80 transition duration-300 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
        href={`${pathname}/sdfhsdfdsfs`}
      >
        <div className="flex flex-col flex-1 items-start">
          <GradientText element="h2" className="text-xl font-semibold">
            Automation Name
          </GradientText>
          <p className="text-[#9B9CA0] text-sm font-light mb-2">
            This is a description of the automation
          </p>
          <div className="flex gap-x-2 flex-wrap mt-3">
            <div
              className={cn(
                "rounded-full px-4 py-1 capitalize",
                (0 + 1) % 1 == 0 &&
                  "bg-keyword-green/15 border-2 border-keyword-green",
                (1 + 1) % 2 == 0 &&
                  "bg-keyword-purple/15 border-2 border-keyword-purple",
                (2 + 1) % 3 == 0 &&
                  "bg-keyword-yellow/15 border-2 border-keyword-yellow",
                (3 + 1) % 4 == 0 &&
                  "bg-keyword-red/15 border-2 border-keyword-red"
              )}
            >
              get Started
            </div>
          </div>
          <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
            <p className="text-sm text-[#bfc0c3] ">No Keyword</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <p className="capitalize text-sm font-light text-[#9B9CA0]">
            January 1, 2025
          </p>
          <GradientButtonLink
            element="BUTTON"
            className="w-full bg-background-80 hover:bg-opacity-70"
            gradientText
          >
            Smart AI
          </GradientButtonLink>
          <Button className="bg-background-80 hover:bg-opacity-80 text-white hover:text-background-80">
            Standard
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default AutomationList;
