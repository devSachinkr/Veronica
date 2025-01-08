import React from "react";
import AutomationBreadcrumbs from "./_components/automation-bread-crumbs";
import { Warning } from "@/icons";
import { CircleAlert } from "lucide-react";
import Trigger from "@/components/global/automations/trigger";

type Props = {
  params: {
    slug: string;
    id: string;
  };
};

const page = ({ params: { slug, id } }: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-20">
      <AutomationBreadcrumbs id={id} />
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
        <div className="flex gap-x-2">
          <CircleAlert className="text-demon-Yellow" size={20} />
          When...
        </div>
        <Trigger id={id} />
      </div>
    </div>
  );
};

export default page;
