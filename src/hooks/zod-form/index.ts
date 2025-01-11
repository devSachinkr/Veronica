"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

export const useZodForm = ({
  mutation,
  schema,
  defaultValues,
}: {
  schema: ZodSchema;
  mutation: UseMutateFunction;
  defaultValues?: any;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation({ ...data });
    return reset();
  });

  return {
    onSubmit,
    register,
    errors,
    watch,
    reset,
  };
};
