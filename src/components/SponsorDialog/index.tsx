import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, ExternalLink, Building2 } from 'lucide-react';

interface SponsorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SponsorDialog({ isOpen, onClose }: SponsorDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-burgundy-dark/70 backdrop-blur-sm z-[2000]"
          />

          {/* Panel — absolutely centered, no scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-3xl z-[2001] bg-white"
          >
            {/* Header */}
            <div className="bg-burgundy px-6 py-4 flex items-center justify-between border-b border-gold/20">
              <div>
                <p className="font-display text-xs text-bronze uppercase tracking-[0.3em]">Project 108 · GMC Authority</p>
                <h2 className="font-display text-lg font-bold text-gold uppercase tracking-wide mt-0.5">
                  How to Sponsor
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 border border-gold/20 flex items-center justify-center text-bronze hover:text-gold hover:border-gold/40 transition-colors flex-shrink-0"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="mailto:108@gmc.bt?subject=Jangchub Chorten Sponsorship Inquiry"
                  className="flex items-center gap-3 border border-burgundy/15 p-3 hover:border-burgundy/40 transition-colors group"
                >
                  <div className="w-9 h-9 bg-burgundy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/10 transition-colors">
                    <Mail size={15} className="text-burgundy" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">Email</p>
                    <p className="font-display text-sm font-bold text-burgundy">108@gmc.bt</p>
                  </div>
                </a>
                <a
                  href="tel:+97577117708"
                  className="flex items-center gap-3 border border-burgundy/15 p-3 hover:border-burgundy/40 transition-colors group"
                >
                  <div className="w-9 h-9 bg-burgundy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/10 transition-colors">
                    <Phone size={15} className="text-burgundy" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="font-display text-sm font-bold text-burgundy">+975 77117708</p>
                  </div>
                </a>
              </div>

              <div className="border-t border-burgundy/10" />

              {/* Bank details — side by side */}
              <div>
                <p className="font-display text-xs uppercase tracking-widest text-bronze mb-3">
                  Bank Transfer Details
                </p>
                <div className="grid grid-cols-2 gap-3">

                  {/* Bank of Bhutan */}
                  <div className="bg-burgundy-dark border border-gold/20">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gold/10">
                      <Building2 size={13} className="text-bronze" strokeWidth={1.5} />
                      <p className="font-display text-xs font-bold text-gold uppercase tracking-wide">
                        Bank of Bhutan
                      </p>
                    </div>
                    <div className="px-4 py-4 space-y-2.5">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Name</span>
                        <span className="font-display text-xs font-bold text-gold text-right">108 STUPAS</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account</span>
                        <span className="font-display text-xs font-bold text-gold tracking-widest text-right">100 167 774</span>
                      </div>
                      <div className="pt-2.5 border-t border-gold/10">
                        <p className="font-display text-xs text-bronze uppercase tracking-wider mb-1.5">International</p>
                        <a
                          href="https://www.bob.bt/business-banking/remittance/foreign-currency-remittance/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-body text-xs text-gold/80 hover:text-gold transition-colors italic"
                        >
                          bob.bt · Foreign Remittance
                          <ExternalLink size={10} strokeWidth={1.5} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* DK Bank */}
                  <div className="bg-burgundy-dark border border-gold/20">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gold/10">
                      <Building2 size={13} className="text-bronze" strokeWidth={1.5} />
                      <p className="font-display text-xs font-bold text-gold uppercase tracking-wide">
                        DK Bank
                      </p>
                    </div>
                    <div className="px-4 py-4 space-y-2.5">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Name</span>
                        <span className="font-display text-xs font-bold text-gold text-right">108 STUPAS</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Local (BTN)</span>
                        <span className="font-display text-xs font-bold text-gold tracking-widest text-right">110 134 977 668</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">USD</span>
                        <span className="font-display text-xs font-bold text-gold tracking-widest text-right">120 185 133 474</span>
                      </div>
                      <div className="pt-2.5 border-t border-gold/10">
                        <p className="font-display text-xs text-bronze uppercase tracking-wider mb-1.5">International</p>
                        <a
                          href="https://www.digitalkidu.bt/remit-money"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-body text-xs text-gold/80 hover:text-gold transition-colors italic"
                        >
                          digitalkidu.bt/remit-money
                          <ExternalLink size={10} strokeWidth={1.5} />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="border-t border-burgundy/10" />

              {/* Note */}
              <div className="bg-burgundy/5 border border-burgundy/10 px-5 py-4">
                <p className="font-body text-bronze text-sm leading-relaxed italic">
                  After completing your transfer, please send your{' '}
                  <span className="text-burgundy not-italic font-semibold">transaction screenshot or payment details</span>
                  {' '}along with your name, location, and a dedication to{' '}
                  <a href="mailto:108@gmc.bt" className="text-burgundy not-italic font-semibold hover:underline">108@gmc.bt</a>
                  {' '}— your name will be recorded in the Circle of Merit for your Jangchub Chorten.
                </p>
              </div>

              {/* CTA */}
              <a
                href="mailto:108@gmc.bt?subject=Jangchub Chorten Sponsorship Inquiry"
                className="block w-full bg-burgundy text-gold font-display text-xs tracking-widest uppercase py-3.5 text-center hover:bg-burgundy/90 transition-colors"
              >
                Send a Sponsorship Inquiry
              </a>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
