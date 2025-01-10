"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createAutomation = async ({ clerkId }: { clerkId: string }) => {
  if (!clerkId)
    return {
      status: 404,
      message: "Clerk ID is required!"
    };
  try {
    const res = await db.user.update({
      where: {
        clerkId
      },
      data: {
        automations: {
          create: {}
        }
      }
    });
    if (res) {
      return {
        status: 200,
        message: "Automation created successfully!"
      };
    } else {
      return {
        status: 500,
        message: "Error creating automation!"
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error creating automation!"
    };
  }
};

export const findAllAutomations = async ({
  clerkId
}: Prisma.UserWhereUniqueInput) => {
  if (!clerkId) {
    return {
      status: 404,
      message: "Clerk ID is required!"
    };
  }
  try {
    const res = await db.user.findUnique({
      where: {
        clerkId
      },
      select: {
        automations: {
          orderBy: {
            createdAt: "asc"
          },
          include: {
            Keywords: true,
            Listener: true
          }
        }
      }
    });
    if (res?.automations.length) {
      return {
        status: 200,
        data: res.automations
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
      data: []
    };
  } catch (error) {
    console.log("Automation details error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};

export const findAutomation = async ({ id }: { id: string }) => {
  if (!id) {
    return {
      status: 404,
      message: "Automation ID is required!"
    };
  }
  try {
    const res = await db.automation.findUnique({
      where: {
        id
      },
      select: {
        Listener: true,
        Keywords: true,
        Trigger: true,
        Posts: true,
        name: true,
        User: {
          select: {
            subscription: true,
            integrations: true
          }
        }
      }
    });
    if (res) {
      return {
        status: 200,
        data: res
      };
    }
    return {
      status: 400,
      message: "Automation not found!"
    };
  } catch (error) {
    console.log("Automation details error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};

export const onUpdateAutomation = async ({
  id,
  data
}: {
  id: string;
  data: Partial<Prisma.AutomationUpdateInput>;
}) => {
  if (!id) {
    return {
      status: 404,
      message: "Automation ID is required!"
    };
  }
  try {
    const res = await db.automation.update({
      where: {
        id
      },
      data: { ...data }
    });
    if (res) {
      return {
        status: 200,
        message: "Automation updated successfully!"
      };
    } else {
      return {
        status: 400,
        message: "Error updating automation!"
      };
    }
  } catch (error) {
    console.log("Automation update error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};
