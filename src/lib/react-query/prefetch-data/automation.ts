import { QueryClient } from "@tanstack/react-query";
import { prefetchData } from "./prefetch-client-data";
import { getAutomationInfo } from "@/actions/automations";

export const PrefetchUserAutomation = async ({
  queryClient,
  automationId
}: {
  queryClient: QueryClient;
  automationId: string;
}) => {
        return await prefetchData({
          queryClient,
          queryFn:()=>getAutomationInfo({ id: automationId }),
          queryKey: ["automation-info"],
        })
};
