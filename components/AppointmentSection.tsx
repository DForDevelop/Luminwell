"use client";

import React, { useState, useEffect } from "react";
import AmbassadorMatchCard from "./AmbassadorMatchCard";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { AmbassadorMatch } from "@/types/ambassadorMatch";

const AppointmentSection = ({
  match,
  onClose,
}: {
  match: AmbassadorMatch;
  onClose: () => void;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    const timer = setTimeout(() => setShowCalendar(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBooking = async () => {
    if (!selectedDate) {
      return toast.error("Please Select the date");
    }
    try {
      const payload = {
        ambassadorId: match?.ambassadorId,
        reason: match?.reason, // ✅ use AI reason
        appointmentDate: selectedDate.toISOString(),
      };

      console.log("📩 Booking Payload:", payload);
      const res = await axios.post("/api/bookings/create-appointment", {
        ambassadorId: match?.ambassadorId,
        reason: match?.reason,
        appointmentDate: selectedDate.toISOString(),
      });

      console.log(res);

      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message);
        onClose();
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start items-center justify-center mt-4 mx-5">
      {/* Ambassador Card */}
      <AmbassadorMatchCard match={match} onClose={onClose} />

      {/* Calendar */}
      <div
        className={cn(
          "flex-shrink-0 min-w-[320px] transition-all duration-700 opacity-0 translate-y-4 md:translate-y-0 md:translate-x-6",
          showCalendar && "opacity-100 translate-x-0 translate-y-0"
        )}>
        <p className="font-semibold text-center mb-3 text-gray-800">
          Choose Appointment Date
        </p>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border mx-auto"
          disabled={{
            before: new Date(),
          }}
        />
        <div className="flex flex-col md:flex-row gap-3 mt-5">
          <Button
            className="w-full md:w-auto flex-1"
            disabled={!selectedDate}
            onClick={handleBooking}>
            Book Appointment
          </Button>

          <Button
            variant="secondary"
            className="w-full md:w-auto flex-1"
            onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
