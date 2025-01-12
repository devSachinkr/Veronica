"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const updateSubscription = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Prisma.SubscriptionUpdateInput>;
}) => {
  if (!id) {
    return {
      status: 404,
      message: "User ID is required!",
    };
  }
  try {
    const res = await db.user.update({
      where: {
        clerkId: id,
      },
      data: {
        subscription: {
          update: {
            data: {
              customerId: data.customerId || null,
              plan: data.plan || "FREE",
            },
          },
        },
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Subscription updated successfully!",
      };
    }
    return {
      status: 400,
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
