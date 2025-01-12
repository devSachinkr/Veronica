'use client'
import { useQueryUser } from "@/hooks/user";
import React from "react";

type Props = {
  children: React.ReactNode;
  type: "FREE" | "PRO";
};
export const Subscription = ({ children, type }: Props) => {
  const { user } = useQueryUser();
  return user?.data?.subscription?.plan === type && children;
};
