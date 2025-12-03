"use client";

import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Info, Loader2, X } from "lucide-react";
import { userInputSchema } from "@/schema/userInputSchema";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { AmbassadorMatch } from "@/types/ambassadorMatch";
import AppointmentSection from "./AppointmentSection";
import { cn } from "@/lib/utils";

const UserInputModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<AmbassadorMatch>(null);

  const form = useForm<z.infer<typeof userInputSchema>>({
    resolver: zodResolver(userInputSchema),
    defaultValues: { userInput: "" },
  });

  const onSubmit = async (data: z.infer<typeof userInputSchema>) => {
    try {
      setLoading(true);
      setMatch(null);

      const result = await axios.post("/api/find-ambassador", {
        userInput: data.userInput,
      });

      if (result?.data.success) {
        setMatch(result?.data.match);
      } else {
        toast.error("Ambassador not found");
      }
    } catch {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className={cn(
          "max-h-3xl ",
          match ? "min-w-[80vh]" : "max-w-lg"
        )}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg backdrop-blur-sm bg-white/50 dark:bg-black/40 z-50">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="font-semibold text-lg">Finding Ambassador...</p>
          </div>
        )}

        {!match && (
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center">
              <span className="font-extrabold text-xl">
                Make an Appointment
              </span>
              <X className="cursor-pointer" onClick={() => setOpen(false)} />
            </AlertDialogTitle>

            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Provide a detailed description of your issue so we can assign the
              best ambassador for you.
            </AlertDialogDescription>

            <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-center text-blue-700 dark:text-blue-300 font-semibold mb-2">
                <Info className="h-4 w-4 mr-2" /> Information
              </div>

              <ul className="list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-5">
                <li>Avoid sharing personal info like phone or bank details.</li>
                <li>Do not use hostile or offensive language.</li>
                <li>
                  Keep your description clear as matching happens using your
                  input.
                </li>
              </ul>
            </div>
          </AlertDialogHeader>
        )}

        {match ? (
          <AppointmentSection
            match={match}
            onClose={() => {
              setOpen(false);
              setMatch(null);
            }}
          />
        ) : (
          <div className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="userInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I am going through a career gap due to illness..."
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AlertDialogFooter>
                  <Button type="submit" className="w-full">
                    Find Ambassador
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserInputModal;
