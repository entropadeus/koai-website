'use client';

import {
  useState,
  cloneElement,
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactElement,
  type TextareaHTMLAttributes
} from 'react';
import { motion } from 'framer-motion';

import { fadeUp } from '@/lib/motion';
import { AnimatedButton } from '@/components/AnimatedButton';

type UnderlineChild = ReactElement<
  InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>
>;

type UnderlineFieldProps = {
  id: string;
  label: string;
  children: UnderlineChild;
};

export function Contact() {
  return (
    <motion.footer
      id="contact"
      className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-10 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      <h2 className="text-3xl font-semibold sm:text-4xl">Work with KOAI</h2>
      <p className="mt-4 text-base text-ink/80 sm:text-lg">
        Tell us where momentum is stuck and we will send a tailored plan within two working days.
      </p>
      <form className="mt-10 space-y-8" action="mailto:hello@koai.studio" method="post">
        <UnderlineField id="name" label="Your name">
          <input name="name" type="text" autoComplete="name" required />
        </UnderlineField>
        <UnderlineField id="email" label="Email">
          <input name="email" type="email" autoComplete="email" required />
        </UnderlineField>
        <UnderlineField id="project" label="Project focus">
          <input name="project" type="text" required />
        </UnderlineField>
        <UnderlineField id="message" label="Notes">
          <textarea name="message" rows={4} required />
        </UnderlineField>
        <AnimatedButton
          type="submit"
          className="w-full border border-rust/30 bg-rust text-canvas sm:w-auto"
        >
          Send message
        </AnimatedButton>
      </form>
      <p className="mt-10 text-sm text-ink/60">
        Prefer async planning? Email <a className="underline underline-offset-4" href="mailto:hello@koai.studio">hello@koai.studio</a>.
      </p>
    </motion.footer>
  );
}

function UnderlineField({ id, label, children }: UnderlineFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    children.props.onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    children.props.onBlur?.(event);
  };

  const baseClass = 'w-full border-none bg-transparent text-base text-ink placeholder:text-ink/30 focus:outline-none';
  const mergedClass = children.props.className
    ? `${baseClass} ${children.props.className}`
    : baseClass;

  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-ink/70">{label}</span>
      <div className="relative mt-3">
        {cloneElement(children, {
          id,
          className: mergedClass,
          onFocus: handleFocus,
          onBlur: handleBlur
        })}
        <div className="absolute left-0 top-full h-px w-full bg-ink/20" />
        <motion.span
          className="absolute left-0 top-full h-[2px] w-full origin-left bg-rust"
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.2, 1, 0.36, 1] }}
        />
      </div>
    </label>
  );
}
