"use server";

import { Automation, Prisma } from "@prisma/client";
import { onCurrentUser } from "../auth";
import {
  createAutomation,
  findAllAutomations,
  findAutomation,
  onUpdateAutomation
} from "./queries";

export const createAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const res = await createAutomation({
      clerkId: user.data.id
    });

    if (res.status === 200) {
      return {
        status: 200,
        message: "Automation created successfully!"
      };
    } else {
      return {
        status: 400,
        message: "Error creating automation!"
      };
    }
  } catch (error) {
    console.log("Automation create error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};

export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const res = await findAllAutomations({
      clerkId: user.data.id
    });
    if (res.status === 200) {
      return {
        status: 200,
        message: "Automation Get successfully!",
        data: res.data
      };
    }
    return {
      status: 400,
      message: "Automation not found!",
      data: res.data
    };
  } catch (error) {
    console.log("Automation Get error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
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
        data: res.data
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
      message: "Internal server error!"
    };
  }
};


export const updateAutomation = async ({
  id,
  data
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
        message: "Automation updated successfully!"
      };
    }
    return {
      status: 400,
      message: "Error updating automation!"
    };
  } catch (error) {
    console.log("Automation update error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};