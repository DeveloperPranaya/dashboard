import { useEffect, useState } from 'react';

const ProgressRing = ({ percentage = 0, radius = 40, stroke = 5 }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (percentage && !isNaN(percentage)) {
      const strokeDashoffset = circumference - (percentage / 100) * circumference;
      setOffset(strokeDashoffset);
    } else {
      setOffset(circumference); // 0% progress
    }
  }, [percentage, circumference]);

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#8952E0"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          transition: 'stroke-dashoffset 0.6s ease-out',
          transform: 'rotate(-90deg)',
          transformOrigin: 'center center',
        }}
      />
    </svg>
  );
};

export default ProgressRing;
