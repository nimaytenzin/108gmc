import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SummaryCards from './components/SummaryCards';
import ProcessionMap from './components/ProcessionMap';
import ChortenMap from './components/ChortenMap';
import Footer from './components/Footer';
import { mockStupas } from './data/mockStupas';

export default function App() {
  const [selectedStupaId, setSelectedStupaId] = useState<number | null>(null);
  const stupas = mockStupas;
  const loading = false;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <main className="pt-20">
              <HeroSection />

              <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 space-y-6">
                <SummaryCards stupas={stupas} loading={loading} />

                <section className="bg-white border border-burgundy/10 overflow-hidden">
                  <ProcessionMap
                    stupas={stupas}
                    loading={loading}
                    selectedId={selectedStupaId}
                    onSelect={setSelectedStupaId}
                  />
                </section>
              </div>

              <Footer />
            </main>
          }
        />

        <Route
          path="/procession"
          element={
            <main className="pt-20">
              <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
                <section className="bg-white border border-burgundy/10 overflow-hidden">
                  <ProcessionMap
                    stupas={stupas}
                    loading={loading}
                    selectedId={selectedStupaId}
                    onSelect={setSelectedStupaId}
                  />
                </section>
              </div>
            </main>
          }
        />

        <Route
          path="/map"
          element={
            <main className="h-screen w-screen overflow-hidden bg-white">
              {/* Fullscreen map view: no padding/margins */}
              <ChortenMap
                variant="fullscreen"
                stupas={stupas}
                selectedId={selectedStupaId}
                onSelect={setSelectedStupaId}
              />
            </main>
          }
        />
      </Routes>
    </div>
  );
}
