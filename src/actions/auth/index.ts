"use server";

import { refreshToken } from "@/lib/fetch";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { updateIntegrations } from "../integrations/query";
import { createUser, findUserDetails } from "./queries";
import { v4 } from "uuid";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  return { data: user };
};

export const authUser = async () => {
  try {
    const { data: clerkUser } = await onCurrentUser();
    const userAlreadyExist = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
        OR: [{ email: clerkUser.emailAddresses[0].emailAddress }]
      },
      include: {
        subscription: true,
        integrations: {
          select: {
            id: true,
            token: true,
            expiresAt: true,
            name: true
          }
        }
      }
    });
    if (userAlreadyExist) {
      if (userAlreadyExist.integrations.length) {
        const today = new Date();
        const timeLeft =
          userAlreadyExist.integrations[0].expiresAt?.getTime()! -
          today.getTime();

        const days = Math.round(timeLeft / (1000 * 3600 * 24));
        if (days < 5) {
          const refresh = await refreshToken({
            token: userAlreadyExist.integrations[0].token
          });
          if (refresh.status !== 200) {
            console.log("Refresh token failed");
            return {
              status: 400,
              message: "Refresh token failed"
            };
          }
          const today = new Date();
          const expire_date = today.setDate(today.getDate() + 60);
          const updateToken = await updateIntegrations({
            token: refresh.token.access_token,
            expiresAt: new Date(expire_date),
            id: userAlreadyExist.integrations[0].id
          });
          if (updateToken.status !== 200) {
            console.log("Update token failed");
            return {
              status: 400,
              message: { [updateToken.status]: updateToken.message ?? "" }
            };
          }
        }
      }
      return {
        status: 200,
        data: {
          firstName: userAlreadyExist.firstName,
          lastName: userAlreadyExist.lastName,
          email: userAlreadyExist.email
        }
      };
    }

    const newUser = await createUser({
      clerkId: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      email: clerkUser.emailAddresses[0].emailAddress
    });
    if (newUser.status !== 201) {
      console.log("User create failed");
      return {
        status: 400,
        message: "User create failed"
      };
    }
    return {
      status: 201,
      data: newUser.data
    };
  } catch (error) {
    console.log("Auth user error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};

export const getUserInfo = async () => {
  const user = await onCurrentUser();
  try {
    const res = await findUserDetails({
      id: user.data.id
    });
    if (res) {
      return {
        status: 200,
        data: res.data
      };
    }
    return {
      status: 400,
      message: "User not found!"
    };
  } catch (error) {
    console.log("User info error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};
