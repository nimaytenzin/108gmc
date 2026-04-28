import { Mail, Phone, ExternalLink, Building2, HeartHandshake } from 'lucide-react';

export default function SponsorPage() {
  return (
    <main className="pt-20 min-h-screen bg-white">

      {/* Page Header */}
      <div className="bg-burgundy-dark border-b border-gold/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <span className="font-display text-xs text-bronze uppercase tracking-[0.4em] mb-4 block">
            Project 108 · GMC Authority
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold uppercase tracking-tight leading-tight mb-4">
            How to Sponsor
          </h1>
          <p className="font-body text-gold/70 text-lg leading-relaxed max-w-xl">
            Join the Circle of Merit. Your sponsorship raises a Jangchub Chorten along the Mau Chu River — a gift of merit for all sentient beings.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-12">

        {/* Contact */}
        <section>
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
              href="tel:+97577117708"
              className="flex items-center gap-4 border border-burgundy/15 p-5 hover:border-burgundy/40 transition-colors group"
            >
              <div className="w-11 h-11 bg-burgundy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/10 transition-colors">
                <Phone size={18} className="text-burgundy" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">Phone</p>
                <p className="font-display text-base font-bold text-burgundy">+975 77117708</p>
              </div>
            </a>
          </div>
        </section>

        <div className="border-t border-burgundy/10" />

        {/* Bank Details */}
        <section>
          <p className="font-display text-xs uppercase tracking-widest text-bronze mb-5">
            Bank Transfer Details
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">

            {/* Bank of Bhutan */}
            <div className="bg-burgundy-dark border border-gold/20">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/10">
                <Building2 size={15} className="text-bronze" strokeWidth={1.5} />
                <p className="font-display text-sm font-bold text-gold uppercase tracking-wide">
                  Bank of Bhutan
                </p>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account Name</span>
                  <span className="font-display text-sm font-bold text-gold">108 STUPAS</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account Number</span>
                  <span className="font-display text-sm font-bold text-gold tracking-widest">100 167 774</span>
                </div>
                <div className="pt-4 border-t border-gold/10">
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-2">International Transfers</p>
                  <a
                    href="https://www.bob.bt/business-banking/remittance/foreign-currency-remittance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-gold/80 hover:text-gold transition-colors italic"
                  >
                    bob.bt · Foreign Currency Remittance
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* DK Bank */}
            <div className="bg-burgundy-dark border border-gold/20">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/10">
                <Building2 size={15} className="text-bronze" strokeWidth={1.5} />
                <p className="font-display text-sm font-bold text-gold uppercase tracking-wide">
                  DK Bank
                </p>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Account Name</span>
                  <span className="font-display text-sm font-bold text-gold">108 STUPAS</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">Local (BTN)</span>
                  <span className="font-display text-sm font-bold text-gold tracking-widest">110 134 977 668</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-display text-xs text-bronze uppercase tracking-wider flex-shrink-0">USD Account</span>
                  <span className="font-display text-sm font-bold text-gold tracking-widest">120 185 133 474</span>
                </div>
                <div className="pt-4 border-t border-gold/10">
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-2">International Transfers</p>
                  <a
                    href="https://www.digitalkidu.bt/remit-money"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-gold/80 hover:text-gold transition-colors italic"
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
        <section className="max-w-2xl">
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
