"use client";
import { usePath } from "@/hooks/sidebar";
import { VERONICA_CONSTANTS } from "@/lib/constants";
import { MenuIcon, Search } from "lucide-react";
import React from "react";
import Sheet from "../sheet";
import SidebarItems from "../sidebar/sidebar-items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import { Subscription } from "../subscription";
import UpgradeCard from "../sidebar/upgrade-card";
import VeronicaLogo from "@/icons/veronica-logo";
import CreateAutomation from "../create-automation";

type Props = {
  slug: string;
};

const Navbar = ({ slug }: Props) => {
  const { page, pathname } = usePath();
  const currentPage =
    VERONICA_CONSTANTS.pageBreadcrumbs.includes(page as string) ||
    page === slug;

  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end items-center">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet trigger={<MenuIcon size={25} />} className="lg:hidden">
              <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop-blur__safari backdrop-blur-3xl   rounded-3xl overflow-y-scroll hide-scrollbar">
                <div className="flex gap-x-2 items-center p-5 justify-center text-3xl font-bold text-demon-Yellow">
                  Veronica
                </div>
                <div className="flex flex-col py-3">
                  <SidebarItems page={page} slug={slug} />
                </div>
                <div className="px-16">
                  <Separator
                    orientation="horizontal"
                    className="bg-[#5C5C5F]"
                  />
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
            </Sheet>
          </span>
          <Search className="cursor-not-allowed" />
          <CreateAutomation />
        </div>
      </div>
    )
  );
};
export default Navbar;
