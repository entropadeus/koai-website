'use client';

import { motion } from 'framer-motion';

import { fadeUp, staggerChildren, letterVariant, letterStagger } from '@/lib/motion';

const aboutHighlights = [
  {
    label: 'Embedded',
    detail: 'We join for focused sprints and leave you with a team that operates smoother than before.'
  },
  {
    label: 'Deliberate',
    detail: 'Every artifact stays lean: paired handoffs, tidy systems, and decisions you can trace.'
  },
  {
    label: 'Modern',
    detail: 'You keep the momentum, we handle the messy modernization and document every move.'
  }
];

export function About() {
  return (
    <motion.section
      id="about"
      className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-10 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={staggerChildren}
    >
      <motion.div
        className="overflow-hidden rounded-4xl border border-transparent bg-white/70 p-8 shadow-[0_24px_48px_-32px_rgba(17,17,17,0.35)] backdrop-blur sm:p-12"
        variants={fadeUp}
      >
        <motion.div className="grid gap-10 sm:grid-cols-[1.1fr_0.9fr] sm:gap-14" variants={letterStagger}>
          <motion.div variants={fadeUp} className="space-y-6">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-rust/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rust"
              variants={fadeUp}
            >
              KOAI Method
            </motion.span>
            <motion.h2 className="text-3xl font-semibold sm:text-4xl" variants={fadeUp}>
              Thoughtful modernization without the drag
            </motion.h2>
            <motion.p className="text-base text-ink/80 sm:text-lg" variants={fadeUp}>
              KOAI Consulting partners with product leaders who need to refresh legacy flows while staying fast. We plug
              in beside your team, sequence clean upgrades, and leave you with confident ownership.
            </motion.p>
            <motion.div className="grid grid-cols-2 gap-4 text-left sm:max-w-xs" variants={letterStagger}>
              {['Delivery sprints', 'Design systems', 'Operational playbooks', 'Runway coaching'].map((item) => (
                <motion.span key={item} variants={letterVariant} className="text-sm text-ink/70">
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="space-y-6" variants={letterStagger}>
            {aboutHighlights.map((highlight) => (
              <motion.article
                key={highlight.label}
                className="group relative overflow-hidden rounded-[26px] border border-transparent bg-canvas/80 p-6 shadow-[0_12px_28px_-26px_rgba(17,17,17,0.35)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] transform-gpu sm:p-7"
                variants={fadeUp}
                whileHover={{
                  y: -18,
                  scale: 1.06,
                  borderRadius: '32px',
                  boxShadow: '0 38px 70px -42px rgba(17,17,17,0.55)',
                  borderColor: 'rgba(200,76,12,0.35)'
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="pointer-events-none absolute -inset-6 z-[-1] scale-95 rounded-[34px] bg-gradient-to-br from-rust/35 via-transparent to-sage/25 opacity-20 blur-3xl transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:opacity-70" />
                <span className="pointer-events-none absolute inset-x-6 bottom-2 h-12 rounded-full bg-gradient-to-b from-ink/25 via-ink/12 to-transparent opacity-0 blur-lg transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-75 group-hover:translate-y-1 group-hover:scale-105" />
                <span className="pointer-events-none absolute inset-x-6 bottom-4 h-px origin-center scale-x-75 bg-gradient-to-r from-rust/0 via-rust/40 to-sage/30 opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-hover:translate-y-1 group-hover:opacity-100" />
                <div className="relative space-y-3 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-rust">{highlight.label}</h3>
                  <p className="text-sm text-ink/75 sm:text-base">{highlight.detail}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}















