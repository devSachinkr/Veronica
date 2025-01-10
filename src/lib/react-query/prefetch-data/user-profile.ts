import { QueryClient } from "@tanstack/react-query";
import { prefetchData } from "./prefetch-client-data";
import { getUserInfo } from "@/actions/auth";
import { getAllAutomations } from "@/actions/automations";

export const PrefetchUserProfile = async (queryClient: QueryClient) => {
  return await prefetchData({
    queryClient,
    queryKey: ["user-profile"],
    queryFn: () => getUserInfo()
  });
};

export const PrefetchUserAutomations = async (queryClient: QueryClient) => {
  return await prefetchData({
    queryClient,
    queryKey: ["user-automations"],
    queryFn: () => getAllAutomations()
  });
};