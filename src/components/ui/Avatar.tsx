interface AvatarProps {
  initials: string;
  size?: number;
  bg?: string;
  color?: string;
}

export default function Avatar({
  initials,
  size = 36,
  bg = '#E1F5EE',
  color = '#0F6E56',
}: AvatarProps) {
  return (
    <div
      style={{
        width:          size,
        height:         size,
        borderRadius:   '50%',
        background:     bg,
        color,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       size * 0.35,
        fontWeight:     500,
        flexShrink:     0,
        border:         '0.5px solid rgba(0,0,0,0.08)',
      }}
    >
      {initials}
    </div>
  );
}
