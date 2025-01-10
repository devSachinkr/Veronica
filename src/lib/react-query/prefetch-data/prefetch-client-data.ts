import { QueryClient, QueryFunction } from "@tanstack/react-query";

export const prefetchData = async ({
  queryClient,
  queryKey,
  queryFn
}: {
  queryClient: QueryClient;
  queryKey: string[];
  queryFn: QueryFunction;
}) => {
  return await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: 60000,
  });
};
