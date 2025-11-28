export type AmbassadorMatch = {
  ambassadorId: string | null;
  ambassadorName: string | null;
  ambassadorAvatar?: string | null;
  categories: string[] | null;
  description: string | null;
  confidence: number | null;
  reason: string | null;
} | null;
