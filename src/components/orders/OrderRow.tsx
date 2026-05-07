import type { Order } from '../../types';
import { formatCurrency, getOrderStatusLabel, timeAgo } from '../../lib/utils';
import Badge from '../ui/Badge';
import Stars from '../ui/Stars';

const statusVariant: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'muted'> = {
  pending:     'warn',
  accepted:    'info',
  in_progress: 'info',
  delivered:   'info',
  approved:    'success',
  completed:   'success',
  disputed:    'danger',
  cancelled:   'muted',
};

interface OrderRowProps {
  order: Order;
  onOpenChat?: (orderId: string) => void;
}

export default function OrderRow({ order, onOpenChat }: OrderRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{order.service_title}</div>
        <div className="text-xs text-gray-400 mt-0.5">
          {order.seller_name} · {timeAgo(order.updated_at)} · {formatCurrency(order.price)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {order.rating && <Stars rating={order.rating} size={13} />}
        <Badge variant={statusVariant[order.status]}>
          {getOrderStatusLabel(order.status)}
        </Badge>
        {onOpenChat && ['in_progress', 'accepted', 'delivered'].includes(order.status) && (
          <button
            onClick={() => onOpenChat(order.id)}
            className="text-xs px-2 py-1 rounded-md bg-transparent border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Chat
          </button>
        )}
      </div>
    </div>
  );
}
