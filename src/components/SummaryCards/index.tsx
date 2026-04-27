import { CheckCircle2, BarChart3, Users, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Stupa } from '../../types/stupa';

interface SummaryCardsProps {
  stupas: Stupa[];
  loading: boolean;
}

export default function SummaryCards({ stupas, loading }: SummaryCardsProps) {
  const fullySponsored = stupas.filter((s) => s.status === 'funded').length;
  const totalFunding =
    stupas.length > 0
      ? Math.round(
          stupas.reduce((acc, s) => acc + s.funding_percentage, 0) /
            stupas.length,
        )
      : 0;
  const totalPartners = stupas.reduce(
    (acc, s) => acc + (s.merit_partners?.length || 0),
    0,
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-burgundy/15 p-6 animate-pulse h-28 bg-burgundy/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon={CheckCircle2} label="Units Fully Sponsored" value={`${fullySponsored} / 108`} delay={0} />
      <StatCard icon={BarChart3} label="Total Funding Progress" value={`${totalFunding}%`} progress={totalFunding} delay={0.05} />
      <StatCard icon={Users} label="Total Merit Partners" value={totalPartners.toLocaleString()} delay={0.1} />
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  progress?: number;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, progress, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="border border-burgundy/15 p-6 hover:border-burgundy/30 transition-all duration-108 bg-white"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} strokeWidth={1.5} className="text-bronze" />
        <span className="font-display text-xs uppercase tracking-widest text-bronze">
          {label}
        </span>
      </div>
      <div className="font-display text-3xl font-bold tracking-tight text-burgundy mb-3">
        {value}
      </div>
      {progress !== undefined && (
        <div className="w-full bg-burgundy/10 h-px overflow-hidden">
          <motion.div
            className="h-px bg-burgundy"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      )}
    </motion.div>
  );
}
