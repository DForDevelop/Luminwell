'use client' 
import React, { useState } from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "./ui/empty";
import Image from "next/image";


const EmptyAppointment = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    </Empty>
  );
};

export default EmptyAppointment;