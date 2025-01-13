import { onIntegrate } from "@/actions/integrations";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    code: string;
  };
};

const page = async ({ searchParams: { code } }: Props) => {
  if (code) {
    const user = await onIntegrate({ code: code.split("#_")[0] });
    if (user.status === 200) {
      return redirect(
        `/dashboard/${user.data?.firstName}${user.data?.lastName}/integrations/instagram`
      );
    }
  }
  return redirect("/sign-up");
};

export default page;
