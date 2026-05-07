import { useState, useRef, useEffect } from 'react';
import type { Conversation, Message } from '../../types';
import Avatar from '../ui/Avatar';

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: string;
  onSend: (orderId: string, content: string) => void;
}

export default function ChatWindow({ conversation, currentUserId, onSend }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(conversation.order_id, input.trim());
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
        <Avatar initials={conversation.other_user_initials} size={28} />
        <div>
          <div className="text-sm font-medium">{conversation.other_user_name}</div>
          <div className="text-xs text-gray-400">{conversation.order_title}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2.5" style={{ minHeight: 0 }}>
        {conversation.messages.map((msg: Message) => {
          const isMe = msg.sender_id === currentUserId;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-xs px-3 py-2 rounded-xl text-sm leading-relaxed"
                style={{
                  background: isMe ? '#E1F5EE' : '#F1EFE8',
                  color:      isMe ? '#085041' : 'inherit',
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-300"
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 rounded-lg text-sm font-medium text-white border-0 cursor-pointer hover:opacity-90"
          style={{ backgroundColor: '#1D9E75' }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
