"use client";
import React from "react";
import { packs } from "@/constant/packs";
import { Card, CardContent } from "../ui/card";
import { BadgeDollarSign } from "lucide-react";
import { CreditPack } from "@/types/credits";

const CreditPacks = ({
  onSelect,
}: {
  onSelect: (pack: CreditPack) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {packs.map((pack) => (
        <Card
          key={pack.credits}
          onClick={() => onSelect(pack)}
          className="p-5 cursor-pointer hover:shadow-lg transition-all border-2 hover:bg-blue-500 hover:text-white">
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <BadgeDollarSign size={20} />
              <h3 className="text-lg font-bold text-center">{pack.credits}</h3>
              <p className="text-center text-gray-600 mt-2 text-sm font-semibold">
                CA$ {pack.amount}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CreditPacks;
