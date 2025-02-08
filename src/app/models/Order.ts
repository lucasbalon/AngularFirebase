export interface Order {
  id?: string;
  userId: string;
  items: { productId: string; name: string; quantity: number; pointCost: number }[];
  totalPoints: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
