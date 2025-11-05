import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 4; //file size = 4MB
const ACCEPT_FILE = ["image/jpeg", "image/png"]; //allow these files only to upload

export const usernameSchemaField = z
  .string()
  .min(2, { message: "Username must be at least 2 characters long" })
  .max(20, { message: "Username must not exceed 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    // NOTE: Your regex message says "must not contains number" but the regex /^[a-zA-Z0-9_]+$/ allows numbers (0-9).
    // I've kept the regex but updated the message for clarity.
    message: "Username must only contain letters, numbers, and underscores.",
  });

// 2. Corrected avatar validation with independent checks
export const avatarValidation = z
  .instanceof(File, { message: "Avatar must be a file" })
  .superRefine((file, ctx) => {
    // Check 1: File Type
    if (!ACCEPT_FILE.includes(file.type)) {
      ctx.addIssue({
        code: "custom",
        message: `Only ${ACCEPT_FILE.join(", ")} file types are accepted.`,
        path: ["avatar"],
      });
      return; // Stop processing if type is wrong
    }

    // Check 2: File Size
    if (file.size > MAX_UPLOAD_SIZE) {
      ctx.addIssue({
        code: "custom",
        message: "File size must be less than 4MB.",
        path: ["avatar"],
      });
    }
  })
  .nullable(); // Allows the user to submit null (no avatar)

export const ambassadorSignUpSchema = z
  .object({
    username: usernameSchemaField,
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    avatar: avatarValidation,
    categories: z
      .array(z.enum(["Finance", "Housing", "Digital safety", "Career"]), {
        message: "Select at least one categories",
      })
      .min(1, {
        // <-- Changed from .nonempty() to .min(2)
        message: "Please select a minimum of 1 categories.",
      }),
    description: z
      .string()
      .min(20, { message: "description should be 20 character long" })
      .max(150, { message: "description should not exceeds 150 characters" }),
  })
  .refine((data) => {
    data.password === data.confirmPassword,
      { message: "Password doesn't match", path: ["confirmPassword"] };
  });
