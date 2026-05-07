import type { Conversation } from '../../types';
import Avatar from '../ui/Avatar';

interface ConversationListProps {
  conversations: Conversation[];
  activeOrderId: string | null;
  onSelect: (orderId: string) => void;
}

export default function ConversationList({ conversations, activeOrderId, onSelect }: ConversationListProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      {conversations.map(conv => (
        <button
          key={conv.order_id}
          onClick={() => onSelect(conv.order_id)}
          className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-0 transition-colors cursor-pointer ${
            activeOrderId === conv.order_id ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
          }`}
          style={{ border: 'none', borderBottom: '0.5px solid #F1EFE8' }}
        >
          <div className="flex items-center gap-2.5">
            <Avatar initials={conv.other_user_initials} size={32} />
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{conv.other_user_name}</div>
              <div className="text-xs text-gray-400 truncate">{conv.last_message}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
