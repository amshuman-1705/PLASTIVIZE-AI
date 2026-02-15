
import React, { useState } from 'react';
import ViewHeader from './common/ViewHeader';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';
import { getRecyclingRules, getFunFact } from '../services/geminiService';
import type { RecyclingRules } from '../types';
import { RecycleIcon, CloseIcon, FunFactIcon, InstructionsIcon, NotesIcon } from './icons/FeatureIcons';

const plasticTypes = [
    { code: 'PET', name: 'Polyethylene Terephthalate', icon: '🍾' },
    { code: 'HDPE', name: 'High-Density Polyethylene', icon: '🧴' },
    { code: 'PVC', name: 'Polyvinyl Chloride', icon: '💳' },
    { code: 'LDPE', name: 'Low-Density Polyethylene', icon: '🛍️' },
    { code: 'PP', name: 'Polypropylene', icon: '🥡' },
    { code: 'PS', name: 'Polystyrene', icon: '☕' },
    { code: 'Other', name: 'Miscellaneous Plastics', icon: '❓' },
];

const PlasticTypeCard: React.FC<{ type: typeof plasticTypes[0], isSelected: boolean, onSelect: () => void }> = ({ type, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`p-3 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 ${isSelected ? 'border-brand-green bg-brand-green-light scale-105 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
        <div className="text-3xl">{type.icon}</div>
        <p className="font-bold mt-2 text-brand-text text-sm sm:text-base">{type.code}</p>
        <p className="text-xs text-brand-text-light mt-1 hidden sm:block">{type.name}</p>
    </div>
);

const RulesDisplay: React.FC<{ rules: RecyclingRules, funFact: string | null }> = ({ rules, funFact }) => {
    const isRecyclable = rules.isRecyclable;
    return (
        <Card>
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-4 ${isRecyclable ? 'bg-green-100' : 'bg-red-100'}`}>
                {isRecyclable ? <RecycleIcon className="w-8 h-8 text-green-600 flex-shrink-0" /> : <CloseIcon className="w-8 h-8 text-red-600 flex-shrink-0" />}
                <div>
                    <h3 className={`text-lg font-bold ${isRecyclable ? 'text-green-800' : 'text-red-800'}`}>
                        {rules.plasticType} is {isRecyclable ? 'Recyclable' : 'Generally Not Recyclable'} in {rules.location}
                    </h3>
                    <p className={`text-sm ${isRecyclable ? 'text-green-700' : 'text-red-700'}`}>Based on local guidelines.</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <InstructionsIcon className="w-5 h-5 text-brand-green"/>
                        <h4 className="font-semibold text-brand-text">Instructions:</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-brand-text-light pl-4">
                        {rules.instructions.map((inst, index) => (
                            <li key={index}>{inst}</li>
                        ))}
                    </ul>
                </div>

                {rules.notes && rules.notes.length > 0 && (
                     <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <NotesIcon className="w-5 h-5 text-brand-accent"/>
                            <h4 className="font-semibold text-brand-text">Important Notes:</h4>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-brand-text-light pl-4">
                            {rules.notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {funFact && (
                     <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <FunFactIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/>
                            <p className="text-sm text-blue-800">{funFact}</p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}

interface RecyclingGuideProps {
  onBack: () => void;
}

const RecyclingGuide: React.FC<RecyclingGuideProps> = ({ onBack }) => {
  const [plasticType, setPlasticType] = useState(plasticTypes[0].code);
  const [location, setLocation] = useState('');
  const [rules, setRules] = useState<RecyclingRules | null>(null);
  const [funFact, setFunFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
        setError("Please enter a location.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setRules(null);
    setFunFact(null);

    const [rulesResult, factResult] = await Promise.all([
        getRecyclingRules(plasticType, location),
        getFunFact(plasticType)
    ]);

    if (rulesResult) {
        setRules(rulesResult);
        setFunFact(factResult);
    } else {
        setError("Could not fetch recycling rules for this location. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ViewHeader title="Interactive Recycling Guide" onBack={onBack} />
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
            <h2 className="text-lg font-bold text-brand-text mb-2 text-center">Find Local Recycling Rules</h2>
            <p className="text-sm text-brand-text-light mb-4 text-center">Select a plastic type and enter your city or region to get specific recycling guidelines.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-brand-text-light mb-2">Plastic Type</label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                        {plasticTypes.map(type => (
                            <PlasticTypeCard 
                                key={type.code}
                                type={type}
                                isSelected={plasticType === type.code}
                                onSelect={() => setPlasticType(type.code)}
                            />
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-brand-text-light mb-1">Your Location (City, Country)</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., London, UK"
                        className="w-full px-4 py-3 bg-brand-gray text-brand-text placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                </div>
                <Button type="submit" isLoading={isLoading}>
                    Get Recycling Rules
                </Button>
            </form>
        </Card>
        
        {isLoading && <Loader message="Fetching local rules..." />}
        {error && !isLoading && <p className="text-red-500 text-center font-medium p-4 bg-red-50 rounded-lg">{error}</p>}
        {rules && !isLoading && <div className="animate-view-fade-in"><RulesDisplay rules={rules} funFact={funFact} /></div>}

      </div>
    </div>
  );
};

export default RecyclingGuide;
