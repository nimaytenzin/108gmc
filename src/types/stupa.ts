export interface MeritPartner {
  name: string;
  location: string;
  dedication: string;
  type: 'lead' | 'partner';
}

export interface Stupa {
  id: number;
  status: 'funded' | 'partial' | 'available';
  funding_percentage: number;
  merit_partners: MeritPartner[];
  reserved?: boolean;
}

export interface StupaStats {
  fully_sponsored: number;
  total_funding_percentage: number;
  total_merit_partners: number;
  total: number;
}
