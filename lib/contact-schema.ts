import { z } from "zod";

/** Shared validation for the contact form — used on the client and the API route. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(80),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactInput = z.infer<typeof contactSchema>;
