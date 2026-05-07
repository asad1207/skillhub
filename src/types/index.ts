export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  year: string;
  branch: string;
  avatar_initials: string;
  rating: number;
  review_count: number;
  total_earned: number;
  orders_completed: number;
  skills: Skill[];
  badges: Badge[];
  is_admin: boolean;
  created_at: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface Badge {
  label: string;
  icon: string;
  type: 'success' | 'info' | 'warn';
}

export type ServiceCategory = 'Web Dev' | 'Design' | 'Writing' | 'Video' | 'Other';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  price: number;
  delivery_days: number;
  seller_id: string;
  seller_name: string;
  seller_initials: string;
  seller_rating: number;
  is_active: boolean;
  created_at: string;
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'delivered'
  | 'approved'
  | 'completed'
  | 'disputed'
  | 'cancelled';

export interface Order {
  id: string;
  service_id: string;
  service_title: string;
  buyer_id: string;
  buyer_name: string;
  seller_id: string;
  seller_name: string;
  price: number;
  status: OrderStatus;
  rating?: number;
  review?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

export interface Conversation {
  order_id: string;
  order_title: string;
  other_user_name: string;
  other_user_initials: string;
  last_message: string;
  last_message_at: string;
  messages: Message[];
}

export type TransactionType = 'deposit' | 'escrow_hold' | 'escrow_release' | 'refund' | 'commission';

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  order_id?: string;
  created_at: string;
}

export interface Wallet {
  balance: number;
  escrow_held: number;
  transactions: Transaction[];
}

export interface Dispute {
  id: string;
  order_id: string;
  order_title: string;
  raised_by: 'buyer' | 'seller';
  reason: string;
  status: 'open' | 'resolved';
  created_at: string;
}

export interface AdminStats {
  total_users: number;
  gmv_this_month: number;
  commission_earned: number;
  open_disputes: number;
}

export interface CategoryPricing {
  category: ServiceCategory;
  max_price: number;
}
