import type { OrderStatus, ServiceCategory, TransactionType } from '../types';

export function formatCurrency(amount: number): string {
  return `₹ ${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(dateStr);
}

export function getOrderStatusLabel(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    pending:     'Pending',
    accepted:    'Accepted',
    in_progress: 'In progress',
    delivered:   'Delivered',
    approved:    'Approved',
    completed:   'Completed',
    disputed:    'Disputed',
    cancelled:   'Cancelled',
  };
  return map[status];
}

export function getOrderStatusStep(status: OrderStatus): number {
  const steps: OrderStatus[] = ['pending', 'accepted', 'in_progress', 'delivered', 'approved', 'completed'];
  return steps.indexOf(status);
}

export function getCategoryColor(category: ServiceCategory): { bg: string; text: string } {
  const map: Record<ServiceCategory, { bg: string; text: string }> = {
    'Web Dev': { bg: '#E6F1FB', text: '#185FA5' },
    'Design':  { bg: '#EEEDFE', text: '#3C3489' },
    'Writing': { bg: '#EAF3DE', text: '#27500A' },
    'Video':   { bg: '#FAECE7', text: '#712B13' },
    'Other':   { bg: '#F1EFE8', text: '#5F5E5A' },
  };
  return map[category];
}

export function getTransactionSign(type: TransactionType): '+' | '-' {
  return ['deposit', 'refund', 'escrow_release'].includes(type) ? '+' : '-';
}

export function getTransactionColor(type: TransactionType): string {
  return ['deposit', 'refund'].includes(type) ? '#0F6E56' : '#A32D2D';
}

export function renderStars(rating: number): string {
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
}
