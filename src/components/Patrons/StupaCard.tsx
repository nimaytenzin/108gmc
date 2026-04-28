import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import stupaImg from '../../../assets/stupa.png';
import stupaFulfilledImg from '../../../assets/stupa_fulfilled.png';
import stupaPartialImg from '../../../assets/stupa_partial.png';
import type { Stupa } from '../../types/stupa';

interface StupaCardProps {
  stupa: Stupa;
  isSelected: boolean;
  onClick: (id: number) => void;
}

export default function StupaCard({ stupa, isSelected, onClick }: StupaCardProps) {
  const leadSponsor = stupa.merit_partners?.find((p) => p.type === 'lead');
  const img = stupa.status === 'funded' ? stupaFulfilledImg : stupa.status === 'partial' ? stupaPartialImg : stupaImg;

  return (
    <div
      onClick={() => onClick(stupa.id)}
      title={leadSponsor ? leadSponsor.name : stupa.status === 'funded' ? 'Sponsorship Fulfilled' : 'Awaiting a Sponsor'}
      className="group relative cursor-pointer select-none px-1"
    >
      {/* Hover tooltip */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-burgundy text-gold text-xs px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-108 pointer-events-none z-20 border border-gold/20 font-display uppercase tracking-widest">
        {leadSponsor ? leadSponsor.name : stupa.status === 'funded' ? 'Sponsorship Fulfilled' : 'Awaiting a Sponsor'}
      </div>

      {/* Chorten marker */}
      <motion.div
        animate={{ y: isSelected ? -8 : 0, scale: isSelected ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative flex flex-col items-center"
      >
        <div className={cn('relative w-14 h-20 mx-auto overflow-hidden', isSelected ? 'ring-2 ring-burgundy/50 ring-offset-1' : '')}>
          <img
            src={img}
            alt={`Jangchub Chorten ${stupa.id}`}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        {/* Number below image so thick lines don't obscure it */}
        <span
          className={cn(
            'font-display font-bold leading-none mt-0.5',
            stupa.id >= 100 ? 'text-[9px]' : 'text-[10px]',
            stupa.status === 'funded' ? 'text-burgundy' : 'text-bronze',
          )}
        >
          {stupa.id}
        </span>
      </motion.div>
    </div>
  );
}
