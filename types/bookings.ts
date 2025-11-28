export interface PopulatedUser {
  username: string;
  avatar: string;
}

export interface Booking {
  _id: string;
  userId?: PopulatedUser;         // populated when ambassador views
  ambassadorId?: PopulatedUser;   // populated when user views
  appointmentDate: string;        // ISO string from backend
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}