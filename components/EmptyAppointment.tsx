"use client";
import { Button } from "./ui/button";
import React from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./ui/empty";
import Image from "next/image";

const EmptyAppointment = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Image
            src="/assets/Appointment-Relaxing.png"
            alt="no appointments"
            width={400}
            height={400}
          />
        </EmptyMedia>
        <EmptyTitle>You haven&apos;t made any appointments yet. </EmptyTitle>
        <EmptyDescription>
          Get started by Creating Your First Appointment.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button className="cursor-pointer">Book Appointment</Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyAppointment;
