import { Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-burgundy-dark border-t border-gold/20 mx-4 md:mx-8 mb-4 md:mb-8 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto p-10 md:p-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gold flex items-center justify-center text-burgundy font-display font-bold text-sm">
                108
              </div>
              <div>
                <h2 className="font-display text-xl uppercase tracking-widest text-gold">Project 108</h2>
                <p className="font-display text-bronze text-xs uppercase tracking-widest mt-0.5">
                  Gelephu Mindfulness City
                </p>
              </div>
            </div>

            <h3 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight text-gold uppercase">
              A Royal Gift
              <br />
              of Peace.
            </h3>
            <p className="font-body text-bronze leading-relaxed mb-8 max-w-lg text-lg">
              Project 108 is a collective offering to the world. 108 Jangchub
              Jangchub Chortens, each standing 15 metres tall, raised in a single
              coordinated day along the Mao Chu River as an act of merit for all
              sentient beings everywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:108@gmc.bt?subject=Jangchub Chorten Sponsorship Inquiry"
                className="px-8 py-4 bg-gold text-burgundy font-display text-xs tracking-widest uppercase hover:bg-gold/90 transition-all duration-108 text-center"
              >
                Become a Sponsor
              </a>
              <a
                href="mailto:108@gmc.bt?subject=Project 108 Inquiry"
                className="px-8 py-4 border border-gold/20 font-display text-xs tracking-widest uppercase text-bronze hover:border-gold/40 hover:text-gold transition-all duration-108 text-center"
              >
                Project Inquiries
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gold/10">
              <p className="font-body text-bronze text-lg italic leading-relaxed">
                "In the Buddhist tradition, building a Jangchub Chorten generates merit
                not only for the builder but for everyone who sees it, touches
                it, or passes by it. A Jangchub Chorten is a gift that keeps giving,
                across generations."
              </p>
            </div>
          </div>

          {/* Right — Contact */}
          <div className="border border-gold/20 p-8 md:p-10">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze mb-8">
              GMC Authority · Official Contact
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-bronze" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:108@gmc.bt"
                    className="font-display text-lg font-bold text-gold hover:text-gold/80 transition-colors duration-108 tracking-wide"
                  >
                    108@gmc.bt
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-bronze" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <a
                    href="tel:+97577117708"
                    className="font-display text-lg font-bold text-gold hover:text-gold/80 transition-colors duration-108 tracking-wide"
                  >
                    +975 77117708
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Globe size={14} className="text-bronze" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-xs text-bronze uppercase tracking-wider mb-0.5">
                    Website
                  </p>
                  <span className="font-display text-lg font-bold text-gold/70 tracking-wide">
                    www.gmc.bt/108
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 border border-gold/20">
              <p className="font-display text-xs text-bronze uppercase tracking-widest mb-2">
                Sponsorship
              </p>
              <p className="font-display text-2xl font-bold text-gold">
                From USD 200,000
              </p>
              <p className="font-body text-sm text-bronze mt-1">
                Per Jangchub Chorten · Flexible by conversation
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-sm text-bronze">
            © 2026 Gelephu Mindfulness City Authority. Project 108 is a Royal
            Initiative of the Kingdom of Bhutan.
          </p>
          <p className="font-display text-xs uppercase tracking-widest text-bronze/60">
            1 November 2026 · Mao Chu River · Bhutan
          </p>
        </div>
      </div>
    </footer>
  );
}
