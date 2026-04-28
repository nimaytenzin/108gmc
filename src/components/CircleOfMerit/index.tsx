import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, Globe, ArrowRight, X, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Stupa } from '../../types/stupa';

interface CircleOfMeritProps {
  stupa: Stupa;
  onClose: () => void;
}

export default function CircleOfMerit({ stupa, onClose }: CircleOfMeritProps) {
  const statusLabel =
    stupa.status === 'funded'
      ? 'Sponsorship Fulfilled'
      : stupa.status === 'partial'
        ? 'Open for Merit'
        : 'Awaiting a Sponsor';

  return (
    <AnimatePresence>
      <motion.div
        key={stupa.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.216, ease: 'easeOut' }}
        className="border border-burgundy/10 bg-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-burgundy/10">
          {/* Left Panel */}
          <div className="lg:col-span-4 p-6 md:p-8 space-y-4">
            {/* Stats */}
            <div className="border border-burgundy/10 p-6">
              <span className="font-display text-xs text-bronze uppercase tracking-[0.2em]">
                Merit Partners
              </span>
              <div className="font-display text-4xl font-bold text-burgundy mt-2">
                {stupa.merit_partners?.length || 0}
              </div>
              <p className="font-body text-bronze text-base mt-1">
                Collective sponsors for Jangchub Chorten #{stupa.id}
              </p>

              <div className="mt-6 pt-6 border-t border-burgundy/10">
                <div className="flex justify-between font-display text-xs text-bronze uppercase mb-2">
                  <span>Unit Funding</span>
                  <span>{stupa.funding_percentage}%</span>
                </div>
                <div className="w-full bg-burgundy/10 h-px overflow-hidden">
                  <motion.div
                    className="h-px bg-burgundy"
                    initial={{ width: 0 }}
                    animate={{ width: `${stupa.funding_percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>
            </div>

            {/* Location — dark accent panel */}
            <div className="bg-burgundy-dark border border-gold/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={13} className="text-bronze" strokeWidth={1.5} />
                <span className="font-display text-xs uppercase tracking-wider text-bronze">
                  Site Detail
                </span>
              </div>
              <p className="font-display text-xs text-bronze uppercase tracking-wider mb-1">
                Mau Chu River
              </p>
              <p className="font-body text-base text-gold mb-1">
                {stupa.id <= 54 ? 'East Bank' : 'West Bank'} · Jangchub Chorten #{stupa.id}
              </p>
              <p className="font-body text-bronze text-sm mb-6">
                {((stupa.id - 1) * 108).toLocaleString()}m from start of procession
              </p>
              <span className="font-display text-xs uppercase tracking-widest text-gold border border-gold/30 px-3 py-1">
                {statusLabel}
              </span>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 border border-burgundy/20 font-display text-xs text-bronze uppercase tracking-widest hover:border-burgundy/40 hover:text-burgundy transition-all duration-108"
            >
              <X size={13} strokeWidth={1.5} />
              Close Panel
            </button>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8 flex flex-col overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-5 md:p-6 border-b border-burgundy/10">
              <h3 className="font-display text-base md:text-lg font-bold text-burgundy flex items-center gap-2 uppercase tracking-wide">
                <User size={16} className="text-bronze shrink-0" strokeWidth={1.5} />
                Circle of Merit · Jangchub Chorten #{stupa.id}
              </h3>
              <span className="font-display text-xs uppercase tracking-widest text-bronze border border-burgundy/20 px-3 py-1 self-start sm:self-auto">
                {statusLabel}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto max-h-72 p-6 space-y-3">
              {stupa.merit_partners?.length > 0 ? (
                stupa.merit_partners.map((partner, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={cn(
                      'flex items-start gap-4 p-4 border transition-all duration-108',
                      idx === 0
                        ? 'border-gold/50 bg-gold/10'
                        : 'border-transparent hover:border-burgundy/10 hover:bg-burgundy/5',
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 flex items-center justify-center shrink-0',
                        idx === 0 ? 'bg-burgundy text-gold' : 'bg-burgundy/10 text-bronze',
                      )}
                    >
                      <User size={15} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className="font-display text-sm font-bold text-burgundy uppercase tracking-wide">
                            {partner.name}
                          </h5>
                          <p className="font-display text-xs text-bronze uppercase tracking-wider mt-0.5">
                            {partner.location} · {idx === 0 ? 'Lead Sponsor' : 'Merit Partner'}
                          </p>
                        </div>
                        {idx === 0 && (
                          <ShieldCheck size={14} className="text-bronze shrink-0 mt-0.5" strokeWidth={1.5} />
                        )}
                      </div>
                      <blockquote className="mt-2 font-body text-base text-burgundy/70 italic leading-relaxed border-l border-bronze/40 pl-3">
                        "{partner.dedication}"
                      </blockquote>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <Heart size={36} className="text-bronze/20 mb-4" strokeWidth={1} />
                  <p className="font-body text-bronze italic text-lg">
                    This Jangchub Chorten awaits its first patron.
                  </p>
                  <p className="font-body text-sm text-bronze/60 mt-2 max-w-xs leading-relaxed">
                    Join the procession and anchor your name in the Mau Chu for generations to come.
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-burgundy/10 flex flex-col sm:flex-row gap-3">
              <a
                href="#footer"
                className="flex-1 bg-burgundy text-gold py-4 font-display text-xs tracking-widest uppercase hover:bg-burgundy/90 transition-all duration-108 flex items-center justify-center gap-2"
              >
                {stupa.status === 'funded' ? 'View Commemoration' : 'Partner with this Jangchub Chorten'}
                <ArrowRight size={13} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:108@gmc.bt"
                className="sm:w-auto px-6 py-4 border border-burgundy/20 font-display text-xs text-bronze uppercase tracking-widest hover:border-burgundy/40 hover:text-burgundy transition-all duration-108 text-center"
              >
                Inquiry
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
