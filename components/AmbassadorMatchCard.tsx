"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertDialogFooter } from "./ui/alert-dialog";
import { AmbassadorMatch } from "@/types/ambassadorMatch";
import { Globe, MessageSquare, Phone } from "lucide-react";

const AmbassadorMatchCard = ({
  match,
  onClose,
}: {
  match: AmbassadorMatch;
  onClose: () => void;
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white h-[44vh] w-[30vh]">
      {match?.ambassadorId === "none" ? (
        <div className="bg-red-700 rounded-xl px-4 py-6 text-white">
          <p className="font-bold text-lg">⚠ Crisis Detected</p>
          <p className="text-sm mt-2">
            You may be in distress. Please call <strong>9-8-8</strong> for
            immediate crisis support.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              className="bg-white text-red-700 hover:bg-red-100"
              onClick={() => window.location.assign("https://988.ca")}>
              <Globe className="mr-2" /> Visit Website
            </Button>

            <Button
              variant="secondary"
              className="bg-white text-red-700 hover:bg-red-100"
              onClick={() => window.location.assign("tel:988")}>
              <Phone className="mr-2" /> Call 9-8-8
            </Button>

            <Button
              variant="secondary"
              className="bg-white text-red-700 hover:bg-red-100"
              onClick={() => window.location.assign("https://988.ca")}>
              <MessageSquare className="mr-2" /> Message 9-8-8
            </Button>
          </div>

          <AlertDialogFooter className="mt-6">
            <Button className="w-full" onClick={onClose}>
              OK
            </Button>
          </AlertDialogFooter>
        </div>
      ) : (
        <>
          <Avatar className="h-24 w-24 mb-3 mx-auto shadow-md hover:scale-[1.03] transition">
            <AvatarImage
              src={match?.ambassadorAvatar || ""}
              alt={match?.ambassadorName?.charAt(0)}
              className="object-fit"
            />
            <AvatarFallback>{match?.ambassadorName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <p className="font-bold text-xl">{match?.ambassadorName}</p>

          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {match?.categories?.map((c, i) => (
              <Badge key={i}>{c}</Badge>
            ))}
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {match?.description}
          </p>
        </>
      )}
    </div>
  );
};

export default AmbassadorMatchCard;
