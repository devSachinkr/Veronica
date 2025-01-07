import { VERONICA_CONSTANTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  page: string | undefined;
  slug: string;
};

const SidebarItems = ({ page, slug }: Props) => {
  return VERONICA_CONSTANTS.sidebarItems.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}/${
        item.label.toLowerCase() === "home" ? "/" : item.label.toLowerCase()
      }`}
      className={cn(
        "flex gap-x-2 rounded-full p-3 ",
        page === item.label.toLowerCase() && "bg-[#f1c240]",
        page === slug && item.label.toLowerCase() === "home"
          ? "bg-[#050505]"
          : " text-[#9B9Ca0]"
      )}
    >
      <item.icon />
      {item.label}
    </Link>
  ));
};

export default SidebarItems;
