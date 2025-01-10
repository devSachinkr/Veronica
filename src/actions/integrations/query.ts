"use server";

import { db } from "@/lib/prisma";
import { Integrations } from "@prisma/client";

export const updateIntegrations = async (data: Partial<Integrations>) => {
  if (!data.id)
    return {
      status: 404,
      message: "Integration ID is required!"
    };
  try {
    const res = await db.integrations.update({
      where: {
        id: data.id
      },
      data: { ...data }
    });
    if (res) {
      return {
        status: 200,
        message: "Integration updated successfully!"
      };
    }
    return {
      status: 400,
      message: "Integration not found!"
    };
  } catch (error) {
    console.log("Integration update error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};
