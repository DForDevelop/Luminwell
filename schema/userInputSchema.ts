import { z } from "zod";

export const userInputSchema = z.object({
  userinput: z.string().min(200, { message: "200 character required" }),
});
