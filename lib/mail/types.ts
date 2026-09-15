import { z } from "zod";

export const sendMailSchema = z
  .object({
    threadId: z.uuid().optional(),
    to: z.email().optional(),
    subject: z.string().min(1).max(200).optional(),
    body: z.string().min(1, "Message body is required"),
  })
  .refine((value) => value.threadId || (value.to && value.subject), {
    message: "Either threadId, or both to and subject, are required",
  });

export type SendMailInput = z.infer<typeof sendMailSchema>;
