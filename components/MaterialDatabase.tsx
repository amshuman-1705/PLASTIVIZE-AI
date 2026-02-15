import React, { useState, useEffect } from 'react';
import ViewHeader from './common/ViewHeader';
import Card from './common/Card';
import { getSustainableAlternatives } from '../services/geminiService';
import type { MaterialDatabaseItem } from '../types';
import { RecycleIcon, CarbonIcon, LeafIcon, LightbulbIcon, SourceIcon, ProductionIcon, UseIcon, EndOfLifeIcon } from './icons/FeatureIcons';
import SkeletonLoader from './common/SkeletonLoader';

const plasticTypes = [
    { code: 'PET', name: 'Polyethylene Terephthalate', icon: '🍾' },
    { code: 'HDPE', name: 'High-Density Polyethylene', icon: '🧴' },
    { code: 'LDPE', name: 'Low-Density Polyethylene', icon: '🛍️' },
    { code: 'PP', name: 'Polypropylene', icon: '🥡' },
    { code: 'PS', name: 'Polystyrene', icon: '☕' },
];

const PlasticTypeCard: React.FC<{ type: typeof plasticTypes[0], isSelected: boolean, onSelect: () => void }> = ({ type, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`p-3 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 ${isSelected ? 'border-brand-green bg-brand-green-light scale-105 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
        <div className="text-3xl">{type.icon}</div>
        <p className="font-bold mt-2 text-brand-text text-sm sm:text-base">{type.code}</p>
    </div>
);

const AlternativesSkeleton: React.FC = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <SkeletonLoader className="h-6 w-1/2 mb-2" />
                <SkeletonLoader className="h-4 w-full" />
             </Card>
        ))}
    </div>
);

const LifecycleStage: React.FC<{ icon: React.ReactNode; label: string; isLast?: boolean }> = ({ icon, label, isLast }) => (
    <div className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
        <div className="flex flex-col items-center w-20">
            <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-green">{icon}</div>
            <p className="text-xs font-semibold mt-2 text-center text-brand-text-light">{label}</p>
        </div>
        {!isLast && <div className="flex-grow h-0.5 bg-gray-300 mx-1"></div>}
    </div>
);

const LifecycleVisual: React.FC = () => (
    <div>
        <div className="flex justify-center items-start">
            <LifecycleStage icon={<SourceIcon />} label="Raw Material" />
            <LifecycleStage icon={<ProductionIcon />} label="Production" />
            <LifecycleStage icon={<UseIcon />} label="Product Use" />
            <LifecycleStage icon={<EndOfLifeIcon />} label="End of Life" isLast />
        </div>
    </div>
);

const AlternativeItem: React.FC<{ material: MaterialDatabaseItem; isExpanded: boolean; onToggle: () => void; }> = ({ material, isExpanded, onToggle }) => (
    <Card className="!p-0 overflow-hidden">
        <button
            onClick={onToggle}
            className="w-full text-left p-4 hover:bg-brand-gray transition-colors flex justify-between items-center"
            aria-expanded={isExpanded}
        >
            <div>
                <h3 className="font-bold text-brand-text">{material.name}</h3>
                <p className="text-sm text-brand-text-light">{material.description}</p>
            </div>
            <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
        >
            <div className="overflow-hidden">
                <div className="p-4 border-t border-gray-200 space-y-6">
                     <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-3">
                        <LightbulbIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/>
                        <div>
                            <h4 className="font-semibold text-blue-800">Why it's a good alternative:</h4>
                            <p className="text-sm text-blue-700">{material.suitability}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold text-brand-text mb-3">Key Specifications</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {material.specs.map(spec => (
                                <div key={spec.property} className="bg-brand-gray p-3 rounded-lg">
                                    <p className="text-sm font-semibold text-brand-text">{spec.property}</p>
                                    <p className="text-sm text-brand-text-light">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-md font-semibold text-brand-text mb-4">Lifecycle Analysis</h4>
                        <div className="p-4 bg-brand-gray rounded-lg mb-4">
                            <LifecycleVisual />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3"><LeafIcon className="w-5 h-5 flex-shrink-0 mt-1 text-brand-green" /><p className="text-sm"><strong className="text-brand-text">Biodegradability:</strong> {material.lifecycle.biodegradability}</p></div>
                            <div className="flex items-start gap-3"><CarbonIcon className="w-5 h-5 flex-shrink-0 mt-1 text-brand-green" /><p className="text-sm"><strong className="text-brand-text">Carbon Footprint:</strong> {material.lifecycle.carbonFootprint}</p></div>
                            <div className="flex items-start gap-3"><RecycleIcon className="w-5 h-5 flex-shrink-0 mt-1 text-brand-green" /><p className="text-sm"><strong className="text-brand-text">Recycling Info:</strong> {material.lifecycle.recyclingInfo}</p></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold text-brand-text mb-3">Example Suppliers</h4>
                        <div className="flex flex-wrap gap-2">
                            {material.suppliers.map(supplier => (
                                <span key={supplier} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">{supplier}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

const MaterialDatabase: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedPlastic, setSelectedPlastic] = useState<string | null>(null);
    const [alternatives, setAlternatives] = useState<MaterialDatabaseItem[]>([]);
    const [expandedAlternativeId, setExpandedAlternativeId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePlasticSelect = (code: string) => {
        if (code === selectedPlastic) return;

        setSelectedPlastic(code);
        setIsLoading(true);
        setError(null);
        setAlternatives([]);
        setExpandedAlternativeId(null);
    };

    useEffect(() => {
        if (!isLoading || !selectedPlastic) return;

        const fetchAlternatives = async () => {
            try {
                const fetchedAlternatives = await getSustainableAlternatives(selectedPlastic);
                if (fetchedAlternatives && fetchedAlternatives.length > 0) {
                    setAlternatives(fetchedAlternatives);
                } else {
                    setError(`Could not find alternatives for ${selectedPlastic}. The AI service may be temporarily unavailable.`);
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlternatives();
    }, [selectedPlastic, isLoading]);

    const handleToggle = (id: string) => {
        setExpandedAlternativeId(prevId => prevId === id ? null : id);
    }
    
    return (
        <div>
            <ViewHeader title="Sustainable Material Database" onBack={onBack} />
            <div className="max-w-3xl mx-auto">
                <Card>
                    <h2 className="text-lg font-bold text-brand-text mb-2 text-center">Find Sustainable Alternatives</h2>
                    <p className="text-sm text-brand-text-light mb-4 text-center">Select a common plastic type to discover innovative, eco-friendly materials that can replace it.</p>
                     <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {plasticTypes.map(type => (
                            <PlasticTypeCard 
                                key={type.code}
                                type={type}
                                isSelected={selectedPlastic === type.code}
                                onSelect={() => handlePlasticSelect(type.code)}
                            />
                        ))}
                    </div>
                </Card>

                <div className="mt-8">
                    {!selectedPlastic && (
                        <div className="text-center py-10">
                            <p className="text-brand-text-light">Select a plastic type above to get started.</p>
                        </div>
                    )}

                    {selectedPlastic && (
                        <div className="animate-fade-in-up">
                            <h2 className="text-xl font-bold text-brand-text mb-4">Alternatives for {selectedPlastic}</h2>
                            
                            <div className="mt-4">
                                {isLoading && <AlternativesSkeleton />}

                                {error && !isLoading && (
                                    <p className="text-red-500 text-center font-medium p-4 bg-red-50 rounded-lg">{error}</p>
                                )}

                                {!isLoading && alternatives.length > 0 && (
                                    <div className="space-y-4">
                                        {alternatives.map(material => (
                                            <AlternativeItem
                                                key={material.id}
                                                material={material}
                                                isExpanded={expandedAlternativeId === material.id}
                                                onToggle={() => handleToggle(material.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaterialDatabase;