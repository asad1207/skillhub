interface MetricCardProps {
  label: string;
  value: string | number;
  valueColor?: string;
}

export default function MetricCard({ label, value, valueColor }: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div
        className="text-2xl font-medium"
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </div>
    </div>
  );
}
