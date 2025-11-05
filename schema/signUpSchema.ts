import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 4; //file size = 4MB
const ACCEPT_FILE = ["image/jpeg", "image/png"]; //allow these files only to upload

export const usernameValidation = z
  .string()
  .min(2, { message: "Username must be at least 2 characters long" })
  .max(20, { message: "Username must not be exceeds 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must not contain special characters",
  })
  .optional();

export const avatarValidation = z
  .instanceof(File)
  .refine((file) => ACCEPT_FILE.includes(file.type), {
    message: `Only ${ACCEPT_FILE.join(", ")} files are accepted`,
  })
  .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
    message: "File size must be less than 4MB",
  })
  .nullable();

export const signUpSchema = z
  .object({
    username: usernameValidation,
    email: z.string().email({ message: "Invaid Email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    avatar: avatarValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
