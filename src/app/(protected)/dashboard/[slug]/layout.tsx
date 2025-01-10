import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import {
  PrefetchUserAutomations,
  PrefetchUserProfile
} from "@/lib/react-query/prefetch-data/user-profile";
import { query } from "@/lib/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const layout = async ({ children, params: { slug } }: Props) => {
  await PrefetchUserProfile(query);
  await PrefetchUserAutomations(query);
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="p-3 ">
        <Sidebar slug={slug} />
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
          <Navbar slug={slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default layout;
