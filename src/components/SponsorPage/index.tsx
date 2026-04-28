import { useState } from 'react';
import { Mail, Phone, ExternalLink, Building2, HeartHandshake, Copy, Check } from 'lucide-react';

export default function SponsorPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ''));
      setCopiedField(fieldId);
      window.setTimeout(() => setCopiedField((current) => (current === fieldId ? null : current)), 1500);
    } catch {
      // Clipboard might be unavailable in some browser/privacy contexts.
      setCopiedField(null);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-white">

      {/* Page Header */}
      <div className="bg-white border-b border-burgundy/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-20 text-center">
          <span className="font-display text-xs text-bronze uppercase tracking-[0.4em] mb-4 block">
            Project 108 · GMC Authority
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-burgundy uppercase tracking-tight leading-tight mb-4">
            How to Sponsor
          </h1>
          <p className="font-body text-burgundy/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Join the Circle of Merit. Your sponsorship raises a Jangchub Chorten along the Mau Chu River — a gift of merit for all sentient beings.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-12 text-center">

        {/* Contact */}
        <section className="flex flex-col items-center">
          <p className="font-display text-xs uppercase tracking-widest text-bronze mb-5">
            Get in Touch
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <a
              href="mailto:108@gmc.bt?subject=Jangchub Chorten Sponsorship Inquiry"
              className="flex items-center gap-4 border border-burgundy/15 p-5 hover:border-burgundy/40 transition-colors group"
            >
              <div className="w-11 h-11 bg-burgundy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/10 transition-colors">
                <Mail size={18} className="text-burgundy" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">Email</p>
                <p className="font-display text-base font-bold text-burgundy">108@gmc.bt</p>
              </div>
            </a>
            <a
              href="tel:+97517133171"
              className="flex items-center gap-4 border border-burgundy/15 p-5 hover:border-burgundy/40 transition-colors group"
            >
              <div className="w-11 h-11 bg-burgundy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/10 transition-colors">
                <Phone size={18} className="text-burgundy" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">Phone</p>
                <p className="font-display text-base font-bold text-burgundy">+975 17133171</p>
              </div>
            </a>
          </div>
        </section>

        <div className="border-t border-burgundy/10" />

        {/* Bank Details */}
        <section className="flex flex-col items-center">
          <p className="font-display text-xs uppercase tracking-widest text-bronze mb-5">
            Bank Transfer Details
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">

            {/* Bank of Bhutan */}
            <div className="bg-white border border-burgundy/15 text-left">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-burgundy/10">
                <Building2 size={15} className="text-bronze" strokeWidth={1.5} />
                <p className="font-display text-sm font-bold text-burgundy uppercase tracking-wide">
                  Bank of Bhutan
                </p>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account Name</span>
                  <span className="font-display text-sm font-bold text-burgundy">108 STUPAS</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account Number</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('100 167 774', 'bob-account')}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-burgundy tracking-widest hover:text-burgundy/75 transition-colors"
                    aria-label="Copy Bank of Bhutan account number"
                  >
                    <span>100 167 774</span>
                    {copiedField === 'bob-account' ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="pt-4 border-t border-burgundy/10">
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-2">International Transfers</p>
                  <a
                    href="https://www.bob.bt/business-banking/remittance/foreign-currency-remittance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-burgundy/75 hover:text-burgundy transition-colors italic"
                  >
                    bob.bt · Foreign Currency Remittance
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* DK Bank */}
            <div className="bg-white border border-burgundy/15 text-left">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-burgundy/10">
                <Building2 size={15} className="text-bronze" strokeWidth={1.5} />
                <p className="font-display text-sm font-bold text-burgundy uppercase tracking-wide">
                  DK Bank
                </p>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account Name</span>
                  <span className="font-display text-sm font-bold text-burgundy">108 STUPAS</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Local (BTN)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('110 134 977 668', 'dk-local')}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-burgundy tracking-widest hover:text-burgundy/75 transition-colors"
                    aria-label="Copy DK Bank local account number"
                  >
                    <span>110 134 977 668</span>
                    {copiedField === 'dk-local' ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">USD Account</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('120 185 133 474', 'dk-usd')}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-burgundy tracking-widest hover:text-burgundy/75 transition-colors"
                    aria-label="Copy DK Bank USD account number"
                  >
                    <span>120 185 133 474</span>
                    {copiedField === 'dk-usd' ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="pt-4 border-t border-burgundy/10">
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-2">International Transfers</p>
                  <a
                    href="https://www.digitalkidu.bt/remit-money"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-burgundy/75 hover:text-burgundy transition-colors italic"
                  >
                    digitalkidu.bt/remit-money
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="border-t border-burgundy/10" />

        {/* After Transfer Note */}
        <section className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4 bg-burgundy/5 border border-burgundy/10 p-6">
            <HeartHandshake size={20} className="text-bronze flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-bronze mb-2">After Your Transfer</p>
              <p className="font-body text-burgundy/80 text-base leading-relaxed">
                Please send your <span className="text-burgundy font-semibold">transaction screenshot or payment details</span> along with your <span className="text-burgundy font-semibold">name, location, and a dedication</span> to{' '}
                <a href="mailto:108@gmc.bt" className="text-burgundy font-semibold hover:underline">108@gmc.bt</a>.
                Your name will be recorded in the Circle of Merit for your Jangchub Chorten.
              </p>
            </div>
          </div>

          <a
            href="mailto:108@gmc.bt?subject=Jangchub Chorten Sponsorship Inquiry"
            className="mt-4 block w-full bg-burgundy text-gold font-display text-xs tracking-widest uppercase py-4 text-center hover:bg-burgundy/90 transition-colors"
          >
            Send a Sponsorship Inquiry
          </a>
        </section>

      </div>
    </main>
  );
}
