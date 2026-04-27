import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { X, User, HeartHandshake } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import chortenLocations from '../../data/chortenLocations';
import type { MeritPartner, Stupa } from '../../types/stupa';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function makeDivIcon(
  num: number,
  status: Stupa['status'] | 'unknown',
  isSelected: boolean,
  fundingPct = 0,
) {
  const size = 32;
  const fontSize = num >= 100 ? 9 : 11;

  let bg = '#ffffff';
  let textColor = '#3D1022';
  let border = '1px dashed rgba(142,109,78,0.4)';
  let fillHtml = '';
  let lockHtml = '';

  if (status === 'funded') {
    bg = '#3D1022';
    textColor = '#E9D5A1';
    border = '1px solid #3D1022';
  } else if (status === 'partial') {
    bg = '#ffffff';
    textColor = '#3D1022';
    border = '1px solid rgba(61,16,34,0.3)';
    const fillPx = Math.round((fundingPct / 100) * size);
    fillHtml = `<div style="position:absolute;bottom:0;left:0;right:0;height:${fillPx}px;background:rgba(233,213,161,0.6);"></div>`;
  } else {
    lockHtml = `<div style="position:absolute;bottom:3px;right:3px;opacity:0.4;font-size:7px;color:#8E6D4E;">🔒</div>`;
  }

  const ring = isSelected
    ? 'outline:2px solid rgba(61,16,34,0.4);outline-offset:2px;'
    : '';

  return L.divIcon({
    className: '',
    html: `<div style="
      position:relative;overflow:hidden;
      width:${size}px;height:${size}px;
      background:${bg};color:${textColor};
      border:${border};
      display:flex;align-items:center;justify-content:center;
      font-size:${fontSize}px;font-weight:700;
      font-family:'Cinzel',serif;letter-spacing:0.05em;
      cursor:pointer;${ring}
    ">${fillHtml}${lockHtml}<span style="position:relative;z-index:1;">${num}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(chortenLocations.map((c) => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);
  return null;
}

function FocusSelectedChorten({ selectedId }: { selectedId: number | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const selected = chortenLocations.find((c) => c.id === selectedId);
    if (!selected) return;
    map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 17), {
      animate: true,
      duration: 0.6,
    });
  }, [map, selectedId]);

  return null;
}

function ClearSelectionOnMapClick({
  onClear,
}: {
  onClear: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleMapClick = () => onClear();
    map.on('click', handleMapClick);
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, onClear]);

  return null;
}

interface ChortenMapProps {
  stupas: Stupa[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  variant?: 'embedded' | 'fullscreen';
}

const MOCK_DONORS: MeritPartner[] = [
  {
    name: 'Pema & Family',
    location: 'Thimphu, Bhutan',
    dedication: 'For long life, health, and harmony for all beings.',
    type: 'lead',
  },
  {
    name: 'Dorji Trading Group',
    location: 'Gelephu, Bhutan',
    dedication: 'In gratitude to His Majesty and for collective merit.',
    type: 'partner',
  },
  {
    name: 'Tshering Wangmo',
    location: 'Paro, Bhutan',
    dedication: 'Dedicated to parents and teachers.',
    type: 'partner',
  },
  {
    name: 'Kinga Dorji',
    location: 'Samtse, Bhutan',
    dedication: 'May this offering support peace and prosperity.',
    type: 'partner',
  },
];

function getMockDonorsForChorten(chortenId: number): MeritPartner[] {
  return MOCK_DONORS.map((donor, idx) => ({
    ...donor,
    name: `${donor.name} · C${String((chortenId + idx) % 108 || 108).padStart(3, '0')}`,
  }));
}

export default function ChortenMap({
  stupas,
  selectedId,
  onSelect,
  variant = 'embedded',
}: ChortenMapProps) {
  const stupaDataMap = new Map(stupas.map((s) => [s.id, { status: s.status, funding: s.funding_percentage }]));
  const [basemap, setBasemap] = useState<'carto' | 'google-satellite'>('carto');
  const selectedStupa = selectedId ? stupas.find((s) => s.id === selectedId) ?? null : null;
  const donorDetails =
    selectedStupa && selectedStupa.merit_partners.length > 0
      ? selectedStupa.merit_partners
      : selectedId
        ? getMockDonorsForChorten(selectedId)
        : [];

  const polylinePoints = chortenLocations
    .slice()
    .sort((a, b) => a.id - b.id)
    .map((c): [number, number] => [c.lat, c.lng]);

  const isFullscreen = variant === 'fullscreen';

  return (
    <div className={isFullscreen ? 'h-full w-full' : 'p-6 md:p-10'}>
      {!isFullscreen && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-burgundy tracking-tight uppercase">
              Chorten Locations
            </h2>
            <p className="font-body text-bronze mt-1 text-base">
              108 Jangchub Chortens · Mao Chu River · Gelephu Mindfulness City · Click a marker to view details
            </p>
          </div>
          <MapLegend />
        </div>
      )}

      {isFullscreen && (
        <div className="fixed top-[84px] left-4 z-[1100] flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur border border-burgundy/15 shadow-lg px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs uppercase tracking-widest text-burgundy">
                Base map
              </span>
              <div className="flex border border-burgundy/20 p-1 bg-white">
                <button
                  type="button"
                  onClick={() => setBasemap('carto')}
                  className={`px-3 py-1.5 text-xs font-display uppercase tracking-widest transition-colors ${
                    basemap === 'carto'
                      ? 'bg-burgundy text-gold'
                      : 'text-burgundy hover:bg-burgundy/5'
                  }`}
                >
                  CARTO
                </button>
                <button
                  type="button"
                  onClick={() => setBasemap('google-satellite')}
                  className={`px-3 py-1.5 text-xs font-display uppercase tracking-widest transition-colors ${
                    basemap === 'google-satellite'
                      ? 'bg-burgundy text-gold'
                      : 'text-burgundy hover:bg-burgundy/5'
                  }`}
                >
                  Google Satellite
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur border border-burgundy/15 shadow-lg px-3 py-2">
            <MapLegend />
          </div>
        </div>
      )}
      {isFullscreen && selectedId && (
        <aside className="fixed right-4 top-[84px] bottom-4 z-[1100] w-[360px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur border border-burgundy/20 shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-burgundy/10 px-4 py-3">
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-bronze">
                Jangchub Chorten Details
              </p>
              <h3 className="font-display text-lg text-burgundy font-bold">
                JANGCHUB CHORTEN #{selectedId}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="w-8 h-8 border border-burgundy/20 flex items-center justify-center text-burgundy hover:bg-burgundy/5"
            >
              <X size={14} />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-burgundy/10 bg-burgundy/[0.02]">
            <p className="font-display text-xs uppercase tracking-widest text-bronze mb-1">
              Status
            </p>
            <p className="font-body text-burgundy text-sm">
              {selectedStupa?.status?.toUpperCase() ?? 'AVAILABLE'} · Funding{' '}
              {selectedStupa?.funding_percentage ?? 0}%
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <p className="font-display text-xs uppercase tracking-widest text-bronze">
              Donors (Mock)
            </p>
            {donorDetails.map((donor, idx) => (
              <article key={`${donor.name}-${idx}`} className="border border-burgundy/10 p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-burgundy/10 text-burgundy flex items-center justify-center">
                    {donor.type === 'lead' ? (
                      <HeartHandshake size={14} />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <div>
                    <p className="font-display text-xs uppercase tracking-wider text-burgundy">
                      {donor.name}
                    </p>
                    <p className="font-body text-xs text-bronze">{donor.location}</p>
                    <p className="font-body text-sm text-burgundy/80 italic mt-2">
                      "{donor.dedication}"
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      )}

      <div
        className={isFullscreen ? '' : 'border border-burgundy/15'}
        style={isFullscreen ? { height: '100vh' } : { height: 580 }}
      >
        <MapContainer
          center={[26.89343, 90.51547]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <FitBounds />
          <FocusSelectedChorten selectedId={selectedId} />
          <ClearSelectionOnMapClick onClear={() => onSelect(null)} />
          {basemap === 'carto' ? (
            <TileLayer
              key="carto-positron"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              subdomains={['a', 'b', 'c', 'd']}
            />
          ) : (
            <TileLayer
              key="google-satellite"
              attribution="&copy; Google"
              url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            />
          )}

          <Polyline
            positions={polylinePoints}
            pathOptions={
              basemap === 'google-satellite'
                ? { color: '#1f2937', weight: 5, opacity: 0.9 }
                : { color: '#3D1022', weight: 2, opacity: 0.35, dashArray: '6 4' }
            }
          />
          <Polyline
            positions={polylinePoints}
            pathOptions={
              basemap === 'google-satellite'
                ? { color: '#f8fafc', weight: 2.5, opacity: 0.95, dashArray: '8 6' }
                : { color: '#3D1022', weight: 0, opacity: 0 }
            }
          />

          {chortenLocations.map((c) => {
            const data = stupaDataMap.get(c.id);
            const status = data?.status ?? 'unknown';
            const funding = data?.funding ?? 0;
            return (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                icon={makeDivIcon(c.id, status, selectedId === c.id, funding)}
                eventHandlers={{
                  click: () => onSelect(selectedId === c.id ? null : c.id),
                }}
              />
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

function MapLegend() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex-shrink-0 bg-burgundy border border-burgundy" />
        <span className="font-display text-xs text-bronze uppercase tracking-widest">Sponsorship Fulfilled</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex-shrink-0 bg-white border border-burgundy/30 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gold/60" />
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
