import type { Service } from '../../types';
import { getCategoryColor, formatCurrency } from '../../lib/utils';
import Stars from '../ui/Stars';
import Avatar from '../ui/Avatar';

interface ServiceCardProps {
  service: Service;
  onOrder: (service: Service) => void;
}

const avatarColors: Record<string, { bg: string; color: string }> = {
  R: { bg: '#E1F5EE', color: '#0F6E56' },
  P: { bg: '#EEEDFE', color: '#3C3489' },
  A: { bg: '#EAF3DE', color: '#27500A' },
  K: { bg: '#FAECE7', color: '#712B13' },
  S: { bg: '#E1F5EE', color: '#0F6E56' },
};

export default function ServiceCard({ service, onOrder }: ServiceCardProps) {
  const catColor = getCategoryColor(service.category);
  const avatarColor = avatarColors[service.seller_initials] || { bg: '#E1F5EE', color: '#0F6E56' };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-300 transition-colors cursor-pointer">
      <div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md inline-block mb-2"
          style={{ background: catColor.bg, color: catColor.text }}
        >
          {service.category}
        </span>
        <div className="text-sm font-medium text-gray-900 mb-1">{service.title}</div>
        <div className="text-xs text-gray-500 leading-relaxed">{service.description}</div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="text-sm font-medium" style={{ color: '#0F6E56' }}>
          {formatCurrency(service.price)}
        </div>
        <div className="flex items-center gap-1.5">
          <Avatar
            initials={service.seller_initials}
            size={20}
            bg={avatarColor.bg}
            color={avatarColor.color}
          />
          <span className="text-xs text-gray-500">{service.seller_name}</span>
          <Stars rating={service.seller_rating} size={11} />
        </div>
      </div>

      <button
        onClick={() => onOrder(service)}
        className="w-full py-2 rounded-lg text-xs font-medium text-white border-0 cursor-pointer hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#1D9E75' }}
      >
        Order now
      </button>
    </div>
  );
}
