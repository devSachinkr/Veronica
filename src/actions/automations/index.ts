"use server";

import { Prisma } from "@prisma/client";
import { onCurrentUser } from "../auth";
import {
  addPost,
  createAutomation,
  findAllAutomations,
  findAutomation,
  onAddLintener,
  onDeleteKeyword,
  onSaveKeyword,
  onSaveTrigger,
  onUpdateAutomation,
} from "./queries";
import { findUserDetails } from "../auth/queries";

export const createAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const res = await createAutomation({
      clerkId: user.data.id,
    });

    if (res.status === 200) {
      return {
        status: 200,
        message: "Automation created successfully!",
      };
    } else {
      return {
        status: 400,
        message: "Error creating automation!",
      };
    }
  } catch (error) {
    console.log("Automation create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const res = await findAllAutomations({
      clerkId: user.data.id,
    });
    if (res.status === 200) {
      return {
        status: 200,
        message: "Automation Get successfully!",
        data: res.data,
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
      data: res.data,
    };
  } catch (error) {
    console.log("Automation Get error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const getAutomationInfo = async ({ id }: { id: string }) => {
  await onCurrentUser();
  try {
    const res = await findAutomation({ id });
    if (res.status === 200) {
      return {
        status: 200,
        data: res.data,
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
    };
  } catch (error) {
    console.log("Automation Get error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const updateAutomation = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Prisma.AutomationUpdateInput>;
}) => {
  await onCurrentUser();
  try {
    const res = await onUpdateAutomation({ id, data });
    if (res.status === 200) {
      return {
        status: 200,
        message: "Automation updated successfully!",
      };
    }
    return {
      status: 400,
      message: "Error updating automation!",
    };
  } catch (error) {
    console.log("Automation update error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const createListner = async (data: {
  data: Prisma.ListenerUncheckedCreateInput;
}) => {
  await onCurrentUser();
  try {
    const res = await onAddLintener({
      ...data,
    });
    if (res.status === 200) {
      return {
        status: 200,
        message: "Listener created successfully!",
      };
    }
    return {
      status: 400,
      message: "Error creating listener!",
    };
  } catch (error) {
    console.log("Listener create error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const saveTriger = async ({
  data,
}: {
  data: Prisma.TriggerUncheckedCreateInput & {
    triggers: string[];
  };
}) => {
  await onCurrentUser();
  try {
    const res = await onSaveTrigger({ ...data });
    if (res.status === 200) {
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

export const saveKeyword = async ({
  data,
}: {
  data: Prisma.KeywordUncheckedCreateInput;
}) => {
  await onCurrentUser();
  try {
    const res = await onSaveKeyword({
      ...data,
    });
    if (res.status === 200) {
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

export const deleteKeyword = async ({
  data,
}: {
  data: Prisma.KeywordWhereUniqueInput;
}) => {
  await onCurrentUser();
  try {
    const res = await onDeleteKeyword({ ...data });
    if (res.status === 200) {
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

export const getProfilePosts = async () => {
  const user = await onCurrentUser();
  try {
    const res = await findUserDetails({ clerkId: user.data.id });
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${res?.data?.integrations[0]?.token}`
    );
    const parsed = await posts.json();
    if (parsed) {
      return {
        status: 200,
        data: parsed,
      };
    }
    return {
      status: 400,
      message: "Error fetching posts!",
    };
  } catch (error) {
    console.log("Error fetching posts: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const attachPosts = async ({
  data,
  automationId,
}: {
  data: Prisma.PostUncheckedCreateInput[];
  automationId: string;
}) => {
  await onCurrentUser();
  try {
    const res = await addPost({ ...data }, automationId);
    if (res.status === 200) {
      return {
        status: 200,
        message: "Post attached successfully!",
      };
    }
    return {
      status: 400,
      message: "Error attaching post!",
    };
  } catch (error) {
    console.log("Error attaching post: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

export const activateAutomation = async ({
  data,
}: {
  data: Partial<Prisma.AutomationUpdateInput>;
}) => {
  await onCurrentUser();
  try {
    const res = await onUpdateAutomation({
      id: data.id?.toString() as string,
      data,
    });
    if (res.status === 200) {
      return {
        status: 200,
        message: `Automation ${
          data.active ? "activated" : "deactivated"
        } `,
      };
    }
    return {
      status: 400,
      message: "Error updating automation!",
    };
  } catch (error) {
    console.log("Automation update error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};
