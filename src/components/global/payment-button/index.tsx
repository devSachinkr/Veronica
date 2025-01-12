"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import GradientButton from "../gradient-button";
import { useSubscription } from "@/hooks/subscription";
import { Loader } from "../loader";

type Props = {};

const PaymentButton = (props: Props) => {
  const { isProcessing, onSubscribe } = useSubscription();
  return (
    <GradientButton
      btnClassName="w-full"
      textClassName="pt-2"
      className="w-[97%]"
      buttonProps={{
        disabled: isProcessing,
        onClick: onSubscribe,
      }}
    >
      <Loader loading={isProcessing}>Upgrade</Loader>
    </GradientButton>
  );
};

export default PaymentButton;
