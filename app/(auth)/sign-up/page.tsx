"use client";

import { signUpSchema } from "@/schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const SignUpForm = () => {
  const router = useRouter();

  const [username] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    form.setValue("avatar", file, { shouldValidate: true }); // keep validation
    setSelectedFile(file); // store for actual upload
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!file) return null; //base case if no profile photo uploaded

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload-avatar", formData,);
      
    console.log("Upload response:", res.data);
      return res.data?.url ?? null;
    } catch (err) {
      console.error("Avatar upload failed", err);
      toast.error("Avatar upload failed");
      return null;
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setisSubmitting(true);
    try {
      // Send the URL string, not the File object
      let avatarUrl: string | null = null;
      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile);
      }

      console.log("Data from form:", data);
      console.log("Avatar file selected:", data.avatar);
      console.log("Uploaded avatar URL:", avatarUrl);

      // Send to backend
      await axios.post("/api/sign-up", {
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: avatarUrl, // only URL or null
      });

      toast.success("Sign up complete!");
      router.replace(`/sign-in`);
    } catch (error) {
      console.error("Error in Sign up", error);
      toast.error("Signup Failed");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/assets/signup-side-image.jpg"
          alt="Signup Image"
          width={1000}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-1 items-center relative justify-center">
        <div className="top-10 left-10 absolute text-4xl font-bold">Luminwell</div>
        <div className="w-full max-w-xs">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Sign up your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your details to start journey with us
                </p>
              </div>
              {/* Avatar upload */}
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormControl className="">
                      <div
                        className="cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}>
                        <Avatar className="h-24 w-24 justify-center items-center">
                          <AvatarImage
                            src={preview || "/assets/default-profile.jpg"}
                          />
                          <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Jason Voorhees"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*email*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Jason@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*password*/}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*confirmPassword*/}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full max-w-full"
                type="submit"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-40 animate-spin" />
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-slate-400">
              Already a member?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
