import React from "react";
import PaymentButton from "../../payment-button";

const UpgradeCard = () => {
  return (
    <div className="bg-[#252525] p-3 rounded-2xl flex flex-col gap-y-3">
      <span className="text-sm">
        Upgrade to
        <span className="bg-gradient-to-r from-demon-Yellow  to-demon-Yellow/85 bg-clip-text text-transparent font-bold">
          {" "}
          SMART AI
        </span>
       
      </span>
      <p className="text-sm font-light text-[#9B9CA0]">Upgrade to the ultimate AI assistant</p>
      <PaymentButton/>
    </div>
  );
};

export default UpgradeCard;
