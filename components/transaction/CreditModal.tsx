"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CreditPacks from "./CreditPacks";
import { CreditPack } from "@/types/credits";
import EmbeddedCheckoutComponent from "./stripe/EmbeddedCheckout";

const CreditModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(null);

  const handlePackSelect = (pack: CreditPack) => {
    setSelectedPack(pack);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Buy Credits</DialogTitle>
        </DialogHeader>

        {!selectedPack ? (
          <CreditPacks onSelect={handlePackSelect} />
        ) : (
          <EmbeddedCheckoutComponent
            pack={selectedPack}
            onClose={() => {
              setSelectedPack(null);
              setOpen(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreditModal;
