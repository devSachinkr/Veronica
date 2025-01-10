import React from "react";
import AutomationBreadcrumbs from "./_components/automation-bread-crumbs";
import { CircleAlert } from "lucide-react";
import Trigger from "@/components/global/automations/trigger";
import { getAutomationInfo } from "@/actions/automations";
import { PrefetchUserAutomation } from "@/lib/react-query/prefetch-data/automation";
import { query } from "@/lib/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: {
    slug: string;
    id: string;
  };
};
export async function generateMetadata({ params: { slug, id } }: Props) {
  const info = await getAutomationInfo({ id });
  return {
    title: info?.data?.name || ""
  };
}
const page = async ({ params: { slug, id } }: Props) => {
  await PrefetchUserAutomation({ queryClient: query, automationId: id });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationBreadcrumbs id={id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-[4px] rounded-xl flex flex-col bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700  gap-y-3">
          <div className="w-full   p-2 rounded-xl flex flex-col bg-[#1E1E1E] gap-y-3 z-50">
            <div className="flex gap-x-2">
              <CircleAlert className="text-demon-Yellow" size={20} />
              When...
            </div>
            <Trigger id={id} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
