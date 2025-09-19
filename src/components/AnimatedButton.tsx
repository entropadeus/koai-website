'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

type AnimatedButtonProps = {
  as?: 'a' | 'button';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children: string;
  className?: string;
};

export function AnimatedButton({
  as = 'button',
  href,
  type = 'button',
  children,
  className = ''
}: AnimatedButtonProps) {
  const scope = useRef<HTMLElement | null>(null);

  const letters = useMemo(() => Array.from(children), [children]);

  useEffect(() => {
    const element = scope.current;
    if (!element) {
      return;
    }

    const rollers = gsap.utils.toArray<HTMLElement>('.letter-roller', element);

    const animateTo = (value: number, config: gsap.TweenVars) => {
      if (!rollers.length) {
        return;
      }

      gsap.killTweensOf(rollers);
      gsap.to(rollers, {
        yPercent: value,
        overwrite: 'auto',
        ...config
      });
    };

    const handleEnter = () =>
      animateTo(-100, {
        duration: 0.45,
        ease: 'power3.out',
        stagger: { each: 0.02 }
      });

    const handleLeave = () =>
      animateTo(0, {
        duration: 0.6,
        ease: 'elastic.out(1, 0.75)',
        stagger: { each: 0.015 }
      });

    const handleFocus = handleEnter;
    const handleBlur = handleLeave;

    element.addEventListener('pointerenter', handleEnter);
    element.addEventListener('pointerleave', handleLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('pointerenter', handleEnter);
      element.removeEventListener('pointerleave', handleLeave);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
      gsap.killTweensOf(rollers);
    };
  }, []);

  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-transform duration-300';

  const computedClass = className ? `${baseClasses} ${className}` : baseClasses;

  const Tag = as === 'a' ? motion.a : motion.button;

  const sharedProps = {
    className: computedClass,
    whileHover: { scale: 1.06, opacity: 0.92 },
    whileTap: { scale: 0.97 },
    ref: scope
  } as const;

  const content = (
    <span className="pointer-events-none inline-flex items-center justify-center gap-[0.08em] leading-none">
      {letters.map((char, index) => {
        const displayChar = char === ' ' ? String.fromCharCode(160) : char;
        return (
          <span key={`${displayChar}-${index}`} className="letter-container inline-flex h-[1.05em] overflow-hidden">
            <span className="letter-roller flex flex-col">
              <span className="block">{displayChar}</span>
              <span className="block">{displayChar}</span>
            </span>
          </span>
        );
      })}
    </span>
  );

  if (as === 'a') {
    return (
      <Tag href={href} {...sharedProps}>
        {content}
      </Tag>
    );
  }

  return (
    <Tag type={type} {...sharedProps}>
      {content}
    </Tag>
  );
}
