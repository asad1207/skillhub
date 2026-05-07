type BadgeVariant = 'success' | 'info' | 'warn' | 'danger' | 'muted';

const styles: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: '#E1F5EE', color: '#0F6E56' },
  info:    { bg: '#E6F1FB', color: '#185FA5' },
  warn:    { bg: '#FAEEDA', color: '#633806' },
  danger:  { bg: '#FCEBEB', color: '#791F1F' },
  muted:   { bg: '#F1EFE8', color: '#5F5E5A' },
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'muted', children, className = '' }: BadgeProps) {
  const s = styles[variant];
  return (
    <span
      className={className}
      style={{
        background:   s.bg,
        color:        s.color,
        fontSize:     '11px',
        fontWeight:   500,
        padding:      '2px 8px',
        borderRadius: '6px',
        display:      'inline-block',
        whiteSpace:   'nowrap',
      }}
    >
      {children}
    </span>
  );
}
