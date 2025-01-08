import { VERONICA_CONSTANTS } from "@/lib/constants";
import React from "react";
import IntegrationCard from "./_components/integration-card";

type Props = {
  params: {
    slug: string;
  };
};

const page = ({ params: { slug } }: Props) => {
  return (
    <div className="flex justify-center pt-10 md:pt-0">
      <div className="flex flex-col w-full lg:w-8/12 "> 
        {VERONICA_CONSTANTS.integrationPlatforms.map((card, index) => (
          <IntegrationCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default page;
