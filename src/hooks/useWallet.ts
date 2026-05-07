import { useState } from 'react';
import { mockWallet } from '../lib/mockData';
import type { Wallet, Transaction } from '../types';

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet>(mockWallet);

  const addFunds = (amount: number) => {
    const tx: Transaction = {
      id: `t${Date.now()}`,
      user_id: 'u1',
      type: 'deposit',
      amount,
      description: 'Added funds',
      created_at: new Date().toISOString(),
    };
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [tx, ...prev.transactions],
    }));
  };

  return { wallet, addFunds };
}
