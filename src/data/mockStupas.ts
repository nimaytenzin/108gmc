import type { MeritPartner, Stupa } from '../types/stupa';

const LEAD_NAMES = [
  'Pema Dorji',
  'Sonam Choden',
  'Tshering Wangchuk',
  'Kinzang Dema',
  'Ugyen Tashi',
  'Dechen Zangmo',
];

const LOCATIONS = [
  'Thimphu, Bhutan',
  'Paro, Bhutan',
  'Gelephu, Bhutan',
  'Phuntsholing, Bhutan',
  'Samdrup Jongkhar, Bhutan',
  'Punakha, Bhutan',
];

function buildPartners(id: number, status: Stupa['status']): MeritPartner[] {
  if (status === 'available') {
    return [];
  }

  const lead: MeritPartner = {
    name: `${LEAD_NAMES[id % LEAD_NAMES.length]} Foundation`,
    location: LOCATIONS[id % LOCATIONS.length],
    dedication: 'Dedicated for peace, health, and benefit of all sentient beings.',
    type: 'lead',
  };

  if (status === 'funded') {
    return [
      lead,
      {
        name: `Merit Circle ${((id + 3) % 24) + 1}`,
        location: LOCATIONS[(id + 2) % LOCATIONS.length],
        dedication: 'Offering in gratitude to teachers and parents.',
        type: 'partner',
      },
    ];
  }

  return [lead];
}

export const mockStupas: Stupa[] = Array.from({ length: 108 }, (_, idx) => {
  const id = idx + 1;
  const mod = id % 9;

  let status: Stupa['status'] = 'available';
  let funding = 0;

  if (mod === 0 || mod === 1 || mod === 2) {
    status = 'funded';
    funding = 100;
  } else if (mod === 3 || mod === 4 || mod === 5 || mod === 6) {
    status = 'partial';
    funding = 20 + ((id * 7) % 65);
  }

  return {
    id,
    status,
    funding_percentage: funding,
    merit_partners: buildPartners(id, status),
  };
});
