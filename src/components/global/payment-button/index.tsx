import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const PaymentButton = (props: Props) => {
  return (
    <Button className="bg-gradient-to-br text-[#242323] rounded-full from-demon-Yellow via-yellow-400 to-yellow-600 font-bold hover:from-demon-Yellow/80 hover:via-yellow-500 hover:to-yellow-700 text-sm transition-all duration-300 ">
      Upgrade
    </Button>
  );
};

export default PaymentButton;
