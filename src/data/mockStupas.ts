import type { Stupa } from '../types/stupa';

const patronMap: Record<number, Pick<Stupa, 'status' | 'funding_percentage' | 'merit_partners'>> = {
  1: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'His Majesty The King of Bhutan', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  3: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Tobgyal Dorji', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  7: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Her Majesty The Queen of Bhutan', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  8: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Her Majesty The Queen of Bhutan', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  9: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Ugyen Tshechup', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  11: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Her Majesty The Queen of Bhutan', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  15: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Thai Delegation', location: 'Thailand', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  16: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Thai Delegation', location: 'Thailand', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  17: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Thai Delegation', location: 'Thailand', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  22: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Khenpo Karma Namgyal', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  33: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Korean Team', location: 'Korea', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  46: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Doctors', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  55: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Korean Team', location: 'Korea', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  60: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Leytsho Lopen', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  77: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Wangchuk Dorji', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  88: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'Korean Team', location: 'Korea', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
  108: {
    status: 'funded',
    funding_percentage: 100,
    merit_partners: [{ name: 'His Majesty The King of Bhutan', location: 'Bhutan', dedication: 'For the benefit of all sentient beings', type: 'lead' }],
  },
};

export const mockStupas: Stupa[] = Array.from({ length: 108 }, (_, idx) => {
  const id = idx + 1;
  const patron = patronMap[id];

  if (patron) {
    return { id, ...patron };
  }

  return {
    id,
    status: 'available',
    funding_percentage: 0,
    merit_partners: [],
  };
});
