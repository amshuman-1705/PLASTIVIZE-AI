import React, { useState, useCallback, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { getPlasticGeoAnalysis, geocodeLocation } from '../services/geminiService';
import type { GeoAnalysisResult, MapPoint, City } from '../types';
import { MapPinIcon, MagnifyingGlassIcon, CloseIcon } from './icons/FeatureIcons';
import { LoadingSpinner } from './common/LoadingSpinner';
import { majorCities } from './data/cities';
import { BackIcon } from './icons/BackIcon';

const PALETTES = [
    ['#2dd4bf', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'],
    ['#84cc16', '#14b8a6', '#0ea5e9', '#d946ef', '#f97316', '#6366f1'],
    ['#f43f5e', '#eab308', '#22c55e', '#06b6d4', '#a855f7', '#65a30d'],
];

const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const GlobePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [analysisResult, setAnalysisResult] = useState<GeoAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const globeEl = useRef<any>(null);

  const [globeDimensions, setGlobeDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [chartColors, setChartColors] = useState<string[]>(PALETTES[0]);
  
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setGlobeDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isGlobeReady && globeEl.current) {
      globeEl.current.pointOfView({ altitude: 3.5 }, 0);
    }
  }, [isGlobeReady]);
  
  const openPanel = () => {
    setIsPanelOpen(true);
    setIsLoading(true);
    setError(null);
    setMapPoints([]);
    setAnalysisResult(null);
    // Set new colors for the upcoming analysis
    const newPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    setChartColors(shuffleArray([...newPalette]));
  };

  const startLocationAnalysis = useCallback(async (lat: number, lng: number, locationName?: string) => {
    if (isLoading) return;

    if (globeEl.current) {
      globeEl.current.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
    }
    
    openPanel();

    try {
      const result = await getPlasticGeoAnalysis(lat, lng, locationName);
      if (result) {
        setAnalysisResult(result);
        setMapPoints([{ lat, lng, name: result.locationName, kind: 'analysis_point' }]);
      } else {
        throw new Error("Received no result from analysis service.");
      }
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the location. The AI model may be unavailable or the request was blocked.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleGlobeClick = useCallback(({ lat, lng }: { lat: number, lng: number }) => {
    startLocationAnalysis(lat, lng);
  }, [startLocationAnalysis]);
  
  const handleCityClick = useCallback((city: City) => {
    startLocationAnalysis(city.lat, city.lng, `${city.name}, ${city.country}`);
  }, [startLocationAnalysis]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
        const { lat, lng, foundLocationName } = await geocodeLocation(searchQuery);
        startLocationAnalysis(lat, lng, foundLocationName);
    } catch (err) {
        console.error("Geocoding error:", err);
        setSearchError("Could not find that location. Please try a different name.");
    } finally {
        setIsSearching(false);
    }
  };
  
  const closePanel = () => {
      setIsPanelOpen(false);
      setSearchQuery('');
      setSearchError(null);
      setMapPoints([]);
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">
      {globeDimensions.width > 0 && (
          <Globe
            ref={globeEl}
            width={globeDimensions.width}
            height={globeDimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            onGlobeClick={handleGlobeClick}
            atmosphereColor="lightblue"
            atmosphereAltitude={0.25}
            onGlobeReady={() => setIsGlobeReady(true)}
            
            pointsData={mapPoints}
            pointLat="lat"
            pointLng="lng"
            pointLabel="name"
            pointAltitude={0.01}
            pointRadius={0.25}
            pointColor={() => 'rgba(0, 255, 255, 0.8)'}
            pointsTransitionDuration={1000}
            
            labelsData={majorCities}
            labelLat="lat"
            labelLng="lng"
            labelText="name"
            labelSize={0.45}
            labelDotRadius={0.2}
            labelColor={() => 'rgba(255, 255, 255, 0.85)'}
            labelResolution={2}
            onLabelClick={(label: object) => handleCityClick(label as City)}
          />
      )}

      {/* Header: Back Button and Search Bar */}
      <div className={`absolute top-4 left-4 right-4 flex items-center gap-2 sm:gap-4 transition-opacity duration-500 z-20 ${isPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button onClick={onBack} className="bg-white/80 backdrop-blur-md flex-shrink-0 p-3 rounded-full shadow-lg hover:bg-white transition-colors" aria-label="Go back">
            <BackIcon />
        </button>

        <div className="flex-grow min-w-0">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a location..."
              className="w-full pl-4 pr-12 py-3 bg-white/80 backdrop-blur-md border border-slate-300/50 rounded-full shadow-lg placeholder-slate-500 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green"
              disabled={isSearching}
            />
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-brand-green text-white rounded-full hover:bg-brand-green-dark disabled:bg-slate-400 transition-colors"
              aria-label="Search location"
            >
              {isSearching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <MagnifyingGlassIcon className="w-5 h-5" />}
            </button>
          </form>
          {searchError && <p className="text-center text-sm text-red-400 mt-2 bg-black/50 p-2 rounded-md">{searchError}</p>}
        </div>
      </div>

      {/* Analysis Panel */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-lg bg-slate-50/95 backdrop-blur-md shadow-2xl transition-transform duration-500 ease-in-out transform z-30 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0 p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 truncate pr-2">
                    {analysisResult?.locationName || 'Analysis'}
                </h2>
                <button onClick={closePanel} className="p-2 rounded-full hover:bg-slate-200 flex-shrink-0">
                    <CloseIcon className="w-6 h-6 text-slate-600" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 sm:p-6">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <LoadingSpinner />
                        <p className="mt-4 text-slate-600 font-semibold">Generating Real-Time Data...</p>
                        <p className="mt-1 text-sm text-slate-500">Our AI is crunching the numbers for this location.</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 m-4" role="alert">
                        <p className="font-bold">Analysis Error</p>
                        <p>{error}</p>
                    </div>
                )}
                {analysisResult && !isLoading && (
                   <div className="space-y-8 animate-view-fade-in">
                        <div className="p-4 bg-white/60 rounded-xl shadow-sm">
                          <p className="text-sm text-brand-text-light">{analysisResult.summary}</p>
                          <p className="mt-2 text-xs text-brand-text-light italic border-l-2 border-brand-green pl-2">
                              <strong>AI Rationale:</strong> {analysisResult.dataRationale}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 text-center">
                            {analysisResult.keyStats.map((stat, index) => (
                                <div key={index} className="p-3 bg-white/60 rounded-xl shadow-sm">
                                    <p style={{color: chartColors[index]}} className="font-bold text-xl">{stat.value}</p>
                                    <p className="text-xs text-brand-text-light mt-1">{stat.stat}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-white/60 rounded-xl shadow-sm">
                            <h3 className="font-semibold text-brand-text mb-2 text-center">Plastic Waste Composition (%)</h3>
                            <div className="w-full h-64">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={analysisResult.wasteComposition} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                            {analysisResult.wasteComposition.map((entry, index) => <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} className="focus:outline-none" />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="p-4 bg-white/60 rounded-xl shadow-sm">
                            <h3 className="font-semibold text-brand-text mb-2 text-center">Waste Management Methods (%)</h3>
                            <div className="w-full h-64">
                                <ResponsiveContainer>
                                    <BarChart data={analysisResult.wasteManagement} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                        <YAxis unit="%" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                        <Tooltip cursor={{fill: 'rgba(20, 184, 166, 0.1)'}} />
                                        <Bar dataKey="value" name="Percentage" radius={[4, 4, 0, 0]}>
                                            {analysisResult.wasteManagement.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="p-4 bg-white/60 rounded-xl shadow-sm">
                            <h3 className="font-semibold text-brand-text mb-2 text-center">Waste Generation Trend (Million Tons)</h3>
                            <div className="w-full h-64">
                                <ResponsiveContainer>
                                    <LineChart data={analysisResult.generationTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="waste_in_million_tons" name="Waste (M Tons)" stroke={chartColors[1]} strokeWidth={2} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Instruction Box */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up transition-opacity duration-500 z-10 ${isPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="bg-white/80 backdrop-blur-md py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-brand-green"/>
              <p className="text-sm text-slate-700 font-medium">Click on the globe or a city to begin analysis.</p>
          </div>
      </div>
    </div>
  );
};

export default GlobePage;