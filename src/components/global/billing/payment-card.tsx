import { VERONICA_CONSTANTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import GradientText from "../gradient-text";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  plan: "PRO" | "FREE";
  landing?: boolean;
};

const PaymentCard = ({ label, plan, landing }: Props) => {
  return (
    <div
      className={cn(
        label !== plan
          ? "bg-in-active"
          : "bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
        "p-[2px] rounded-xl overflow-hidden "
      )}
    >
      <div
        className={cn(
          landing && "radial--gradient--pink",
          "flex flex-col rounded-xl pl-5 py-5  pr-10 bg-background-90 "
        )}
      >
        {landing ? (
          <h2 className="text-2xl">
            {label === "PRO" && "Premium Plan"}
            {label === "FREE" && "Standard"}
          </h2>
        ) : (
          <GradientText element="h2" className="text-2xl">
            {label === plan
              ? "Your current plan"
              : plan === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </GradientText>
        )}
        <p className="text-text-secondary text-sm mb-2">
          Benefits of plan as per your choice
        </p>
        {label === "PRO" ? (
          <GradientText element="span" className="font-bold text-3xl mb-3">
            Smart AI
          </GradientText>
        ) : (
          <p className="font-bold text-3xl text-text-secondary">Standard</p>
        )}

        {label === "PRO" ? (
          <GradientText element="h3" className="font-bold text-xl mb-2">
            <b>₹149</b>/month
          </GradientText>
        ) : (
          <p className=" text-xl mb-2">Free</p>
        )}
        {VERONICA_CONSTANTS.pricingPlans[label === "PRO" ? 1 : 0].features.map(
          (feature, index) =>
            label === "PRO" ? (
              <GradientText
                key={index}
                className="font-semibold  mt-2 flex gap-4 "
              >
                <BadgeCheck className="text-emerald-500" /> {feature}.
              </GradientText>
            ) : (
              <p key={index} className="text-text-secondary mt-2 flex gap-4 ">
                <BadgeCheck /> {feature}.
              </p>
            )
        )}
        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              label === "PRO"
                ? "bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 text-white"
                : "bg-background-80 text-white hover:text-background-80"
            )}
          >
            {label === plan
              ? "GET STARTED"
              : plan === "PRO"
              ? "FREE"
              : "GET STARTED"}
          </Button>
        ) : (
          <Button
            className="rounded-full mt-5 bg-background-80 text-white hover:text-background-80"
            disabled={label === plan}
          >
            {label === plan
              ? "ACTIVE"
              : plan === "PRO"
              ? "DOWNGRADE"
              : "UPGRADE"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
