import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import StupaCard from './StupaCard';
import type { Stupa } from '../../types/stupa';

interface PatronsProps {
  stupas: Stupa[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function Patrons({
  stupas,
  loading,
  selectedId,
  onSelect,
}: PatronsProps) {
  const selectedStupa = selectedId
    ? stupas.find((stupa) => stupa.id === selectedId) ?? null
    : null;

  const handleSelect = useCallback(
    (id: number) => {
      onSelect(selectedId === id ? null : id);
    },
    [selectedId, onSelect],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-display text-bronze text-sm uppercase tracking-widest animate-pulse">
          Loading the Mau Chu Procession…
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-burgundy tracking-tight uppercase">
            The 108 Landmarks of Merit
          </h2>
          <p className="font-body text-bronze mt-1 text-base">
            108 Jangchub Chortens · 108m apart · 12km total · Select a unit to view sponsors
          </p>
        </div>
        <Legend />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        {/* Full 108-grid view */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-2 md:gap-3">
          {stupas.map((stupa) => (
            <div key={stupa.id} className="flex justify-center">
              <StupaCard
                stupa={stupa}
                isSelected={selectedId === stupa.id}
                onClick={handleSelect}
              />
            </div>
          ))}
        </div>

        {/* Desktop aside — hidden on mobile, shown lg+ in grid */}
        <aside className="hidden lg:flex flex-col border border-burgundy/15 bg-white">
          <AsideContent selectedStupa={selectedStupa} onClose={() => onSelect(null)} />
        </aside>
      </div>

      {/* Mobile bottom sheet — lg and below only */}
      <AnimatePresence>
        {selectedStupa && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => onSelect(null)}
            />
            {/* Sheet */}
            <motion.aside
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-burgundy/20 shadow-2xl lg:hidden max-h-[70vh] flex flex-col"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
                <div className="w-10 h-1 bg-burgundy/20" />
              </div>
              <AsideContent selectedStupa={selectedStupa} onClose={() => onSelect(null)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function AsideContent({
  selectedStupa,
  onClose,
}: {
  selectedStupa: Stupa | null;
  onClose: () => void;
}) {
  if (!selectedStupa) {
    return (
      <div className="p-8 text-center text-bronze">
        <div className="w-12 h-12 border border-burgundy/20 flex items-center justify-center mx-auto mb-4">
          <MapPin size={20} className="text-bronze/50" strokeWidth={1} />
        </div>
        <p className="font-display uppercase tracking-widest text-xs mb-2 text-burgundy">
          Side Panel
        </p>
        <p className="font-body text-sm italic">
          Click a Jangchub Chorten to open details here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-burgundy/10 flex-shrink-0">
        <div>
          <p className="font-display text-xs uppercase tracking-widest text-bronze">
            Jangchub Chorten Details
          </p>
          <h3 className="font-display text-lg font-bold text-burgundy">
            JANGCHUB CHORTEN #{selectedStupa.id}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 border border-burgundy/20 flex items-center justify-center text-burgundy hover:bg-burgundy/5"
        >
          <X size={14} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-4 flex flex-col items-center justify-center text-center py-8">
        {selectedStupa.status === 'funded' ? (
          <>
            <div className="w-10 h-10 border border-burgundy/20 flex items-center justify-center mb-3">
              <User size={16} className="text-burgundy/40" strokeWidth={1} />
            </div>
            <p className="font-display text-xs uppercase tracking-widest text-burgundy mb-1">
              Sponsorship Fulfilled
            </p>
            <p className="font-body text-sm italic text-bronze">
              This Jangchub Chorten has been sponsored.
            </p>
          </>
        ) : (
          <>
            <p className="font-body text-sm italic text-bronze mb-5">
              This Jangchub Chorten awaits a patron. Be the first to dedicate it.
            </p>
            <Link
              to="/sponsor"
              className="w-full bg-burgundy text-gold font-display text-xs tracking-widest uppercase py-3 text-center hover:bg-burgundy/90 transition-colors block"
            >
              Sponsor this Jangchub Chorten
            </Link>
          </>
        )}
      </div>
    </>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-4 items-center border border-burgundy/15 px-4 py-2.5 flex-shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex-shrink-0 bg-burgundy border border-burgundy" />
        <span className="font-display text-xs text-bronze uppercase tracking-widest">Sponsorship Fulfilled</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex-shrink-0 bg-white border border-burgundy/30 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-burgundy/60" />
        </div>
        <span className="font-display text-xs text-bronze uppercase tracking-widest">Open for Merit</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex-shrink-0 bg-white border border-dashed border-bronze/40" />
        <span className="font-display text-xs text-bronze uppercase tracking-widest">Awaiting a Sponsor</span>
      </div>
    </div>
  );
}
