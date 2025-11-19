"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import z from "zod";
import { resetPasswordSchema } from "@/schema/resetPasswordSchema";

const ResetPasswordPage = () => {
  const router = useRouter();
  const params = useParams();

  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.post("/api/get-user-email", {
          _id: params._id,
          token: params.token,
        });
        if (res.data.success) {
          setEmail(res.data.email);
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error("Error fetching user info");
      }
    };
    fetchEmail();
  }, [params._id, params.token]);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setisSubmitting(true);
    try {
      // Send to backend
      const res = await axios.post("/api/reset-password", {
        _id: params._id,
        token: params.token,
        password: data.password,
      });

      if (res.data.success) {
        toast.success("Password reset successful! Redirecting...");
        router.push("/sign-in");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        <div className="w-full max-w-xs">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  change your password here
                </p>
              </div>
              {email ? (
                <p className="text-sm text-center text-gray-400 mb-4">
                  {email}
                </p>
              ) : (
                <p className="text-sm text-center text-gray-400 mb-4">
                  Loading user info...
                </p>
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-enter your password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-40 animate-spin" />
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
