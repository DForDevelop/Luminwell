
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

const EmptyAppointment = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Image
            src="/assets/Bankrupt.png"
            alt="no transactions"
            width={400}
            height={400}
          />
        </EmptyMedia>
        <EmptyTitle>No Transactions. </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyAppointment;
