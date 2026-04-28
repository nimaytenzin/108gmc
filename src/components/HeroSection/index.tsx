import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { motion } from 'framer-motion';

const TARGET = new Date('2026-11-01T00:00:00+06:00');

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(() =>
    Math.max(0, differenceInSeconds(target, new Date())),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.max(0, differenceInSeconds(target, new Date())));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
}

const PROJECT_STATS = [
  { value: '108', label: 'Jangchub Chortens' },
  { value: '15m', label: 'Height Each' },
  { value: '108m', label: 'Spacing' },
  { value: '12km', label: 'Total Line' },
];

const READINESS = [
  { label: 'Site', status: 'CONFIRMED', desc: '12km along the Mau Chu' },
  { label: 'Design', status: 'LOCKED', desc: 'Jangchub Chorten, 15m' },
  { label: 'Engineering', status: 'UNDERWAY', desc: 'Foundations in preparation' },
  { label: 'Volunteers', status: 'ACTIVE', desc: '40,000 needed for the final day' },
];

export default function HeroSection() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET);

  return (
    <section className="relative overflow-hidden bg-burgundy-dark">
      {/* Decorative watermark */}
      <div className="absolute right-0 top-0 text-[28rem] font-display font-bold text-gold/[0.03] leading-none select-none pointer-events-none overflow-hidden">
        108
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />

      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block text-bronze font-display text-xs uppercase tracking-[0.4em] mb-6">
              A Royal Initiative · Bhutan · 2026
            </span>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6 text-gold">
              108 Jangchub Chortens.
              <br />
              <span className="text-bronze">One Day.</span>
            </h1>

            <p className="font-body text-gold/70 text-xl leading-relaxed mb-10 max-w-xl">
              A Royal initiative to raise 108 Jangchub Chortens in a single
              coordinated day along the Mau Chu River, Gelephu Mindfulness City —
              a collective act of merit for all sentient beings.
            </p>

            <blockquote className="border-l-2 border-bronze pl-6 mb-10">
              <p className="font-body text-gold/80 italic text-xl leading-relaxed mb-4">
                "We must do it to prove to ourselves that, as we face the
                challenges ahead, there is no limit to what we can achieve when
                we stand together."
              </p>
              <cite className="text-bronze font-display text-xs uppercase tracking-widest not-italic">
                His Majesty Jigme Khesar Namgyel Wangchuck
                <span className="text-bronze/50 font-body text-sm normal-case tracking-normal">
                  {' '}— 21 February 2026
                </span>
              </cite>
            </blockquote>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gold/10">
              {PROJECT_STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold">
                    {s.value}
                  </div>
                  <div className="font-display text-xs text-bronze uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="border border-gold/20 p-8 md:p-10"
          >
            <p className="text-bronze font-display text-xs uppercase tracking-[0.3em] mb-8 text-center">
              Completion Countdown · 1 November 2026
            </p>

            <div className="grid grid-cols-4 gap-3 mb-10">
              {[
                { v: days, label: 'Days' },
                { v: hours, label: 'Hours' },
                { v: minutes, label: 'Min' },
                { v: seconds, label: 'Sec' },
              ].map(({ v, label }) => (
                <div
                  key={label}
                  className="text-center border border-gold/20 p-3 md:p-4"
                >
                  <div className="font-display text-3xl md:text-5xl font-bold text-gold tabular-nums">
                    {String(v).padStart(2, '0')}
                  </div>
                  <div className="font-display text-xs text-bronze uppercase tracking-widest mt-2">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-0">
              {READINESS.map(({ label, status, desc }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3 border-b border-gold/10 last:border-0"
                >
                  <div>
                    <span className="font-display text-gold text-xs uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="font-body text-bronze text-sm ml-2">— {desc}</span>
                  </div>
                  <span className="font-display text-gold text-xs uppercase tracking-wider">
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gold/10 text-center">
              <p className="font-body text-bronze text-base">
                Sponsorship from{' '}
                <span className="text-gold font-display font-bold">USD 200,000</span>
                {' '}per Jangchub Chorten
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
