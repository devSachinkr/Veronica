import { z } from "zod";
export const PromptSchema = z.object({
  prompt: z.string().min(1, { message: "Please specify a prompt" }),
  reply: z.string(),
});
