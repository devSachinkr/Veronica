'use client'
import React from "react";
import PaymentCard from "./payment-card";
import { useQueryUser } from "@/hooks/user";

type Props = {};

const Billing = (props: Props) => {
  const { user } = useQueryUser();
  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard label="PRO" plan={user?.data?.subscription?.plan!} />
      <PaymentCard label="FREE" plan={user?.data?.subscription?.plan!} />
    </div>
  );
};

export default Billing;
