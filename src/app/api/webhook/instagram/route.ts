console.log("🌍🌍🌍🌍🌍🌍🌍🌍")
import { findAutomation } from "@/actions/automations/queries";
import {
  getKeyWordAutomation,
  trackResponse,
} from "@/actions/integrations/query";
import {
  createChatHistory,
  getChatHistory,
  getKeywordPost,
  matchKeyword,
} from "@/actions/webhook/queries";
import { sendDm, sendPrivateMessage } from "@/lib/fetch";
import { openai } from "@/lib/openai";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();
  let matcher;
  try {
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }

    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text
      );
    }

    if (matcher && matcher.automationId) {
      console.log("Matched");
      // We have a keyword matcher

      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeyWordAutomation(
          matcher.automationId,
          true
        );

        if (automation && automation.data && automation.data.Trigger) {
          if (
            automation.data.Listener &&
            automation.data.Listener.listener === "MESSAGE"
          ) {
            const direct_message = await sendDm({
              userId: webhook_payload.entry[0].id,
              receiverId: webhook_payload.entry[0].messaging[0].sender.id,
              prompt: automation.data.Listener?.prompt,
              token: automation.data.User?.integrations[0].token!,
            });

            if (direct_message.status === 200) {
              const tracked = await trackResponse({
                automationId: automation.data.id,
                type: "DM",
              });
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "Message sent",
                  },
                  { status: 200 }
                );
              }
            }
          }

          if (
            automation.data.Listener &&
            automation.data.Listener.listener === "SMART_AI" &&
            automation.data.User?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.data.Listener.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });

            if (smart_ai_message.choices[0].message.content) {
              const receiver = createChatHistory({
                automationId: automation.data.id,
                sender: webhook_payload.entry[0].id,
                receiver: webhook_payload.entry[0].messaging[0].sender.id,
                message: webhook_payload.entry[0].messaging[0].message.text,
              });

              const sender = createChatHistory({
                automationId: automation.data.id,
                sender: webhook_payload.entry[0].id,
                receiver: webhook_payload.entry[0].messaging[0].sender.id,
                message: smart_ai_message.choices[0].message.content,
              });
              // @ts-ignore
              await db.$transaction([receiver, sender]);

              const direct_message = await sendDm({
                userId: webhook_payload.entry[0].id,
                receiverId: webhook_payload.entry[0].messaging[0].sender.id,
                prompt: smart_ai_message.choices[0].message.content,
                token: automation.data.User?.integrations[0].token!,
              });

              if (direct_message.status === 200) {
                const tracked = await trackResponse({
                  automationId: automation.data.id,
                  type: "DM",
                });
                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }
          }
        }
      }

      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments"
      ) {
        const automation = await getKeyWordAutomation(
          matcher.automationId,
          false
        );

        console.log("geting the automations",automation);

        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.data?.id!
        );

        console.log("found keyword ", automations_post);

        if (automation && automations_post && automation.data?.Trigger) {
          console.log("first if");
          if (automation.data.Listener) {
            console.log("first if");
            if (automation.data.Listener.listener === "MESSAGE") {
              console.log(
                "SENDING DM, WEB HOOK PAYLOAD",
                webhook_payload,
                "changes",
                webhook_payload.entry[0].changes[0].value.from
              );

              console.log(
                "COMMENT VERSION:",
                webhook_payload.entry[0].changes[0].value.from.id
              );

              const direct_message = await sendPrivateMessage(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.data.Listener?.prompt,
                automation.data.User?.integrations[0].token!
              );

              console.log("DM SENT", direct_message.data);
              if (direct_message.status === 200) {
                const tracked = await trackResponse({
                  automationId: automation.data.id,
                  type: "COMMENT",
                });

                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }
            if (
              automation.data.Listener.listener === "SMART_AI" &&
              automation.data.User?.subscription?.plan === "PRO"
            ) {
              const smart_ai_message = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  {
                    role: "assistant",
                    content: `${automation.data.Listener?.prompt}: keep responses under 2 sentences`,
                  },
                ],
              });
              if (smart_ai_message.choices[0].message.content) {
                const receiver = createChatHistory({
                  automationId: automation.data.id,
                  sender: webhook_payload.entry[0].id,
                  receiver: webhook_payload.entry[0].changes[0].value.from.id,
                  message: webhook_payload.entry[0].changes[0].value.text,
                });

                const sender = createChatHistory({
                  automationId: automation.data.id,
                  sender: webhook_payload.entry[0].id,
                  receiver: webhook_payload.entry[0].changes[0].value.from.id,
                  message: smart_ai_message.choices[0].message.content,
                });
                // @ts-ignore
                await db.$transaction([receiver, sender]);

                const direct_message = await sendPrivateMessage(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.id,
                  automation.data.Listener?.prompt,
                  automation.data.User?.integrations[0].token!
                );

                if (direct_message.status === 200) {
                  const tracked = await trackResponse({
                    automationId: automation.data.id,
                    type: "COMMENT",
                  });

                  if (tracked) {
                    return NextResponse.json(
                      {
                        message: "Message sent",
                      },
                      { status: 200 }
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
   
    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );

      if (customer_history.history.length > 0) {
        const automation = await findAutomation({
          id: customer_history.automationId!,
        });

        if (
          automation?.data?.User?.subscription?.plan === "PRO" &&
          automation.data.Listener?.listener === "SMART_AI"
        ) {
          const smart_ai_message = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "assistant",
                content: `${automation.data.Listener?.prompt}: keep responses under 2 sentences`,
              },
              ...customer_history.history,
              {
                role: "user",
                content: webhook_payload.entry[0].messaging[0].message.text,
              },
            ],
          });

          if (smart_ai_message.choices[0].message.content) {
            const receiver = createChatHistory({
              automationId: automation.data.id,
              sender: webhook_payload.entry[0].id,
              receiver: webhook_payload.entry[0].messaging[0].sender.id,
              message: webhook_payload.entry[0].messaging[0].message.text,
            });

            const sender = createChatHistory({
              automationId: automation.data.id,
              sender: webhook_payload.entry[0].id,
              receiver: webhook_payload.entry[0].messaging[0].sender.id,
              message: smart_ai_message.choices[0].message.content,
            });
            // @ts-ignore
            await db.$transaction([receiver, sender]);
            const direct_message = await sendDm({
              userId: webhook_payload.entry[0].id,
              receiverId: webhook_payload.entry[0].messaging[0].sender.id,
              prompt: smart_ai_message.choices[0].message.content,
              token: automation.data.User?.integrations[0].token!,
            });

            if (direct_message.status === 200) {
              //if successfully send we return

              return NextResponse.json(
                {
                  message: "Message sent",
                },
                { status: 200 }
              );
            }
          }
        }
      }

      return NextResponse.json(
        {
          message: "No automation set",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 }
    );
  }
}
