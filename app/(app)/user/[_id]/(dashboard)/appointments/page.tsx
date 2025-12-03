"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";
import EmptyAppointment from "@/components/EmptyAppointment";
import UserInputModal from "@/components/UserInputModal";
import UserAppointmentTable from "@/components/UserAppointmentTable";
import axios from "axios";

const AppointmentPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/bookings/get-appointments");
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col mx-4 sm:flex-row justify-between items-center mb-5 sm:mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          My Appointments
        </h1>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="flex items-center justify-center space-x-2 w-full cursor-pointer sm:w-auto ">
          <ClipboardPlus />
          New Appointment
        </Button>
      </div>
      <Separator />
      <div className="mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : bookings.length === 0 ? (
          <EmptyAppointment />
        ) : (
          <UserAppointmentTable bookings={bookings} />
        )}
      </div>

      <UserInputModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default AppointmentPage;
