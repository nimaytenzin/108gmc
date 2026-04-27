import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Stupa } from '../../types/stupa';

interface StupaCardProps {
  stupa: Stupa;
  isSelected: boolean;
  onClick: (id: number) => void;
}

export default function StupaCard({ stupa, isSelected, onClick }: StupaCardProps) {
  const leadSponsor = stupa.merit_partners?.find((p) => p.type === 'lead');

  return (
    <div
      onClick={() => onClick(stupa.id)}
      title={leadSponsor ? leadSponsor.name : 'Awaiting a Sponsor'}
      className="group relative cursor-pointer select-none px-1"
    >
      {/* Hover tooltip */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-burgundy text-gold text-xs px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-108 pointer-events-none z-20 border border-gold/20 font-display uppercase tracking-widest">
        {leadSponsor ? leadSponsor.name : 'Awaiting a Sponsor'}
      </div>

      {/* Chorten marker */}
      <motion.div
        animate={{ y: isSelected ? -8 : 0, scale: isSelected ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative"
      >
        <div
          className={cn(
            'relative w-14 h-14 mx-auto overflow-hidden border flex items-center justify-center transition-colors duration-108',
            stupa.status === 'funded'
              ? 'border-burgundy bg-burgundy'
              : stupa.status === 'partial'
                ? 'border-burgundy/30 bg-white'
                : 'border-dashed border-bronze/30 bg-white',
            isSelected ? 'ring-2 ring-burgundy/40' : 'group-hover:border-burgundy/40',
          )}
        >
          {stupa.status === 'partial' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gold/60"
              initial={{ height: 0 }}
              animate={{ height: `${stupa.funding_percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          )}
          {stupa.status === 'available' && (
            <div className="absolute bottom-1.5 right-1.5 opacity-60">
              <Lock size={10} className="text-bronze/40" strokeWidth={1} />
            </div>
          )}
          <div
            className={cn(
              'relative z-10 font-display text-sm tracking-wide',
              stupa.status === 'funded'
                ? 'text-gold'
                : isSelected ? 'text-burgundy' : 'text-burgundy/90',
            )}
          >
            {stupa.id}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
