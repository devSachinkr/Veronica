"use client";

import ToastNotify from "@/components/global/toast/ToastNotify";
import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient
} from "@tanstack/react-query";

const useMutationData = ({
  mutationKey,
  mutationFn,
  onSuccess,
  queryKey
}: {
  mutationKey: MutationKey;
  mutationFn: MutationFunction<any, any>;
  onSuccess?: () => void;
  queryKey?: string;
}) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }
      return ToastNotify({
        title:
          data?.status === 201 || data?.status === 200 ? "Success" : "Oops!",
        msg: data.message || ""
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: [queryKey?.toString()]
      });
    }
  });

  return { mutate, isPending };
};

const useMutationDataState = ({
  mutationKey
}: {
  mutationKey: MutationKey;
}) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (data) => {
      return {
        variables: data.state.variables as any,
        status: data.state.status
      };
    }
  });

  const latestVariables = data[data.length - 1];
  return { latestVariables };
};

export { useMutationData , useMutationDataState };
