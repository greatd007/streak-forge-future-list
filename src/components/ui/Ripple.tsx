
import React, { useRef, useState } from "react";

/**
 * Ripple animation component for button clicks
 */
export const Ripple = () => {
  const [ripples, setRipples] = useState<{ x: number, y: number, key: number }[]>([]);
  const rippleRef = useRef<HTMLDivElement | null>(null);
  let rippleCount = 0;

  const createRipple = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!rippleRef.current) return;
    const rect = rippleRef.current.getBoundingClientRect();
    const size = rect.width > rect.height ? rect.width : rect.height;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setRipples((old) => [...old, { x, y, key: rippleCount++ }]);
    setTimeout(() => {
      setRipples((old) => old.slice(1));
    }, 450);
  };

  return (
    <div
      ref={rippleRef}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0"
      onMouseDown={createRipple}
    >
      {ripples.map(r => (
        <span
          key={r.key}
          className="ripple"
          style={{
            left: r.x,
            top: r.y,
          }}
        />
      ))}
      <style>{`
        .ripple {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(180,220,255,0.35) 0%, rgba(60,110,255,0.15) 80%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: scale(0);
          animation: ripple-animate 420ms cubic-bezier(0.25,0.8,0.25,1);
        }
        @keyframes ripple-animate {
          to {
            transform: scale(2.15);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
