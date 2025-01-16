"use server";

import { db } from "@/lib/prisma";
import { Integrations } from "@prisma/client";

export const updateIntegrations = async (data: Partial<Integrations>) => {
  if (!data.id)
    return {
      status: 404,
      message: "Integration ID is required!",
    };
  try {
    const res = await db.integrations.update({
      where: {
        id: data.id,
      },
      data: { ...data },
    });
    if (res) {
      return {
        status: 200,
        message: "Integration updated successfully!",
      };
    }
    return {
      status: 400,
      message: "Integration not found!",
    };
  } catch (error) {
    console.log("Integration update error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const getKeyWordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  try {
    const res = await db.automation.findUnique({
      where: {
        id: automationId,
      },
      include: {
        Dms: dm,
        Trigger: {
          where: {
            type: dm ? "DM" : "COMMENT",
          },
        },
        Listener: true,
        User: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
            integrations: {
              select: {
                token: true,
              },
            },
          },
        },
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Automation found successfully!",
        data: res,
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
    };
  } catch (error) {
    console.log("getKeyWordAutomation error: ", error);
  }
};

export const trackResponse = async ({
  automationId,
  type,
}: {
  automationId: string;
  type: "COMMENT" | "DM";
}) => {
  switch (type) {
    case "COMMENT": {
      return await db.listener.update({
        where: {
          automationId,
        },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      });
    }
    case "DM": {
      return await db.listener.update({
        where: {
          automationId,
        },
        data: {
          dmCount: {
            increment: 1,
          },
        },
      });
    }
  }
};

export const getIntegration = async (clerkId: string) => {
  return await db.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        where: {
          name: 'INSTAGRAM',
        },
      },
    },
  })
};

export const onCreateIntegration = async (
  userId: string,
  token: string,
  expireDate: Date,
  instaId: string
) => {
  try {
    const res = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        integrations: {
          create: {
            name: "INSTAGRAM",
            token,
            expiresAt: expireDate,
            instagramId: instaId,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Integration created successfully!",
        data: res,
      };
    }
    return {
      status: 400,
      message: "Integration not found!",
    };
  } catch (error) {
    console.log("Integration create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};
