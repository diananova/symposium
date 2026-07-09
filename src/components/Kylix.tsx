// The kylix — a symposium wine cup seen from above — is the app's progress
// motif: an outer ring that fills with wine, a raised center like the cup's
// tondo.

interface KylixProps {
  size: number;
  /** 0..1 */
  fraction: number;
  olive?: boolean;
  /** Hide the center disc for small list rings */
  center?: boolean;
  strokeWidth?: number;
  label?: string;
}

export function Kylix({ size, fraction, olive, center = true, strokeWidth = 3, label }: KylixProps) {
  const r = size / 2 - strokeWidth * 1.5;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, fraction));
  const offset = circumference * (1 - clamped);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={label ?? `${Math.round(clamped * 100)}% complete`}
    >
      <circle className="kylix-bg" cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} />
      {clamped > 0 && (
        <circle
          className={`kylix-fill${olive ? ' olive' : ''}`}
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      )}
      {center && <circle className="kylix-center" cx={size / 2} cy={size / 2} r={r * 0.45} />}
    </svg>
  );
}
