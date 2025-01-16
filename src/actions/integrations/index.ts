"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getIntegration, onCreateIntegration } from "./query";
import { onCurrentUser } from "../auth";
import { generateTokens } from "@/lib/fetch";
import axios from "axios";

export const OAuthInstagram = ({ strategy }: { strategy: "INSTAGRAM" }) => {
  switch (strategy) {
    case "INSTAGRAM": {
      return redirect(`${process.env.INSTAGRAM_EMBEDDED_OAUTH_URL}`);
    }
  }
};

export const onIntegrate = async ({ code }: { code: string }) => {
  const user = await onCurrentUser();
  try {
    const res = await getIntegration(user.data.id);
    if (res && res.integrations.length === 0) {
      const token = await generateTokens(code);
      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        );

        const today = new Date();
        const expire_date = today.setDate(today.getDate() + 60);
        const createIntegration = await onCreateIntegration(
          user.data.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        );
        if (createIntegration.status === 200) {
            return {
                status: 200,
                message: "Integration created successfully!",
                data: createIntegration.data,
            }
        }
        return {
          status: 401,
          message: "Invalid code!",
        };
      }
      return {
        status: 401,
        message: "Invalid code!",
      };
    }
    return {
      status: 400,
      message: "Integration already exists!",
    };
  } catch (error) {
    console.log("Instagram OAuth error: ", error);
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};
