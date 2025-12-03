"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EmptyAmbSchedule from "@/components/EmptyAmbSchedule";
import AmbAppointmentTable from "@/components/AmbAppointmentTable";
import { Separator } from "@/components/ui/separator";

const AmbAppointmentPage = () => {
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
          My Schedule
        </h1>
      </div>
      <Separator />
      <div className="mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : bookings.length === 0 ? (
          <EmptyAmbSchedule />
        ) : (
          <AmbAppointmentTable bookings={bookings} />
        )}
      </div>
    </div>
  );
};

export default AmbAppointmentPage;
