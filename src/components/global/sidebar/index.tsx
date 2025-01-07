"use client";
import { usePath } from "@/hooks/sidebar";
import VeronicaLogo from "@/icons/veronica-logo";
import React from "react";
import SidebarItems from "./sidebar-items";
import { Separator } from "@/components/ui/separator";
import { HelpDuoToneWhite } from "@/icons";
import ClerkAuthState from "../clerk-auth-state";
import { Subscription } from "../subscription";
import UpgradeCard from "./upgrade-card";

type Props = {
  slug: string;
};

const Sidebar = ({ slug }: Props) => {
  const { page, pathname } = usePath();

  return (
    <div
      className={
        "w-[250px] radial fixed left-0 lg:inline-block border-[#545454] bg-gradient-to-b from-[#eec12f] via-[#171717] to-[#eec12f] hidden bottom-0 top-0 m-3 rounded-3xl overflow-hidden  "
      }
    >
      <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop-blur__safari backdrop-blur-3xl border-2 border-[#545454] border-opacity-50 rounded-3xl overflow-y-scroll hide-scrollbar">
        <div className="flex gap-x-2 items-center p-5 justify-center">
          <VeronicaLogo />
        </div>
        <div className="flex flex-col py-3">
          <SidebarItems page={page} slug={slug} />
        </div>
        <div className="px-16">
          <Separator orientation="horizontal" className="bg-[#5C5C5F]" />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex  gap-x-2 items-center">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Profile</p>
          </div>
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-[#9B9CA0]">Help</p>
          </div>
        </div>
        <Subscription type="FREE">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </Subscription>
      </div>
    </div>
  );
};

export default Sidebar;
