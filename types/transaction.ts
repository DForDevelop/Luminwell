export interface PopulatedUser {
  _id: string;
}

export interface Transaction {
  _id: string;
  userId?: PopulatedUser; // populated user object when needed
  stripeId: string | null;
  amount: number;
  creditsAdded: number;
  status: "pending" | "success" | "failed";
  currency: string;
  createdAt: string; // ISO date string
  updatedAt: string;
}
