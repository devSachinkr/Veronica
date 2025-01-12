"use server";

import { stripe } from "@/lib/stripe";
import { onCurrentUser } from "../auth";
import { updateSubscription } from "./queries";

export const onSubscribe = async ({ session_id }: { session_id: string }) => {
  const user = await onCurrentUser();
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session) {
      const res = await updateSubscription({
        id: user.data.id,
        data: {
          customerId: session.customer as string,
          plan: "PRO",
        },
      });
      if (res.status === 200) {
        return {
          status: 200,
          message: "Subscription updated successfully!",
        };
      }
      return {
        status: 400,
        message: "Error updating subscription!",
      };
    }
    return {
      status: 404,
      message: "Error updating subscription!",
    };
  } catch (error) {
    console.log("Subscription update error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};
