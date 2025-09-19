'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

import { AnimatedButton } from '@/components/AnimatedButton';
import { HeroCanvas } from '@/components/HeroCanvas';
import {
  fadeUp,
  scaleIn,
  staggerChildren,
  wordStagger,
  letterStagger,
  letterVariant
} from '@/lib/motion';

const labelText = 'KOAI';
const titleText = 'Plug and Play Modernization';

const MOBILE_BREAKPOINT = 768;

export function Hero() {
  const textScope = useRef<HTMLDivElement | null>(null);
  const labelLetters = useMemo(() => Array.from(labelText), []);
  const titleWords = useMemo(() => titleText.split(' '), []);

  useEffect(() => {
    const scope = textScope.current;
    if (!scope) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.hero-label', '.hero-title', '.hero-paragraph'],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.14
        }
      );
    }, scope);

    const pointerEnabled = { current: true };

    const updatePointerState = () => {
      const shouldDisable = window.innerWidth < MOBILE_BREAKPOINT;
      pointerEnabled.current = !shouldDisable;
      if (shouldDisable) {
        gsap.to(scope, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    };

    updatePointerState();

    const handlePointer = (event: PointerEvent) => {
      if (!scope || !pointerEnabled.current) {
        return;
      }
      const { innerWidth, innerHeight } = window;
      const offsetX = ((event.clientX / innerWidth) - 0.5) * 6;
      const offsetY = ((event.clientY / innerHeight) - 0.5) * 3;
      gsap.to(scope, {
        x: offsetX,
        y: offsetY,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    window.addEventListener('pointermove', handlePointer);
    window.addEventListener('resize', updatePointerState);

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('resize', updatePointerState);
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-canvas sm:min-h-[85vh]">
      <HeroCanvas />
      <div ref={textScope} className="relative z-10 mx-auto w-full max-w-3xl px-4 py-16 sm:px-10 sm:py-20">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-center"
        >
          <motion.span
            className="hero-label inline-flex flex-col items-center text-base font-semibold uppercase tracking-[0.35em] text-rust sm:text-xl"
            variants={fadeUp}
          >
            <span className="sr-only">{labelText}</span>
            <motion.span aria-hidden className="flex gap-[0.08em]" variants={letterStagger}>
              {labelLetters.map((char, index) => (
                <motion.span key={`${char}-${index}`} className="inline-block overflow-hidden" variants={letterVariant}>
                  <span className="inline-block">{char}</span>
                </motion.span>
              ))}
            </motion.span>
          </motion.span>
          <motion.h1 className="hero-title text-3xl font-semibold leading-tight sm:text-6xl" variants={fadeUp}>
            <span className="sr-only">{titleText}</span>
            <motion.span
              aria-hidden
              className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-pretty"
              variants={wordStagger}
            >
              {titleWords.map((word, wordIndex) => (
                <motion.span
                  key={`${word}-${wordIndex}`}
                  className="inline-flex overflow-hidden"
                  variants={letterStagger}
                >
                  {Array.from(word).map((char, charIndex) => (
                    <motion.span
                      key={`${word}-${char}-${charIndex}`}
                      className="inline-flex h-[1.1em] overflow-hidden"
                      variants={letterVariant}
                    >
                      <span className="inline-block leading-none">{char}</span>
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p className="hero-paragraph text-base text-ink/80 sm:text-xl" variants={fadeUp}>
            We plug into your product squad, rebuild the fragile parts, and leave you with a system that ships faster than it breaks.
          </motion.p>
          <motion.div variants={scaleIn} className="flex justify-center">
            <AnimatedButton as="a" href="#contact" className="w-full border border-rust/30 bg-rust text-canvas sm:w-auto">
              Start a project
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
