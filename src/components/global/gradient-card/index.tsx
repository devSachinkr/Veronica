import { DASHBOARD_CARD_PROPS } from "@/lib/constants/dashboard";
import React from "react";
import GradientText from "../gradient-text";
import GradientButton from "../gradient-button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = DASHBOARD_CARD_PROPS & {
  slug: string;
};

const GradientCard = ({ description, id, subtitle, title, slug }: Props) => {
  return (
    <div className="w-full lg:w-10/12 xl:w-6/12 p-[4px] rounded-xl flex flex-col bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 relative  ">
      <div className="w-full   p-8  rounded-xl flex flex-col bg-[#1E1E1E]/95  h-full ">
        <div>
          <GradientText element="h2">{title}</GradientText>
          <p className="text-text-secondary">{subtitle}</p>
        </div>
        <div className="flex justify-between items-center z-40 gap-x-10">
          <p className="text-text-secondary text-sm">{description}</p>
          <Link href={`/dashboard/${slug}/automations`}>
            <GradientButton
              element="div"
              textClassName="pt-2"
              className="w-[98%] "
            >
                GO
            </GradientButton>
          </Link>
        </div>
        <div className="w-6/12 h-full absolute radial--double--gradient--cards--top top-0 left-0 z-10"/>
        <div className="w-6/12 h-full absolute radial--double--gradient--cards--bottom top-0 left-1/2
        right-0 z-10"/> 
      </div>
    </div>
  );
};

export default GradientCard;
