import { useState } from 'react';
import { mockOrders } from '../lib/mockData';
import type { Order, OrderStatus } from '../types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status, updated_at: new Date().toISOString() } : o)
    );
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const rateOrder = (orderId: string, rating: number, review: string) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, rating, review } : o)
    );
  };

  const activeOrders  = orders.filter(o => ['pending', 'accepted', 'in_progress', 'delivered'].includes(o.status));
  const pastOrders    = orders.filter(o => ['completed', 'cancelled'].includes(o.status));

  return { orders, activeOrders, pastOrders, updateStatus, addOrder, rateOrder };
}
