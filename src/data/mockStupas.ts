import type { Stupa } from '../types/stupa';

export const mockStupas: Stupa[] = Array.from({ length: 108 }, (_, idx) => {
  const id = idx + 1;

  if (id === 108) {
    return {
      id,
      status: 'funded',
      funding_percentage: 100,
      merit_partners: [],
    };
  }

  return {
    id,
    status: 'available',
    funding_percentage: 0,
    merit_partners: [],
  };
});
