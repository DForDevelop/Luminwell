"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Booking } from "@/types/bookings";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";

interface UserAppointmentTableProps {
  bookings: Booking[];
}

const UserAppointmentTable = ({ bookings }: UserAppointmentTableProps) => {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Ambassador</TableHead>
          <TableHead className="text-center">Reason</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Appointment Date</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking._id}>
            <TableCell className="flex items-center justify-center gap-2">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={booking.ambassadorId?.avatar}
                  alt={booking.ambassadorId?.username}
                />
                <AvatarFallback className="rounded-full">
                  {booking.ambassadorId?.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {" "}
                {booking.ambassadorId?.username}
              </span>
            </TableCell>
            <TableCell className="max-w-[250px] truncate">
              {booking.reason}
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  booking.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : booking.status === "confirmed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                }`}>
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(booking.appointmentDate).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserAppointmentTable;
