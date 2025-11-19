"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface PasscodeModalProps {
  isOpen: boolean;
  onVerify: () => void;
  onClose: () => void;
}

const PASSCODE_LENGTH = 6;
const PasscodeModal = ({ isOpen, onVerify, onClose }: PasscodeModalProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const closeModal = () => {
    onClose();
    router.push("/sign-in");
  };

  const verifyPasskey = async () => {
    if (
      passkey.length !== process.env.NEXT_PUBLIC_PASSCODE!.toString().length
    ) {
      setError(`Passcode must 6 digit long`);
    }

    setIsSubmitting(true);
    setError("");

    if (passkey === process.env.NEXT_PUBLIC_PASSCODE!.toString()) {
      onVerify();
    } else {
      setError("Incorrect passcode");
      setPasskey("");
    }
    setIsSubmitting(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-1 justify-between">
            <AlertDialogTitle>Verification code required</AlertDialogTitle>
            <X onClick={() => closeModal()} />
          </div>
          <AlertDialogDescription>
            To access this, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="w-full flex justify-evenly">
              <InputOTPSlot
                className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-12 gap-1.5"
                index={0}
              />
              <InputOTPSlot
                className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-12 gap-1.5"
                index={1}
              />
              <InputOTPSlot
                className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-12 gap-1.5"
                index={2}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="w-full flex justify-evenly">
              <InputOTPSlot
                className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-12 gap-1.5"
                index={3}
              />
              <InputOTPSlot
                className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-12 gap-1.5"
                index={4}
              />
              <InputOTPSlot
                className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-12 gap-1.5"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-14-regular mt-4 flex justify-center text-red-600">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter className="mt-4">
          <Button
            onClick={verifyPasskey}
            disabled={isSubmitting || passkey.length !== PASSCODE_LENGTH}
            className="w-full">
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasscodeModal;
