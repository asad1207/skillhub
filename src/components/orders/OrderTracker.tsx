import type { Order } from '../../types';
import { getOrderStatusStep } from '../../lib/utils';

const STEPS = [
  { label: 'Requested', key: 'pending'     },
  { label: 'Accepted',  key: 'accepted'    },
  { label: 'Working',   key: 'in_progress' },
  { label: 'Delivered', key: 'delivered'   },
  { label: 'Approved',  key: 'approved'    },
  { label: 'Paid',      key: 'completed'   },
];

export default function OrderTracker({ order }: { order: Order }) {
  const currentStep = getOrderStatusStep(order.status);

  return (
    <div className="flex items-center gap-0 overflow-x-auto">
      {STEPS.map((step, i) => {
        const isDone    = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                style={{
                  background: isDone    ? '#1D9E75'
                            : isCurrent ? '#E1F5EE'
                            : '#F1EFE8',
                  color:      isDone    ? '#fff'
                            : isCurrent ? '#0F6E56'
                            : '#888780',
                  border:     isCurrent ? '1.5px solid #1D9E75' : '0.5px solid #D3D1C7',
                }}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span
                className="text-xs whitespace-nowrap"
                style={{
                  color:      isCurrent ? '#0F6E56' : '#888780',
                  fontWeight: isCurrent ? 500 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-px mx-1 flex-shrink-0"
                style={{
                  width:      24,
                  background: isDone ? '#1D9E75' : '#D3D1C7',
                  marginBottom: 16,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
