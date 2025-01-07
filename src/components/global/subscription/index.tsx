import React from "react";

type Props = {
  children: React.ReactNode;
  type: "FREE" | "PRO";
};
export const Subscription = ({ children, type }: Props) => {
  return children;
};
