import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { X, User, HeartHandshake, Lock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import chortenLocations from '../../data/chortenLocations';
import type { Stupa } from '../../types/stupa';
import stupaImgUrl from '../../../assets/stupa.png';
import stupaFulfilledImgUrl from '../../../assets/light_stupa_filled.png';
import stupaPartialImgUrl from '../../../assets/stupa_partial.png';

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
) {
  const w = 30;
  const imgH = 42;
  const numH = 13;
  const totalH = imgH + numH;

  const img = status === 'funded'
    ? stupaFulfilledImgUrl
    : status === 'partial'
      ? stupaPartialImgUrl
      : stupaImgUrl;

  const border = status === 'funded'
    ? '1.5px solid #3D1022'
    : status === 'partial'
      ? '1.5px solid rgba(61,16,34,0.3)'
      : '1.5px dashed rgba(142,109,78,0.5)';

  const ring = isSelected
    ? 'outline:2.5px solid #3D1022;outline-offset:2px;'
    : '';

  const numColor = status === 'funded' ? '#3D1022' : '#8E6D4E';
  const fontSize = num >= 100 ? 7 : 9;

  return L.divIcon({
    className: '',
    html: `<div style="display:flex;flex-direction:column;align-items:center;width:${w}px;">
      <div style="
        width:${w}px;height:${imgH}px;
        border:${border};
        background:#ffffff;
        overflow:hidden;
        cursor:pointer;
        ${ring}
      ">
        <img src="${img}" style="width:100%;height:100%;object-fit:contain;display:block;" draggable="false" />
      </div>
      <div style="
        text-align:center;
        padding:1px 0 0;
        font-family:'Cinzel',serif;font-size:${fontSize}px;font-weight:700;
        color:${numColor};letter-spacing:0.04em;line-height:1;
      ">${num}</div>
    </div>`,
    iconSize: [w, totalH],
    iconAnchor: [w / 2, totalH / 2],
    popupAnchor: [0, -(totalH / 2 + 4)],
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

const STATUS_LABEL: Record<string, string> = {
  funded: 'Sponsorship Fulfilled',
  partial: 'Open for Merit',
  available: 'Awaiting a Sponsor',
};

export default function ChortenMap({
  stupas,
  selectedId,
  onSelect,
  variant = 'embedded',
}: ChortenMapProps) {
  const stupaDataMap = new Map(stupas.map((s) => [s.id, { status: s.status, funding: s.funding_percentage }]));
  const [basemap, setBasemap] = useState<'carto' | 'google-satellite'>('carto');
  const selectedStupa = selectedId ? stupas.find((s) => s.id === selectedId) ?? null : null;
  const partners = selectedStupa?.merit_partners ?? [];

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
              108 Jangchub Chortens · Mau Chu River · Gelephu Mindfulness City · Click a marker to view details
            </p>
          </div>
          <MapLegend />
        </div>
      )}

      {isFullscreen && (
        <div className="fixed top-[68px] md:top-[84px] left-2 md:left-4 z-[1100] flex flex-col gap-2">
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
      <AnimatePresence>
        {isFullscreen && selectedId && (
          <>
            {/* Backdrop — mobile only */}
            <motion.div
              key="map-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[1050] md:hidden"
              onClick={() => onSelect(null)}
            />

            {/* Panel — bottom sheet on mobile, right sidebar on md+ */}
            <motion.aside
              key="map-panel"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-[1100] max-h-[70vh] md:bottom-4 md:left-auto md:right-4 md:top-[84px] md:max-h-none md:w-[360px] bg-white/95 backdrop-blur border-t border-burgundy/20 md:border md:border-burgundy/20 shadow-2xl flex flex-col"
            >
              {/* Drag handle — mobile only */}
              <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0 md:hidden">
                <div className="w-10 h-1 bg-burgundy/20" />
              </div>

              <div className="flex items-center justify-between border-b border-burgundy/10 px-4 py-3 flex-shrink-0">
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

              <div className="px-4 py-3 border-b border-burgundy/10 bg-burgundy/[0.02] flex-shrink-0">
                <p className="font-display text-xs uppercase tracking-widest text-bronze mb-1">
                  Status
                </p>
                <p className="font-display text-sm text-burgundy font-bold uppercase tracking-wide">
                  {STATUS_LABEL[selectedStupa?.status ?? 'available']}
                </p>
                {selectedStupa && selectedStupa.status !== 'available' && (
                  <p className="font-body text-xs text-bronze mt-0.5">
                    {selectedStupa.funding_percentage}% funded
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {selectedStupa?.status === 'available' ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                    <div className="w-12 h-12 border border-dashed border-bronze/30 flex items-center justify-center mb-4">
                      <HeartHandshake size={20} className="text-bronze/40" strokeWidth={1} />
                    </div>
                    <p className="font-display text-sm text-burgundy uppercase tracking-wide mb-1">
                      Awaiting a Patron
                    </p>
                    <p className="font-body text-sm text-bronze italic leading-relaxed mb-5">
                      This Jangchub Chorten has no sponsor yet. Be the first to dedicate it and anchor your name along the Mau Chu River.
                    </p>
                    <Link
                      to="/sponsor"
                      className="w-full bg-burgundy text-gold font-display text-xs tracking-widest uppercase py-3 text-center hover:bg-burgundy/90 transition-colors block"
                    >
                      Sponsor this Jangchub Chorten
                    </Link>
                  </div>
                ) : selectedStupa?.reserved ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                    <div className="w-12 h-12 border border-burgundy/20 flex items-center justify-center mb-4">
                      <Lock size={18} className="text-burgundy/40" strokeWidth={1} />
                    </div>
                    <p className="font-display text-sm text-burgundy uppercase tracking-wide mb-1">
                      Reserved
                    </p>
                    <p className="font-body text-sm text-bronze italic leading-relaxed">
                      This Jangchub Chorten has been reserved.
                    </p>
                  </div>
                ) : partners.length === 0 ? (
                  <p className="font-body text-sm italic text-bronze px-1 pt-2">
                    No partners recorded yet.
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                    <div className="w-12 h-12 border border-burgundy/20 flex items-center justify-center mb-4">
                      <HeartHandshake size={20} className="text-burgundy/40" strokeWidth={1} />
                    </div>
                    <p className="font-display text-sm text-burgundy uppercase tracking-wide mb-1">
                      Sponsorship Fulfilled
                    </p>
                    <p className="font-body text-sm text-bronze italic leading-relaxed">
                      This Jangchub Chorten has been sponsored by
                    </p>
                    {partners.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {partners.map((p, idx) => (
                          <p key={idx} className="font-display text-base font-bold text-burgundy uppercase tracking-wide">
                            {p.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

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
                icon={makeDivIcon(c.id, status, selectedId === c.id)}
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
