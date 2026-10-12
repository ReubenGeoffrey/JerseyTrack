import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Iconic Spider-Man chest insignia SVG (angular spider emblem)
 */
export function SpiderInsigniaIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Spider Head & Body */}
      <path d="M50 32 L46 39 L47 48 L50 50 L53 48 L54 39 Z" />
      <path d="M50 51 L44 57 L44 70 L50 82 L56 70 L56 57 Z" />
      {/* Top Left Legs */}
      <path
        d="M47 41 Q32 30 20 18 Q28 32 46 44 Z"
        fill="currentColor"
      />
      <path
        d="M46 46 Q28 39 12 36 Q25 48 45 49 Z"
        fill="currentColor"
      />
      {/* Bottom Left Legs */}
      <path
        d="M45 52 Q26 56 12 70 Q28 64 45 57 Z"
        fill="currentColor"
      />
      <path
        d="M46 59 Q32 68 22 90 Q36 78 47 64 Z"
        fill="currentColor"
      />
      {/* Top Right Legs */}
      <path
        d="M53 41 Q68 30 80 18 Q72 32 54 44 Z"
        fill="currentColor"
      />
      <path
        d="M54 46 Q72 39 88 36 Q75 48 55 49 Z"
        fill="currentColor"
      />
      {/* Bottom Right Legs */}
      <path
        d="M55 52 Q74 56 88 70 Q72 64 55 57 Z"
        fill="currentColor"
      />
      <path
        d="M54 59 Q68 68 78 90 Q64 78 53 64 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Iconic Spider-Man Mask with angular eyes & web lines
 */
export function SpiderMaskIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Mask Head Silhouette */}
      <path
        d="M50 8 C28 8 18 28 18 52 C18 72 34 90 50 96 C66 90 82 72 82 52 C82 28 72 8 50 8 Z"
        fill="#e11d48"
        stroke="#ff1744"
        strokeWidth="2.5"
      />
      {/* Web Lines on Mask */}
      <path d="M50 8 L50 96" stroke="#9f1239" strokeWidth="1.5" />
      <path d="M18 52 Q50 62 82 52" stroke="#9f1239" strokeWidth="1.5" />
      <path d="M22 36 Q50 48 78 36" stroke="#9f1239" strokeWidth="1.5" />
      <path d="M24 68 Q50 78 76 68" stroke="#9f1239" strokeWidth="1.5" />
      <path d="M30 20 Q50 32 70 20" stroke="#9f1239" strokeWidth="1.5" />
      {/* Left Eye Lens (Angular Spider Eyes) */}
      <path
        d="M45 42 L26 44 Q31 58 45 62 L47 52 Z"
        fill="#ffffff"
        stroke="#07080c"
        strokeWidth="3.5"
      />
      {/* Right Eye Lens */}
      <path
        d="M55 42 L74 44 Q69 58 55 62 L53 52 Z"
        fill="#ffffff"
        stroke="#07080c"
        strokeWidth="3.5"
      />
    </svg>
  );
}

/**
 * Geometric Spider Web Background Graphic
 */
export function SpiderWebGraphic({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Web Radiating Spokes */}
      <line x1="100" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="171" y2="29" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="171" y2="171" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="100" y2="200" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="29" y2="171" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="0" y2="100" stroke="currentColor" strokeWidth="0.8" />
      <line x1="100" y1="100" x2="29" y2="29" stroke="currentColor" strokeWidth="0.8" />
      {/* Concentric Web Rings */}
      <polygon points="100,20 156,44 180,100 156,156 100,180 44,156 20,100 44,44" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="100,40 142,58 160,100 142,142 100,160 58,142 40,100 58,58" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="100,60 128,72 140,100 128,128 100,140 72,128 60,100 72,72" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="100,80 114,86 120,100 114,114 100,120 86,114 80,100 86,86" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}
