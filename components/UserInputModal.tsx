"use client";

import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import React from "react";
import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Info, X } from "lucide-react";
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

const UserInputModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof userInputSchema>>({
    resolver: zodResolver(userInputSchema),
    defaultValues: { userinput: "" },
  });

  const onSubmit = async (data: z.infer<typeof userInputSchema>) => {
   // toast.info("login failed: invalid Username or password");
   
  
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-1 justify-between">
            <span className=" font-extrabold">Make an Appointment</span>
            <X onClick={() => setOpen(false)} className="cursor-pointer" />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-gray-600 dark:text-gray-300">
              Before taking the appointment, please provide a detailed
              description of the issue you are experiencing so we can assign the
              best resource for your appointment.
            </span>
          </AlertDialogDescription>
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-700 mt-2">
            <div className="flex items-center text-blue-700 dark:text-blue-300 mb-2 font-semibold">
              <Info className="h-4 w-4 mr-2" />
              Information
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 dark:text-gray-300 pl-2">
              <li>
                Please do not provide any personal information such as phone
                number, bank details, or passwords.
              </li>
              <li>
                Please do not use derogatory, hostile, or provoking language.
              </li>
              <li>
                Please keep your description clear and concise as the ambassador
                selection is based on your given input.
              </li>
            </ul>
          </div>
        </AlertDialogHeader>
        <div className="mt-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="userinput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your problem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I am going through a career gap due to prolong illness. i want to restart my career"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="mt-4">
                <Button type="submit" className="w-full">
                  Find the ambassador
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserInputModal;
