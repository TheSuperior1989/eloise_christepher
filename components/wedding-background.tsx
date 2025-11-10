import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WeddingBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'peach' | 'cream' | 'gradient';
  showFloralCorners?: boolean | {
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
  };
  showDivider?: boolean;
  className?: string;
  textureOpacity?: number;
}

export function WeddingBackground({
  children,
  variant = 'default',
  showFloralCorners = false,
  showDivider = false,
  className,
  textureOpacity = 1,
}: WeddingBackgroundProps): React.ReactElement {
  const backgroundClasses = {
    default: 'bg-background',
    peach: 'bg-wedding-peach-gradient',
    cream: 'bg-[oklch(0.97_0.015_45)]',
    gradient: 'bg-wedding-gradient',
  };

  // Determine which corners to show
  const corners = typeof showFloralCorners === 'boolean'
    ? {
        topLeft: showFloralCorners,
        topRight: showFloralCorners,
        bottomLeft: showFloralCorners,
        bottomRight: showFloralCorners,
      }
    : {
        topLeft: showFloralCorners?.topLeft ?? false,
        topRight: showFloralCorners?.topRight ?? false,
        bottomLeft: showFloralCorners?.bottomLeft ?? false,
        bottomRight: showFloralCorners?.bottomRight ?? false,
      };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgroundClasses[variant],
        className
      )}
    >
      {/* Watercolor texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: textureOpacity }}
      >
        <Image
          src="/assets/watercolor-texture-1.svg"
          alt=""
          fill
          className="object-cover mix-blend-multiply"
          priority={false}
        />
      </div>

      {/* Floral corner decorations - full-scale background images */}
      <>
        {/* Top Left - full background image positioned in corner */}
        {corners.topLeft && (
          <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-10 opacity-50">
            <Image
              src="/assets/floral-corner-top-left.jpg"
              alt=""
              fill
              className="object-cover object-left-top"
              priority={false}
            />
          </div>
        )}

        {/* Top Right - full background image positioned in corner */}
        {corners.topRight && (
          <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none z-10 opacity-50">
            <Image
              src="/assets/floral-corner-top-right.jpg"
              alt=""
              fill
              className="object-cover object-right-top"
              priority={false}
            />
          </div>
        )}

        {/* Bottom Left - full background image positioned in corner */}
        {corners.bottomLeft && (
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none z-10 opacity-50">
            <Image
              src="/assets/floral-corner-bottom-left.jpg"
              alt=""
              fill
              className="object-cover object-left-bottom"
              priority={false}
            />
          </div>
        )}

        {/* Bottom Right - full background image positioned in corner */}
        {corners.bottomRight && (
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none z-10 opacity-50">
            <Image
              src="/assets/floral-corner-bottom-right.jpg"
              alt=""
              fill
              className="object-cover object-right-bottom"
              priority={false}
            />
          </div>
        )}
      </>

      {/* Content */}
      <div className="relative z-20">{children}</div>

      {/* Bottom floral divider */}
      {showDivider && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-none z-10 opacity-70" style={{ height: '40px' }}>
          <Image
            src="/assets/floral-divider.png"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      )}
    </section>
  );
}

interface FloralDividerProps {
  className?: string;
}

export function FloralDivider({ className }: FloralDividerProps): React.ReactElement {
  return (
    <div className={cn('relative w-full my-4 md:my-6', className)} style={{ height: '40px' }}>
      <Image
        src="/assets/floral-divider.png"
        alt=""
        fill
        className="object-contain opacity-70"
        priority={false}
      />
    </div>
  );
}

interface WatercolorSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export function WatercolorSection({
  children,
  className,
  intensity = 'medium',
}: WatercolorSectionProps): React.ReactElement {
  const intensityOpacity = {
    light: 0.3,
    medium: 0.6,
    strong: 1,
  };

  return (
    <div className={cn('relative', className)}>
      {/* Watercolor texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: intensityOpacity[intensity] }}
      >
        <Image
          src="/assets/watercolor-texture-2.svg"
          alt=""
          fill
          className="object-cover mix-blend-multiply"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

