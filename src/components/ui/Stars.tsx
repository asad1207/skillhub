interface StarsProps {
  rating: number;
  size?: number;
}

export default function Stars({ rating, size = 14 }: StarsProps) {
  return (
    <span style={{ color: '#BA7517', fontSize: size }}>
      {'★'.repeat(Math.round(rating))}
      <span style={{ color: '#D3D1C7' }}>
        {'★'.repeat(5 - Math.round(rating))}
      </span>
    </span>
  );
}
