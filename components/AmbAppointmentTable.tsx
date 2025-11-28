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
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

interface AmbAppointmentTableProps {
  bookings: Booking[];
}

const AmbAppointmentTable = ({ bookings }: AmbAppointmentTableProps) => {
  const handleStatusChange = async (
    bookingId: string,
    updatedStatus: string
  ) => {
    try {
      const res = await axios.put("/api/bookings/update-status", {
        bookingId,
        status: updatedStatus,
      });

      if (res.data.success) {
        toast.info(`status changed to ${updatedStatus}`);
        return;
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">User Details</TableHead>
          <TableHead className="text-center">Reason</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Appointment Date</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking._id}>
            <TableCell className="flex items-center justify-center gap-2">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={booking.userId?.avatar}
                  alt={booking.userId?.username}
                />
                <AvatarFallback className="rounded-full">
                  {booking.userId?.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium"> {booking.userId?.username}</span>
            </TableCell>
            <TableCell className="max-w-[250px] truncate cursor-default">
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
            <TableCell className="flex gap-2 justify-center">
              {/* Confirm button */}
              {booking.status === "pending" && (
                <Button
                  className="bg-green-700 cursor-pointer"
                  disabled={booking.status !== "pending"}
                  size="sm"
                  onClick={() => handleStatusChange(booking._id, "confirmed")}>
                  Confirm
                </Button>
              )}

              {/* Cancel button */}
              {booking.status !== "cancelled" && (
                <Button
                  className="bg-red-500 cursor-pointer"
                  size="sm"
                  onClick={() => handleStatusChange(booking._id, "cancelled")}>
                  Cancel
                </Button>
              )}

              <Button className="bg-blue-500 cursor-pointer" size="sm">
                Start Chat
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AmbAppointmentTable;
