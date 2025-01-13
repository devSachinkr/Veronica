"use server";

import { db } from "@/lib/prisma";

export const matchKeyword = async (keyword: string) => {
  return await db.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: "insensitive",
      },
    },
  });
};

export const createChatHistory = async ({
  automationId,
  sender,
  receiver,
  message,
}: {
  automationId: string;
  sender: string;
  receiver: string;
  message: string;
}) => {
  return await db.automation.update({
    where: {
      id: automationId,
    },
    data: {
      Dms: {
        create: {
          receiver,
          senderId: sender,
          message,
        },
      },
    },
  });
};

export const getChatHistory = async (sender: string, receiver: string) => {
    const history = await db.dms.findMany({
      where: {
        AND: [{ senderId: sender }, { receiver }],
      },
      orderBy: { createdAt: 'asc' },
    })
    const chatSession: {
      role: 'assistant' | 'user'
      content: string
    }[] = history.map((chat) => {
      return {
        role: chat.receiver ? 'assistant' : 'user',
        content: chat.message!,
      }
    })
  
    return {
      history: chatSession,
      automationId: history[history.length - 1].automationId,
    }
  }
export const getKeywordPost = async (postId: string, automationId: string) => {
  return await db.post.findFirst({
    where: {
      AND: [{ postId: postId }, { automationId }],
    },
    select: { automationId: true },
  });
};
