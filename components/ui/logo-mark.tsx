import { useId } from "react";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="12" y1="50" x2="52" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b21dff" />
          <stop offset="0.42" stopColor="#6e39ff" />
          <stop offset="0.78" stopColor="#2b57ff" />
          <stop offset="1" stopColor="#1fa8ff" />
        </linearGradient>
      </defs>
      <ellipse
        cx="32"
        cy="32"
        rx="14"
        ry="23"
        transform="rotate(-10 32 32)"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M22 46c2.3 4.2 6.3 6.6 10.8 6.6"
        fill="none"
        stroke="#cf2fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  );
}
