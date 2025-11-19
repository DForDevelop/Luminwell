"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";
import EmptyAppointment from "@/components/EmptyAppointment";
import { useState } from "react";
import UserInputModal from "@/components/UserInputModal";

const AppointmentPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col mx-4 sm:flex-row justify-between items-center mb-5 sm:mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          My Appointments
        </h1>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="flex items-center justify-center space-x-2 w-full cursor-pointer sm:w-auto">
          <ClipboardPlus />
          New Appointment
        </Button>
      </div>
      <Separator />
      <UserInputModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default AppointmentPage;
