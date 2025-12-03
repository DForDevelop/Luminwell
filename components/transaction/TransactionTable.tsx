"use client";

import React from "react";
import { Transaction } from "@/types/transaction";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { BadgeDollarSign } from "lucide-react";

interface TransactionProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionProps) => {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Tx ID</TableHead>
          <TableHead className="text-center">Credits</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Purchase Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx._id}>
            <TableCell className="truncate cursor-default">
              {tx.stripeId}
            </TableCell>
            <TableCell className=" flex items-center justify-center gap-2 truncate cursor-default">
              <BadgeDollarSign />
              {tx.creditsAdded}
            </TableCell>
            <TableCell className="truncate cursor-default">
              {new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "CAD",
              }).format(tx.amount)}
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  tx.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : tx.status === "success"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                }`}>
                {tx.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
