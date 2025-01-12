"use server";

import { db } from "@/lib/prisma";
import { Listener, Prisma } from "@prisma/client";

export const createAutomation = async ({ clerkId }: { clerkId: string }) => {
  if (!clerkId)
    return {
      status: 404,
      message: "Clerk ID is required!",
    };
  try {
    const res = await db.user.update({
      where: {
        clerkId,
      },
      data: {
        automations: {
          create: {},
        },
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Automation created successfully!",
      };
    } else {
      return {
        status: 500,
        message: "Error creating automation!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error creating automation!",
    };
  }
};

export const findAllAutomations = async ({
  clerkId,
}: Prisma.UserWhereUniqueInput) => {
  if (!clerkId) {
    return {
      status: 404,
      message: "Clerk ID is required!",
    };
  }
  try {
    const res = await db.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        automations: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            Keywords: true,
            Listener: true,
          },
        },
      },
    });
    if (res?.automations.length) {
      return {
        status: 200,
        data: res.automations,
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
      data: [],
    };
  } catch (error) {
    console.log("Automation details error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const findAutomation = async ({ id }: { id: string }) => {
  if (!id) {
    return {
      status: 404,
      message: "Automation ID is required!",
    };
  }
  try {
    const res = await db.automation.findUnique({
      where: {
        id,
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
            integrations: true,
          },
        },
        active: true,
      },
    });
    if (res) {
      return {
        status: 200,
        data: res,
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
    };
  } catch (error) {
    console.log("Automation details error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const onUpdateAutomation = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Prisma.AutomationUpdateInput>;
}) => {
  if (!id) {
    return {
      status: 404,
      message: "Automation ID is required!",
    };
  }
  try {
    const res = await db.automation.update({
      where: {
        id,
      },
      data: { ...data },
    });
    if (res) {
      return {
        status: 200,
        message: "Automation updated successfully!",
      };
    } else {
      return {
        status: 400,
        message: "Error updating automation!",
      };
    }
  } catch (error) {
    console.log("Automation update error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const onAddLintener = async ({
  data,
}: {
  data: Prisma.ListenerUncheckedCreateInput;
}) => {
  try {
    const res = await db.automation.update({
      where: {
        id: data.automationId,
      },
      data: {
        Listener: {
          create: {
            prompt: data?.prompt,
            listener: data?.listener,
            commentReply: data?.commentReply,
            commentCount: data?.commentCount,
            dmCount: data?.dmCount,
          },
        },
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Listener created successfully!",
      };
    } else {
      return {
        status: 400,
        message: "Error creating listener!",
      };
    }
  } catch (error) {
    console.log("Listener create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const onSaveTrigger = async (
  data: Prisma.TriggerUncheckedCreateInput & {
    triggers: string[];
  }
) => {
  if (!data.automationId)
    return {
      status: 404,
      message: "Automation ID is required!",
    };
  try {
    if (data.triggers?.length === 2) {
      const res = await db.automation.update({
        where: {
          id: data.automationId,
        },
        data: {
          Trigger: {
            createMany: {
              data: [{ type: data.triggers[0] }, { type: data.triggers[1] }],
            },
          },
        },
      });
      if (res) {
        return {
          status: 200,
          message: "Trigger created successfully!",
        };
      }
      return {
        status: 400,
        message: "Error creating trigger!",
      };
    }
    const createTrigger = await db.automation.update({
      where: {
        id: data.automationId,
      },
      data: {
        Trigger: {
          create: {
            type: data.triggers?.[0],
          },
        },
      },
    });
    if (createTrigger) {
      return {
        status: 200,
        message: "Trigger created successfully!",
      };
    }
    return {
      status: 400,
      message: "Error creating trigger!",
    };
  } catch (error) {
    console.log("Trigger create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const onSaveKeyword = async (
  data: Prisma.KeywordUncheckedCreateInput
) => {
  if (!data.automationId)
    return {
      status: 404,
      message: "Automation ID is required!",
    };
  try {
    const res = await db.automation.update({
      where: {
        id: data.automationId,
      },
      data: {
        Keywords: {
          create: {
            word: data.word,
          },
        },
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Keyword created successfully!",
      };
    }
    return {
      status: 400,
      message: "Error creating keyword!",
    };
  } catch (error) {
    console.log("Keyword create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const onDeleteKeyword = async (data: Prisma.KeywordWhereUniqueInput) => {
  if (!data.id)
    return {
      status: 404,
      message: "Keyword ID is required!",
    };
  try {
    const res = await db.keyword.delete({
      where: {
        id: data.id,
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Keyword deleted successfully!",
      };
    }
    return {
      status: 400,
      message: "Error deleting keyword!",
    };
  } catch (error) {
    console.log("Keyword delete error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const addPost = async (
  data: Prisma.PostUncheckedCreateInput[],
  automationId: string
) => {
  if (automationId)
    return {
      status: 404,
      message: "Automation ID is required!",
    };
  try {
    const res = await db.automation.update({
      where: {
        id: automationId,
      },
      data: {
        Posts: {
          createMany: {
            data: data,
          },
        },
      },
    });
    if (res) {
      return {
        status: 200,
        message: "Post created successfully!",
      };
    }
    return {
      status: 400,
      message: "Post not found!",
    };
  } catch (error) {
    console.log("Post create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};
