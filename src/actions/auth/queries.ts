"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createUser = async (data: Prisma.UserCreateInput) => {
  if (!data.clerkId) {
    return {
      status: 404,
      message: "Clerk ID is required!"
    };
  }
  try {
    const res = await db.user.create({
      data: {
        ...data,
        subscription: {
          create: {}
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });
    if (res) {
      return {
        status: 201,
        message: "User created successfully!",
        data: res
      };
    }
    return {
      status: 400,
      message: "User not found!"
    };
  } catch (error) {
    console.log("User create error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};

export const findUserDetails = async ({
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
    if (!res) {
      return {
        status: 404,
        message: "User not found!"
      };
    }
    return {
      status: 200,
      data: res
    };
  } catch (error) {
    console.log("User details error: ", error);
    return {
      status: 500,
      message: "Internal server error!"
    };
  }
};
