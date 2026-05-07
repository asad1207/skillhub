import type { Transaction } from '../../types';
import { formatCurrency, getTransactionSign, getTransactionColor, timeAgo } from '../../lib/utils';

export default function TransactionRow({ tx }: { tx: Transaction }) {
  const sign  = getTransactionSign(tx.type);
  const color = getTransactionColor(tx.type);
  const absAmount = Math.abs(tx.amount);

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
      <div>
        <div className="text-sm text-gray-800">{tx.description}</div>
        <div className="text-xs text-gray-400 mt-0.5">{timeAgo(tx.created_at)}</div>
      </div>
      <div className="text-sm font-medium" style={{ color }}>
        {sign}{formatCurrency(absAmount)}
      </div>
    </div>
  );
}
