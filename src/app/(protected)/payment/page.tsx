import { onSubscribe } from "@/actions/payment";
import React from "react";
import { redirect } from "next/navigation";
import GradientText from "@/components/global/gradient-text";
type Props = {
  searchParams: {
    session_id?: string;
    cancel?: boolean;
  };
};

const page = async ({ searchParams: { session_id, cancel } }: Props) => {
  if (session_id) {
    const customer = await onSubscribe({ session_id });
    if (customer.status === 200) {
      return redirect("/dashboard");
    }

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <GradientText element="h3" className="text-5xl font-bold">
          404
        </GradientText>
        <p className="text-xl font-bold">
          Oops! Something went wrong. Please try again.
        </p>
      </div>
    );
  }
  if (cancel) {
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <GradientText element="h3" className="text-5xl font-bold">
        404
      </GradientText>
      <p className="text-xl font-bold">
        Oops! Something went wrong. Subscription cancelled.
      </p>
    </div>;
  }
};

export default page;
