"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreditPack } from "@/types/credits";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  pack: CreditPack;
  onClose: () => void;
}

const EmbeddedCheckoutComponent = ({ pack, onClose }: CheckoutProps) => {
  const [clientSecret, setClientSecret] = useState<string>("");

  const createSession = async () => {
    try {
      const res = await axios.post(
        "/api/transaction/stripe/create-embedded-session",
        {
          credits: pack.credits,
          amount: pack.amount,
        }
      );

      setClientSecret(res.data.clientSecret);
    } catch (error) {
      toast.error("failed to call checkout");
    }
  };

  useEffect(() => {
    createSession();
  }, [pack]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <EmbeddedCheckout />
      <Button className="mt-4 text-sm underline" onClick={onClose}>
        cancel
      </Button>
    </EmbeddedCheckoutProvider>
  );
};

export default EmbeddedCheckoutComponent;
